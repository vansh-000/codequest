import assert from "assert";
import { Problem } from "../types/problem";

export const stocksHandler = (fn: any) => {
  try {
    const tests = [
      { input: [7, 1, 5, 3, 6, 4] },
      { input: [7, 6, 4, 3, 1] },
      { input: [2, 4, 1] },
      { input: 5 },
    ];
    const answers = [5, 0, 2, 0];
    
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i].input);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from stocksHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeStocksJS = `
// Do not edit function name
function maxProfit(input) {
  // Write your code here
};`;

export const stocks: Problem = {
  id: "stocks",
  title: "3. Stocks",
  problemStatement: `
  <p class='mt-3'>You are given an input which is either an array <code>prices</code> where <code>prices[i]</code> represents 
  the price of a given stock on the <code>i<sup>th</sup></code> day, or a single integer.</p>
  <p class='mt-3'>
  You want to maximize your profit by choosing a single day to buy one stock and 
  choosing a different day in the future to sell it.
  </p>
  <p class='mt-3'>
  Return the maximum profit you can achieve from this transaction. If no profit is 
  possible, return <code>0</code>. If the input is a single integer, return <code>0</code>.</p>
  `,
  examples: [
    {
      id: 1,
      inputText: "input = [7,1,5,3,6,4]",
      outputText: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    {
      id: 2,
      inputText: "input = [7,6,4,3,1]",
      outputText: "0",
      explanation: "No profitable transaction is possible.",
    },
    {
      id: 3,
      inputText: "input = [2,4,1]",
      outputText: "2",
    },
    {
      id: 4,
      inputText: "input = 5",
      outputText: "0",
    },
  ],
  constraints: `
  <li class='mt-2'>The input can be either an array or a single integer.</li>
  <li class='mt-2'>If input is an array, its length is in the range <code>[1, 10]</code>.</li>
  <li class='mt-2'><code>0 ≤ input[i] ≤ 10</code></li>
  `,
  starterCode: starterCodeStocksJS,
  handlerFunction: stocksHandler,
  starterFunctionName: "function maxProfit",
  order: 3,
};
