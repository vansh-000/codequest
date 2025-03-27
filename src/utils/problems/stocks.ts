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

const inputStocks = [[[7, 1, 5, 3, 6, 4]], [[7, 6, 4, 3, 1]], [[2, 4, 1]], [5]];

const outputStocks = [5, 0, 2, 0];

const starterCodeStocksJS = `
// Do not edit function name
function maxProfit(input) {
  // Your code here
  return 0;
}`;

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
  handlerFunction: createHandlerFunction(inputStocks, outputStocks),
  starterFunctionName: "maxProfit",
  order: 3,
};
