import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeSubsetSum = `#include <bits/stdc++.h>
using namespace std;
bool subsetSum(vector<int>& nums, int target) {
  // Your code here
  return false;
}`;

const inputSubsetSum = [
  [[3, 34, 4, 12, 5, 2], 9],
  [[1, 2, 3, 7], 6],
  [[1, 2, 7, 1, 5], 10],
  [[1, 3, 4, 8], 6],
];

const outputSubsetSum = [true, true, true, false];

const createHandlerFunction = (testCases: any[], expectedResults: any[]) => {
  return (fn: any) => {
    try {
      for (let i = 0; i < testCases.length; i++) {
        const result = fn(...testCases[i]);
        assert.strictEqual(result, expectedResults[i]);
      }
      return true;
    } catch (error: any) {
      console.log("Handler function error: ", error);
      throw new Error(error);
    }
  };
};

export const subsetSum: Problem = {
  id: "subset-sum",
  title: "11. Subset Sum Problem",
  problemStatement: `<p class='mt-3'>
  Given a set of <code>n</code> positive integers and a target sum, determine if there exists 
  a subset whose sum is equal to the given target.
</p>
<p class='mt-3'>
  Return <code>true</code> if such a subset exists, otherwise return <code>false</code>.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [3, 34, 4, 12, 5, 2], target = 9",
      outputText: "true",
      explanation: "A subset {4, 5} adds up to 9.",
    },
    {
      id: 2,
      inputText: "nums = [1, 2, 3, 7], target = 6",
      outputText: "true",
      explanation: "A subset {1, 2, 3} adds up to 6.",
    },
    {
      id: 3,
      inputText: "nums = [1, 3, 4, 8], target = 6",
      outputText: "false",
      explanation: "No subset sums to 6.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ n ≤ 100</code>
</li> 
<li class='mt-2'>
  <code>1 ≤ nums[i] ≤ 1000</code>
</li> 
<li class='mt-2'>
  <code>1 ≤ target ≤ 1000</code>
</li>`,
  handlerFunction: createHandlerFunction(inputSubsetSum, outputSubsetSum),
  starterCode: starterCodeSubsetSum,
  order: 11,
  starterFunctionName: "subsetSum",
};
