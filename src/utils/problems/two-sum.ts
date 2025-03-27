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

const inputTwoSum = [
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6],
];

const outputTwoSum = [
  [0, 1],
  [1, 2],
  [0, 1],
];

const starterCodeTwoSum = `#include <bits/stdc++.h>
using namespace std;

// Function to implement two sum logic
vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}`;

export const twoSum: Problem = {
  id: "two-sum",
  title: "13. Two Sum",
  problemStatement: `
    <p class='mt-3'>
      Given an array of integers <code>nums</code> and an integer <code>target</code>, return
      <em>indices of the two numbers such that they add up to</em> <code>target</code>.
    </p>
    <p class='mt-3'>
      You may assume that each input would have <strong>exactly one solution</strong>, and you
      may not use the same element twice.
    </p>
    <p class='mt-3'>You can return the answer in any order.</p>
  `,
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0,1]",
    },
  ],
  constraints: `
    <li class='mt-2'><code>2 ≤ nums.length ≤ 10</code></li>
    <li class='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li>
    <li class='mt-2'><code>-10 ≤ target ≤ 10</code></li>
    <li class='mt-2'><strong>Only one valid answer exists.</strong></li>
  `,
  handlerFunction: createHandlerFunction(inputTwoSum, outputTwoSum),
  starterCode: starterCodeTwoSum,
  order: 13,
  starterFunctionName: "vector<int> twoSum",
};
