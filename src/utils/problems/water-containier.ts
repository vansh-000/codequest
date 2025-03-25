import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeContainer = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerContainer = (fn: any) => {
  try {
    const heightArrays = [
      [1, 8, 6, 2, 5, 4, 8, 3, 7],
      [1, 1],
      [4, 3, 2, 1, 4],
      [1, 2, 1],
    ];
    const answers = [49, 1, 16, 2];

    for (let i = 0; i < heightArrays.length; i++) {
      const result = fn(heightArrays[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("container handler function error");
    throw new Error(error);
  }
};

export const container: Problem = {
  id: "container-with-most-water",
  title: "6. Container With Most Water",
  problemStatement: `<p class='mt-3'>
  You are given an integer array <code>height</code> of length <code>n</code>. 
  There are <code>n</code> vertical lines drawn such that the two endpoints of the 
  <code>i<sup>th</sup></code> line are at <code>(i, 0)</code> and <code>(i, height[i])</code>.
</p>
<p class='mt-3'>
  Find two lines that together with the x-axis form a container, such that it contains the most water.
</p>
<p class='mt-3'>
  Return the maximum amount of water a container can store.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "height = [1,8,6,2,5,4,8,3,7]",
      outputText: "49",
      explanation:
        "The lines at index 1 and index 8 form the container with the most water, storing 49 units.",
    },
    {
      id: 2,
      inputText: "height = [1,1]",
      outputText: "1",
      explanation:
        "The only container possible is formed by both lines, storing 1 unit of water.",
    },
    {
      id: 3,
      inputText: "height = [4,3,2,1,4]",
      outputText: "16",
    },
    {
      id: 4,
      inputText: "height = [1,2,1]",
      outputText: "2",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ height.length ≤ 1000</code>
</li> 
<li class='mt-2'>
  <code>0 ≤ height[i] ≤ 10<sup>4</sup></code>
</li>`,
  handlerFunction: handlerContainer,
  starterCode: starterCodeContainer,
  order: 6,
  starterFunctionName: "function maxArea(",
};
