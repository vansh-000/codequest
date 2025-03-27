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
        assert.strictEqual(result, expectedResults[i]);
      }
      return true;
    } catch (error: any) {
      console.error("Handler function error:", error);
      throw new Error(error);
    }
  };
};

const inputMinimumPlatforms = [
  [
    [900, 940, 950, 1100, 1500, 1800],
    [910, 1200, 1120, 1130, 1900, 2000],
  ],
  [
    [200, 210, 300, 320, 350, 500],
    [230, 340, 320, 430, 400, 520],
  ],
  [
    [100, 200, 300, 400],
    [150, 250, 350, 450],
  ],
];

const outputMinimumPlatforms = [3, 2, 1];

const starterCodeMinimumPlatforms = `#include <bits/stdc++.h>
using namespace std;

int minPlatforms(vector<int> arrivals, vector<int> departures) {
    // Your code here
    return 0;
}`;

export const minimumPlatforms: Problem = {
  id: "minimum-platforms",
  title: "9. Minimum Number of Platforms",
  problemStatement: `<p class='mt-3'>
    Given the arrival and departure times of <code>n</code> trains at a railway station,
    find the minimum number of platforms required for the station to function smoothly.
  </p>
  <p class='mt-3'>
    A train can occupy a platform from its arrival time until its departure time.
  </p>
  <p class='mt-3'>
    Return the minimum number of platforms required to ensure no train has to wait.
  </p>`,
  examples: [
    {
      id: 1,
      inputText:
        "arrivals = [900, 940, 950, 1100, 1500, 1800], departures = [910, 1200, 1120, 1130, 1900, 2000]",
      outputText: "3",
      explanation:
        "At time 950, three trains are present (900-910, 940-1200, 950-1120), so we need 3 platforms.",
    },
    {
      id: 2,
      inputText:
        "arrivals = [200, 210, 300, 320, 350, 500], departures = [230, 340, 320, 430, 400, 520]",
      outputText: "2",
      explanation:
        "At peak time, two trains overlap, so 2 platforms are needed.",
    },
  ],
  constraints: `<li class='mt-2'>
    <code>1 ≤ n ≤ 1000</code>
  </li> 
  <li class='mt-2'>
    <code>0000 ≤ arrivals[i], departures[i] ≤ 2359</code> (24-hour format)
  </li> 
  <li class='mt-2'>
    <code>arrivals[i] ≤ departures[i]</code> (A train arrives before it departs)
  </li>`,
  handlerFunction: createHandlerFunction(
    inputMinimumPlatforms,
    outputMinimumPlatforms
  ),
  starterCode: starterCodeMinimumPlatforms,
  order: 9,
  starterFunctionName: "minPlatforms",
};
