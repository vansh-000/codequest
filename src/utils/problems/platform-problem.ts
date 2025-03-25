import assert from "assert";
import { Problem } from "../types/problem";

const starterCodePlatforms = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerPlatforms = (fn: any) => {
  try {
    const testCases = [
      {
        arrivals: [900, 940, 950, 1100, 1500, 1800],
        departures: [910, 1200, 1120, 1130, 1900, 2000],
        expected: 3,
      },
      {
        arrivals: [200, 210, 300, 320, 350, 500],
        departures: [230, 340, 320, 430, 400, 520],
        expected: 2,
      },
      {
        arrivals: [100, 200, 300, 400],
        departures: [150, 250, 350, 450],
        expected: 1,
      },
    ];

    for (const { arrivals, departures, expected } of testCases) {
      const result = fn(arrivals, departures);
      assert.strictEqual(result, expected);
    }
    return true;
  } catch (error: any) {
    console.log("Minimum Platforms handler function error");
    throw new Error(error);
  }
};

export const minimumPlatforms: Problem = {
  id: "minimum-platforms",
  title: "9. Minimum Number of Platforms",
  problemStatement: `<p class='mt-3'>
  Given the arrival and departure times of <code>n</code> trains at a railway station,
  find the minimum number of platforms required for the station to function smoothly.
</p>
<p class='mt-3'>
  A train can stay on a platform from its arrival time until its departure time.
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
      explanation: "At peak time, two trains overlap, so 2 platforms are needed.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ n ≤ 1000</code>
</li> 
<li class='mt-2'>
  <code>0000 ≤ arrivals[i], departures[i] ≤ 2359</code>
</li> 
<li class='mt-2'>
  <code>arrivals[i] ≤ departures[i]</code>
</li>`,
  handlerFunction: handlerPlatforms,
  starterCode: starterCodePlatforms,
  order: 9,
  starterFunctionName: "function minPlatforms(",
};
