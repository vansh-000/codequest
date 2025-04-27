import React, { useState, useEffect, useRef } from "react";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import axios from "axios";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { AiOutlineFullscreen } from "react-icons/ai";

type PlaygroundProps = {
  problem: Problem;
  existingSubmission: any | null;
  alreadySubmitted: boolean;
};

type SubmissionStatus = "Accepted" | "Wrong Answer" | "Compilation Error";

const Playground: React.FC<PlaygroundProps> = ({ problem, existingSubmission, alreadySubmitted }) => {
  const [code, setCode] = useState(problem.starterCode);
  const [output, setoutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // get user from localStorage
  const getUserId = () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return null;

      const user = JSON.parse(userString);
      return user._id;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  };

  const userId = getUserId();


  useEffect(() => {
    if (existingSubmission && existingSubmission.code) {
      console.log("Existing submission found:", existingSubmission);
      setCode(existingSubmission.code);
      setSubmissionStatus(existingSubmission.status);
    } else {
      setCode(problem.starterCode);
    }
  }, [problem, existingSubmission]);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/run`, {
        code: code + problem.helperCode
      });
      setoutput(res.data.output);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSubmission = async (status: SubmissionStatus, resultScore: number = 0) => {
    if (!userId) {
      setError("You must be logged in to submit solutions.");
      return null;
    }
    try {
      const submissionData = {
        code: code,
        language: "cpp",
        status: status,
        score: resultScore
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/${userId}/problem/${problem._id}`,
        submissionData
      );

      console.log("Submission created:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Failed to create submission:", err);
      setError(prev => `${prev ? prev + '. ' : ''}Failed to save submission: ${err.response?.data?.message || err.message}`);
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSubmissionStatus(null);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/submit`, {
        code: code + problem.helperCode
      });

      if (res.data.error) {
        setError(res.data.errors);
        await createSubmission("Wrong Answer", 0);
        // set already submitted to true
        alreadySubmitted = true;
        setSubmissionStatus("Wrong Answer");
      } else if (res.data.output) {
        setoutput(res.data.output);
        await createSubmission("Accepted", 10);
        // set already submitted to true
        alreadySubmitted = true;
        setSubmissionStatus("Accepted");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      await createSubmission("Compilation Error", 0);
      setSubmissionStatus("Compilation Error");
    } finally {
      setLoading(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && editorRef.current) {
      const node = editorRef.current.parentNode?.parentNode?.parentNode as any;
      if (!node) return;
      node.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);
      if (!fullscreen && !alreadySubmitted) {
        handleSubmit();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div ref={editorRef} className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
        <div className='flex items-center text-white'>
          <button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium'>
            <div className='flex items-center px-1'>
              <div className='text-xs text-label-2 dark:text-dark-label-2'>C++</div>
            </div>
          </button>
        </div>
        <div className='flex items-center m-2'>
          <button onClick={toggleFullscreen} className='preferenceBtn group'>
            <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
              <AiOutlineFullscreen />
            </div>
            <div className='preferenceBtn-tooltip'>
              {isFullscreen ? "Exit Full Screen" : "Full Screen"}
            </div>
          </button>
        </div>
      </div>

      <Split
        className="h-[calc(100vh-95px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={code}
            theme={vscodeDark}
            extensions={[cpp()]}
            onChange={(value) => setCode(value)}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">Testcases</div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {submissionStatus && (
            <div className={`mt-2 p-2 rounded-md ${submissionStatus === "Accepted" ? "bg-green-800/30 text-green-400" :
              submissionStatus === "Wrong Answer" ? "bg-red-800/30 text-red-400" :
                "bg-yellow-800/30 text-yellow-400"
              }`}>
              Status: {submissionStatus}
            </div>
          )}

          <div className="font-semibold my-4">
            {problem.testCases.map((testcase, index) => (
              <div key={index} className="mb-6">
                <p className="text-sm font-medium mt-4 text-white">Input {index + 1}:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.input}
                </div>

                <p className="text-sm font-medium mt-4 text-white">Expected Output {index + 1}:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.output}
                </div>

                {output.length > index && (
                  <>
                    <p className="text-sm font-medium mt-4 text-white">Your Output {index + 1}:</p>
                    <div className={`w-full rounded-lg border px-3 py-[10px] mt-2 bg-dark-fill-3 border-transparent text-white ${output[index].trim() === testcase.output.trim()
                      ? "border-green-500"
                      : "border-red-500"
                      }`}>
                      {output[index]}
                    </div>
                  </>
                )}
              </div>
            ))}

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-900/20 rounded-md mt-2">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      </Split>

      <EditorFooter
        onRun={handleRun}
        onSubmit={handleSubmit}
        loading={loading}
        alreadySubmitted={alreadySubmitted}
      />
    </div>
  );
};

export default Playground;