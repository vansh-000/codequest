import assert from "assert";
import { Problem } from "../types/problem";

export const reverseArrayHandler = (fn: any) => {
  try {
    const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
    const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.deepEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from reverseArrayHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeReverseArrayJS = `
// Do not edit function name
function reverseArray(arr) {
  // Write your code here
};`;

export const reverseArray: Problem = {
  id: "reverse-array",
  title: "2. Reverse Array",
  problemStatement: `<p class='mt-3'>Given an array of integers, reverse the array and return it.</p>
	`,
  examples: [
    {
      id: 0,
      inputText: "arr = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
    },
    {
      id: 1,
      inputText: "arr = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 2,
      inputText: "arr = [1]",
      outputText: "[1]",
    },
  ],
  constraints: `<li class='mt-2'>The number of elements in the array is in the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= arr[i] <= 5000</code></li>`,
  starterCode: starterCodeReverseArrayJS,
  handlerFunction: reverseArrayHandler,
  starterFunctionName: "function reverseArray(",
  order: 2,
};
