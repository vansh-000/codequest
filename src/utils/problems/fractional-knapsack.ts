import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeKnapsack = `function fractionalKnapsack(items, capacity) {
  // Your code here
}`;

const handlerKnapsack = (fn: any) => {
  try {
    const capacities = [50, 60, 10];
    const items = [
      [
        { value: 60, weight: 10 },
        { value: 100, weight: 20 },
        { value: 120, weight: 30 },
      ],
      [
        { value: 500, weight: 30 },
        { value: 200, weight: 10 },
        { value: 100, weight: 20 },
      ],
      [
        { value: 10, weight: 5 },
        { value: 40, weight: 4 },
      ],
    ];
    const answers = [240.0, 700.0, 50.0];

    for (let i = 0; i < capacities.length; i++) {
      const result = fn(items[i], capacities[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Knapsack handler function error");
    throw new Error(error);
  }
};

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
        "capacity = 50, items = [{value:60, weight:10}, {value:100, weight:20}, {value:120, weight:30}]",
      outputText: "240.0",
      explanation:
        "Take all of item 1 and item 2, then 2/3 of item 3 for a total value of 240.",
    },
    {
      id: 2,
      inputText:
        "capacity = 60, items = [{value:500, weight:30}, {value:200, weight:10}, {value:100, weight:20}]",
      outputText: "700.0",
      explanation:
        "Take all of item 1 and item 2, then all of item 3 for a total value of 700.",
    },
    {
      id: 3,
      inputText: "capacity = 10, items = [{value:10, weight:5}, {value:40, weight:4}]",
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
  handlerFunction: handlerKnapsack,
  starterCode: starterCodeKnapsack,
  order: 8,
  starterFunctionName: "function fractionalKnapsack(",
};
