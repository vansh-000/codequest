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
      console.error("Handler function error:", error);
      throw new Error(error);
    }
  };
};

const inputSearchNumberOrArray = [
  [[1, 2, 3, 4, 5], 3],
  [[5, 4, 3, 2, 1], 6],
  [[1, 2, 3], 2],
  [[7], 7],
];

const outputSearchNumberOrArray = [true, false, true, true];

const starterCodeSearchNumberOrArrayJS = `
// Do not edit function name
function searchNumberOrArray(input, target) {
  // Your code here
  return false;
}`;

export const searchNumberOrArray: Problem = {
  id: "search-number-or-array",
  title: "14. Search Number or Array",
  problemStatement: `
    <p class='mt-3'>Write a function that searches for a value in an array or a single integer input. If the input is an array, check if the target exists in the array. If the input is a number, check if it matches the target.</p>
    <p class='mt-3'>Return <code>true</code> if the target is found, and <code>false</code> otherwise.</p>
  `,
  examples: [
    {
      id: 0,
      inputText: "input = [1,2,3,4,5], target = 3",
      outputText: "true",
    },
    {
      id: 1,
      inputText: "input = [5,4,3,2,1], target = 6",
      outputText: "false",
    },
    {
      id: 2,
      inputText: "input = [1,2,3], target = 2",
      outputText: "true",
    },
    {
      id: 3,
      inputText: "input = [7], target = 7",
      outputText: "true",
    },
  ],
  constraints: `
    <li class='mt-2'>The input can be either an array or a single integer.</li>
    <li class='mt-2'>If input is an array, its length is in the range <code>[0, 5000]</code>.</li>
    <li class='mt-2'><code>-5000 ≤ input[i], target ≤ 5000</code></li>
  `,
  starterCode: starterCodeSearchNumberOrArrayJS,
  handlerFunction: createHandlerFunction(
    inputSearchNumberOrArray,
    outputSearchNumberOrArray
  ),
  starterFunctionName: "searchNumberOrArray",
  order: 14,
};
