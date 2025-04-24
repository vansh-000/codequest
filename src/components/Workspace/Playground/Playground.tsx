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
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const [code, setCode] = useState(problem.starterCode);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(problem.starterCode);
  }, [problem]);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/run`, {
        code: code + problem.helperCode
      });
      setOutputs(res.data.outputs);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/submit`, {
        code: code + problem.helperCode
      });
      console.log("Submission result:", res.data);
      if (res.data.error) {
        setError(res.data.error);
      } else if (res.data.outputs) {
        setOutputs(res.data.outputs);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && editorRef.current) {
      console.log(editorRef.current.parentNode?.parentNode);
      const node = editorRef.current.parentNode?.parentNode?.parentNode;
      if (!node) return;
      node.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      })
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);
      if (!fullscreen) {
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
          <button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium'>
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

                {outputs.length > index && (
                  <>
                    <p className="text-sm font-medium mt-4 text-white">Your Output {index + 1}:</p>
                    <div className="w-full rounded-lg border px-3 py-[10px] mt-2 bg-dark-fill-3 border-transparent text-white">
                      {outputs[index]}
                    </div>
                  </>
                )}
              </div>
            ))}

            {error && (
              <div className="text-red-500 text-sm">Error: {error}</div>
            )}
          </div>
        </div>
      </Split>

      <EditorFooter
        onRun={handleRun}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Playground;
