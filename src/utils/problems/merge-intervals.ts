import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMergeIntervals = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerMergeIntervals = (fn: any) => {
  try {
    const testCases = [
      {
        intervals: [
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        intervals: [
          [1, 4],
          [4, 5],
        ],
        expected: [[1, 5]],
      },
      {
        intervals: [
          [6, 8],
          [1, 9],
          [2, 4],
          [4, 7],
        ],
        expected: [[1, 9]],
      },
    ];

    for (const { intervals, expected } of testCases) {
      const result = fn(intervals);
      assert.deepStrictEqual(result, expected);
    }
    return true;
  } catch (error: any) {
    console.log("Merge Intervals handler function error");
    throw new Error(error);
  }
};

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
      explanation: "Since intervals [1,4] and [4,5] overlap, they are merged into [1,5].",
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
  handlerFunction: handlerMergeIntervals,
  starterCode: starterCodeMergeIntervals,
  order: 15,
  starterFunctionName: "function mergeIntervals(",
};
