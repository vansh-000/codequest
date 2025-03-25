import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeJobSequencing = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerJobSequencing = (fn: any) => {
  try {
    const jobs = [
      [
        { id: 1, deadline: 2, profit: 100 },
        { id: 2, deadline: 1, profit: 50 },
        { id: 3, deadline: 2, profit: 10 },
        { id: 4, deadline: 1, profit: 20 },
        { id: 5, deadline: 3, profit: 30 },
      ],
      [
        { id: 1, deadline: 3, profit: 40 },
        { id: 2, deadline: 1, profit: 50 },
        { id: 3, deadline: 2, profit: 20 },
        { id: 4, deadline: 1, profit: 30 },
      ],
    ];

    const answers = [
      { maxProfit: 180, jobsScheduled: [1, 5, 2] },
      { maxProfit: 90, jobsScheduled: [2, 3, 1] },
    ];

    for (let i = 0; i < jobs.length; i++) {
      const result = fn(jobs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("job sequencing handler function error");
    throw new Error(error);
  }
};

export const jobSequencing: Problem = {
  id: "job-sequencing",
  title: "10. Job Sequencing",
  problemStatement: `<p class='mt-3'>
  Given <code>n</code> jobs where each job has a unique <code>id</code>, a <code>deadline</code>, 
  and a <code>profit</code>, find the maximum profit that can be obtained by scheduling jobs
  within their deadlines.
</p>
<p class='mt-3'>
  Each job takes exactly one unit of time and a job can only be scheduled before its deadline.
</p>
<p class='mt-3'>
  Return an array containing the maximum profit and a list of job IDs in the order they were scheduled.
</p>`,
  examples: [
    {
      id: 1,
      inputText:
        "jobs = [{id:1, deadline:2, profit:100}, {id:2, deadline:1, profit:50}, {id:3, deadline:2, profit:10}, {id:4, deadline:1, profit:20}, {id:5, deadline:3, profit:30}]",
      outputText: "{ maxProfit: 180, jobsScheduled: [1, 5, 2] }",
      explanation: "Jobs 1, 5, and 2 are scheduled for a total profit of 180.",
    },
    {
      id: 2,
      inputText:
        "jobs = [{id:1, deadline:3, profit:40}, {id:2, deadline:1, profit:50}, {id:3, deadline:2, profit:20}, {id:4, deadline:1, profit:30}]",
      outputText: "{ maxProfit: 90, jobsScheduled: [2, 3, 1] }",
      explanation: "Jobs 2, 3, and 1 are scheduled for a total profit of 90.",
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
  handlerFunction: handlerJobSequencing,
  starterCode: starterCodeJobSequencing,
  order: 10,
  starterFunctionName: "function jobSequencing(",
};
