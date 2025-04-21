import React, { useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import axios from "axios";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";

type PlaygroundProps = {
  problem: Problem;
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const [code, setCode] = useState(problem.starterCode);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav />

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
                <p className="text-sm font-medium mt-4 text-white">
                  Input {index + 1}:
                </p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.input}
                </div>

                <p className="text-sm font-medium mt-4 text-white">
                  Expected Output {index + 1}:
                </p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.output}
                </div>

                {outputs.length > index && (
                  <>
                    <p className="text-sm font-medium mt-4 text-white">
                      Your Output {index + 1}:
                    </p>
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