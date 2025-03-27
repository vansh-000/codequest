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

const inputContainer = [
  [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
  [[1, 1]],
  [[4, 3, 2, 1, 4]],
  [[1, 2, 1]],
];

const outputContainer = [49, 1, 16, 2];

const starterCodeContainer = `function maxArea(height) {
  // Write your code here
  return 0; // Placeholder return statement
};`;

export const container: Problem = {
  id: "container-with-most-water",
  title: "6. Container With Most Water",
  problemStatement: `
    <p class='mt-3'>
      You are given an integer array <code>height</code> of length <code>n</code>. 
      There are <code>n</code> vertical lines drawn such that the two endpoints of the 
      <code>i<sup>th</sup></code> line are at <code>(i, 0)</code> and <code>(i, height[i])</code>.
    </p>
    <p class='mt-3'>
      Find two lines that together with the x-axis form a container, such that it contains the most water.
    </p>
    <p class='mt-3'>
      Return the maximum amount of water a container can store.
    </p>
  `,
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
      explanation:
        "The best container is formed between index 0 and index 4, storing 16 units.",
    },
    {
      id: 4,
      inputText: "height = [1,2,1]",
      outputText: "2",
      explanation:
        "The best container is formed between index 0 and index 2, storing 2 units.",
    },
  ],
  constraints: `
    <li class='mt-2'>
      <code>2 ≤ height.length ≤ 1000</code>
    </li> 
    <li class='mt-2'>
      <code>0 ≤ height[i] ≤ 10<sup>4</sup></code>
    </li>
  `,
  handlerFunction: createHandlerFunction(inputContainer, outputContainer),
  starterCode: starterCodeContainer,
  starterFunctionName: "function maxArea(height)",
  order: 6,
};
