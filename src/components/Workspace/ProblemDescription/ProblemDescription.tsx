import { Problem, Example } from "@/utils/types/problem";
import Image from "next/image";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useMemo } from "react";

type ProblemDescriptionProps = { problem: Problem };

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  // Parse examples only once and memoize
  const parsedExamples: Example[] = useMemo(() => {
    return problem.examples.map((ex: any) => {
      if (typeof ex === "string") {
        const inputText = ex.match(/inputText:\s*"(.*?)"/i)?.[1] ?? "";
        const outputText = ex.match(/outputText:\s*"(.*?)"/i)?.[1] ?? "";
        const explanation = ex.match(/Explanation:\s*(.+)$/i)?.[1]?.trim() ?? "";
        return { inputText, outputText, explanation };
      }
      return ex;
    });
  }, [problem.examples]);

  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            {/* Title and stats */}
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.order}. {problem.title}
              </div>
            </div>

            <div className="flex items-center mt-3">
              <div className="text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize">
                {problem.difficulty}
              </div>
              <div className="rounded p-[3px] ml-4 text-lg text-dark-green-s">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg text-dark-gray-6">
                <AiFillLike />
                <span className="text-xs">{problem.likes}</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg text-dark-gray-6">
                <AiFillDislike />
                <span className="text-xs">{problem.dislikes}</span>
              </div>
              <div className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl text-dark-gray-6">
                <TiStarOutline />
              </div>
            </div>

            {/* Description */}
            <div className="text-white text-sm mt-4 whitespace-pre-line">
              {problem.description}
            </div>

            {/* Examples */}
            <div className="mt-4">
              {parsedExamples.map((example, index) => (
                <div key={index} className="mb-5">
                  <p className="font-medium text-white">Example {index + 1}:</p>
                  <div className="example-card mt-2">
                    <pre>
                      <strong className="text-white">Input: </strong>
                      {example.inputText}
                      <br />
                      <strong>Output:</strong> {example.outputText}
                      <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                {problem.constraints.map((constraint, i) => (
                  <li key={i} className="mt-2">
                    <code>{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
