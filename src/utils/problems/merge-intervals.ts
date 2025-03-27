import assert from "assert";
import { Problem } from "../types/problem";

export const createHandlerFunction = (
  testCases: any[],
  expectedResults: any[]
) => {
  return (fn: any) => {
    try {
      for (let i = 0; i < testCases.length; i++) {
        const result = fn(...testCases[i]);
        assert.deepStrictEqual(result, expectedResults[i]);
      }
      return true;
    } catch (error: any) {
      console.error("Handler function error: ", error);
      throw new Error(error);
    }
  };
};

const inputMergeIntervals = [
  [
    [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ],
  ],
  [
    [
      [1, 4],
      [4, 5],
    ],
  ],
  [
    [
      [6, 8],
      [1, 9],
      [2, 4],
      [4, 7],
    ],
  ],
];

const outputMergeIntervals = [
  [
    [1, 6],
    [8, 10],
    [15, 18],
  ],
  [[1, 5]],
  [[1, 9]],
];

const starterCodeMergeIntervals = `function mergeIntervals(intervals) {
  // Your code here
}`;

export const mergeIntervals: Problem = {
  id: "merge-intervals",
  title: "15. Merge Intervals",
  problemStatement: `<p class='mt-3'>
  Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, 
  merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      outputText: "[[1,6],[8,10],[15,18]]",
      explanation:
        "Since intervals [1,3] and [2,6] overlap, they are merged into [1,6].",
    },
    {
      id: 2,
      inputText: "intervals = [[1,4],[4,5]]",
      outputText: "[[1,5]]",
      explanation:
        "Since intervals [1,4] and [4,5] overlap, they are merged into [1,5].",
    },
    {
      id: 3,
      inputText: "intervals = [[6,8],[1,9],[2,4],[4,7]]",
      outputText: "[[1,9]]",
      explanation: "All given intervals overlap and merge into [1,9].",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ intervals.length ≤ 100</code>
</li> 
<li class='mt-2'>
  <code>intervals[i].length == 2</code>
</li> 
<li class='mt-2'>
  <code>0 ≤ start<sub>i</sub> ≤ end<sub>i</sub> ≤ 10⁴</code>
</li>`,
  handlerFunction: createHandlerFunction(
    inputMergeIntervals,
    outputMergeIntervals
  ),
  order: 15,
  starterFunctionName: "mergeIntervals",
  starterCode: starterCodeMergeIntervals,
};
