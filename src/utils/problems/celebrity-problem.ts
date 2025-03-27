import assert from "assert";
import { Problem } from "../types/problem";

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

const inputCelebrity = [
  [
    // matrix format
    [
      [0, 1, 0],
      [0, 0, 0],
      [0, 1, 0],
    ],
  ],
  [
    [
      [0, 1],
      [1, 0],
    ],
  ],
  [
    [
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
    ],
  ],
];

const outputCelebrity = [1, -1, 2];

const starterCodeCelebrity = `#include <bits/stdc++.h>
using namespace std;
int findCelebrity(vector<vector<int>>& M) {
  // Your code here
  return -1;
}`;

export const celebrity: Problem = {
  id: "celebrity",
  title: "4. Celebrity",
  problemStatement: `<p class='mt-3'>
  A celebrity is defined as someone who is known by everyone but does not know anyone else.
</p>
<p class='mt-3'>
  You are given a <code>n x n</code> matrix <code>M</code> where <code>M[i][j] = 1</code> means person <code>i</code> knows person <code>j</code>, and <code>M[i][j] = 0</code> otherwise.
</p>
<p class='mt-3'>
  Find the index of the celebrity if they exist, otherwise return <code>-1</code>.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "M = [[0,1,0],[0,0,0],[0,1,0]]",
      outputText: "1",
      explanation:
        "Person 1 is known by others but does not know anyone else, so they are the celebrity.",
    },
    {
      id: 2,
      inputText: "M = [[0,1],[1,0]]",
      outputText: "-1",
      explanation: "Both persons know each other, so no celebrity exists.",
    },
    {
      id: 3,
      inputText: "M = [[0,1,1,0],[0,0,1,0],[0,0,0,0],[0,1,1,0]]",
      outputText: "2",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ n ≤ 100</code>
</li> 
<li class='mt-2'>
  <code>M[i][j]</code> is either <code>0</code> or <code>1</code>
</li>
<li class='mt-2'>
  <code>M[i][i] = 0</code> (A person does not know themselves)
</li>`,
  handlerFunction: createHandlerFunction(inputCelebrity, outputCelebrity),
  starterCode: starterCodeCelebrity,
  order: 4,
  starterFunctionName: "findCelebrity",
};
