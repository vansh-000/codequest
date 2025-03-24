import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeActivitySelection = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerActivitySelection = (fn: any) => {
  try {
    const startTimes = [
      [1, 3, 0, 5, 8, 5],
      [10, 12, 20],
    ];
    const endTimes = [
      [2, 4, 6, 7, 9, 9],
      [20, 25, 30],
    ];
    const answers = [
      [0, 1, 3, 4],
      [0, 1, 2],
    ];
    for (let i = 0; i < startTimes.length; i++) {
      const result = fn(startTimes[i], endTimes[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("activitySelection handler function error");
    throw new Error(error);
  }
};

export const activitySelection: Problem = {
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
      explanation:
        "Selecting activities (0,1,3,4) allows for maximum activities without overlap.",
    },
    {
      id: 2,
      inputText: "start = [10,12,20], end = [20,25,30]",
      outputText: "[0,1,2]",
      explanation: "All activities can be selected without conflicts.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ n ≤ 10</code>
</li> <li class='mt-2'>
<code>1 ≤ start[i], end[i] ≤ 100</code>
</li> <li class='mt-2'>
<strong>Start time of an activity is always less than its end time.</strong>
</li>`,
  handlerFunction: handlerActivitySelection,
  starterCode: starterCodeActivitySelection,
  order: 2,
  starterFunctionName: `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`,
};
