import assert from "assert";
import { Problem } from "../types/problem";

const input = [
  [
    [1, 3, 0, 5, 8, 5],
    [2, 4, 6, 7, 9, 9],
  ],
  [
    [10, 12, 20],
    [20, 25, 30],
  ],
];

const output = [
  [0, 1, 3, 4],
  [0, 1, 2],
];

const createHandlerFunction = (testCases: any[], expectedResults: any[]) => {
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

const problems: Problem[] = [
  {
    id: "activity-selection",
    title: "1. Activity Selection Problem",
    problemStatement: `<p class='mt-3'>
      Given <code>n</code> activities with their start and end times, select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.
    </p>
    <p class='mt-3'>
      Return the indices of the selected activities in order.
    </p>`,
    examples: [
      {
        id: 1,
        inputText: "start = [1,3,0,5,8,5], end = [2,4,6,7,9,9]",
        outputText: "[0,1,3,4]",
      },
      {
        id: 2,
        inputText: "start = [10,12,20], end = [20,25,30]",
        outputText: "[0,1,2]",
      },
    ],
    constraints: `<li class='mt-2'>
      <code>1 ≤ n ≤ 10</code>
    </li>
    <li class='mt-2'>
      <code>1 ≤ start[i], end[i] ≤ 100</code>
    </li>
    <li class='mt-2'>
      <strong>Start time of an activity is always less than its end time.</strong>
    </li>`,
    handlerFunction: createHandlerFunction(input, output),
    starterCode: `#include <bits/stdc++.h>
using namespace std;
vector<int> activitySelection(vector<int>& start, vector<int>& end) {
  // Your code here
  return {};
}`,
    order: 1,
    starterFunctionName: "activitySelection",
  },
];

export default problems;
