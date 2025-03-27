import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMaxDepth = `function maxDepth(arr) {
  // Your code here
}`;

const handlerMaxDepth = (fn: any) => {
  try {
    const testCases = [
      { input: [3, 9, 20, null, null, 15, 7], expected: 3 },
      { input: [1, null, 2], expected: 2 },
      { input: [], expected: 0 },
      { input: [0], expected: 1 },
    ];

    for (const { input, expected } of testCases) {
      const result = fn(input);
      assert.strictEqual(result, expected);
    }
    return true;
  } catch (error: any) {
    console.log("Maximum Depth handler function error");
    throw new Error(error);
  }
};

export const maxDepth: Problem = {
  id: "max-depth-array",
  title: "12 Maximum Depth of Array",
  problemStatement: `<p class='mt-3'>
  Given an array representing a tree structure where null represents missing nodes,
  return its <strong>maximum depth</strong>.
</p>
<p class='mt-3'>
  The maximum depth is the longest path from the first element (root) to any leaf element.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "arr = [3,9,20,null,null,15,7]",
      outputText: "3",
      explanation:
        "The longest path is from root (3) → right (20) → right (7), or root (3) → right (20) → left (15), both have depth 3.",
    },
    {
      id: 2,
      inputText: "arr = [1,null,2]",
      outputText: "2",
      explanation:
        "The longest path is from root (1) → right (2), which has depth 2.",
    },
    {
      id: 3,
      inputText: "arr = []",
      outputText: "0",
      explanation: "An empty array has depth 0.",
    },
    {
      id: 4,
      inputText: "arr = [0]",
      outputText: "1",
      explanation: "An array with only one element has depth 1.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>The number of elements in the array is in the range [0, 10⁴]</code>
</li> 
<li class='mt-2'>
  <code>-100 ≤ arr[i] ≤ 100 or null</code>
</li>`,
  handlerFunction: handlerMaxDepth,
  starterCode: starterCodeMaxDepth,
  order: 12,
  starterFunctionName: "function maxDepth(",
};
