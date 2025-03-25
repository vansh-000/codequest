import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeSubsetSum = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerSubsetSum = (fn: any) => {
  try {
    const testCases = [
      { nums: [3, 34, 4, 12, 5, 2], target: 9, expected: true },
      { nums: [1, 2, 3, 7], target: 6, expected: true },
      { nums: [1, 2, 7, 1, 5], target: 10, expected: true },
      { nums: [1, 3, 4, 8], target: 6, expected: false },
    ];

    for (const { nums, target, expected } of testCases) {
      const result = fn(nums, target);
      assert.strictEqual(result, expected);
    }
    return true;
  } catch (error: any) {
    console.log("Subset Sum handler function error");
    throw new Error(error);
  }
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
  handlerFunction: handlerSubsetSum,
  starterCode: starterCodeSubsetSum,
  order: 11,
  starterFunctionName: "function subsetSum(",
};
