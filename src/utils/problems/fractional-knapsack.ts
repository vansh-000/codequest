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

const inputKnapsack = [
  [
    // matrix
    [
      [60, 10],
      [100, 20],
      [120, 30],
    ],
    // integer
    50,
  ],
  [
    [
      [500, 30],
      [200, 10],
      [100, 20],
    ],
    60,
  ],
  [
    [
      [10, 5],
      [40, 4],
    ],
    10,
  ],
];

const outputKnapsack = [240.0, 700.0, 50.0];

const starterCodeKnapsack = `function fractionalKnapsack(items, capacity) {
  // Your code here
}`;

export const knapsack: Problem = {
  id: "fractional-knapsack",
  title: "8. Fractional Knapsack",
  problemStatement: `<p class='mt-3'>
  Given an array of items, where each item has a <code>value</code> and <code>weight</code>, and a knapsack with a maximum capacity, 
  determine the maximum total value that can be obtained if fractional quantities of items can be taken.
</p>
<p class='mt-3'>
  You can break items into smaller parts and include partial amounts in the knapsack.
</p>
<p class='mt-3'>
  Return the maximum total value the knapsack can hold.
</p>`,
  examples: [
    {
      id: 1,
      inputText:
        "items = [{value:60, weight:10}, {value:100, weight:20}, {value:120, weight:30}], capacity = 50",
      outputText: "240.0",
      explanation:
        "Take all of item 1 and item 2, then 2/3 of item 3 for a total value of 240.",
    },
    {
      id: 2,
      inputText:
        "items = [{value:500, weight:30}, {value:200, weight:10}, {value:100, weight:20}], capacity = 60",
      outputText: "700.0",
      explanation:
        "Take all of item 1 and item 2, then all of item 3 for a total value of 700.",
    },
    {
      id: 3,
      inputText:
        "items = [{value:10, weight:5}, {value:40, weight:4}], capacity = 10",
      outputText: "50.0",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ n ≤ 1000</code>
</li> 
<li class='mt-2'>
  <code>1 ≤ capacity ≤ 10<sup>4</sup></code>
</li> 
<li class='mt-2'>
  <code>1 ≤ value[i], weight[i] ≤ 10<sup>4</sup></code>
</li>`,
  handlerFunction: createHandlerFunction(inputKnapsack, outputKnapsack),
  starterCode: starterCodeKnapsack,
  order: 8,
  starterFunctionName: "fractionalKnapsack",
};
