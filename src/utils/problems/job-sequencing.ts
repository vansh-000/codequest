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

const inputJobSequencing = [
  [
    // materix of deadline and profit
    [
      [2, 100], // job 1: dedline=2 and profit is 1
      [1, 50],
      [2, 10],
      [1, 20],
      [3, 30],
    ],
  ],
  [
    [
      [3, 40],
      [1, 50],
      [2, 20],
      [1, 30],
    ],
  ],
];

const outputJobSequencing = [
  [0, 4, 1],
  [1, 2, 0],
];

const starterCodeJobSequencing = `function jobSequencing(jobs) {
  // Your code here
}`;

export const jobSequencing: Problem = {
  id: "job-sequencing",
  title: "10. Job Sequencing",
  problemStatement: `<p class='mt-3'>
  Given an array of jobs where each job has a <code>deadline</code> and a <code>profit</code>,
  find the maximum profit that can be obtained by scheduling jobs within their deadlines.
</p>
<p class='mt-3'>
  Each job takes exactly one unit of time and a job can only be scheduled before its deadline.
</p>
<p class='mt-3'>
  Return a list of job indices in the order they were scheduled.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "jobs = [[2, 100], [1, 50], [2, 10], [1, 20], [3, 30]]",
      outputText: "[0, 4, 1]",
      explanation:
        "Jobs at indices 0, 4, and 1 are scheduled for maximum profit.",
    },
    {
      id: 2,
      inputText: "jobs = [[3, 40], [1, 50], [2, 20], [1, 30]]",
      outputText: "[1, 2, 0]",
      explanation:
        "Jobs at indices 1, 2, and 0 are scheduled for maximum profit.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ n ≤ 1000</code>
</li> 
<li class='mt-2'>
  <code>1 ≤ deadline[i] ≤ 100</code>
</li> 
<li class='mt-2'>
  <code>1 ≤ profit[i] ≤ 10<sup>4</sup></code>
</li>`,
  handlerFunction: createHandlerFunction(
    inputJobSequencing,
    outputJobSequencing
  ),
  starterCode: starterCodeJobSequencing,
  order: 10,
  starterFunctionName: "jobSequencing",
};
