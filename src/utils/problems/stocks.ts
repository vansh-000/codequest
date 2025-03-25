import assert from "assert";
import { Problem } from "../types/problem";

const starterCodestocks = `#include <bits/stdc++.h>
using namespace std;
int main() {
  // Your code here
  return 0;
}`;

const handlerstocks = (fn: any) => {
  try {
    const prices = [
      [7, 1, 5, 3, 6, 4],
      [7, 6, 4, 3, 1],
      [2, 4, 1],
    ];
    const answers = [5, 0, 2];

    for (let i = 0; i < prices.length; i++) {
      const result = fn(prices[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("stocks handler function error");
    throw new Error(error);
  }
};

export const stocks: Problem = {
  id: "stocks",
  title: "3. Stocks",
  problemStatement: `<p class='mt-3'>
  You are given an array <code>prices</code> where <code>prices[i]</code> represents 
  the price of a given stock on the <code>i<sup>th</sup></code> day.
</p>
<p class='mt-3'>
  You want to maximize your profit by choosing a single day to buy one stock and 
  choosing a different day in the future to sell it.
</p>
<p class='mt-3'>
  Return the maximum profit you can achieve from this transaction. If no profit is 
  possible, return <code>0</code>.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "prices = [7,1,5,3,6,4]",
      outputText: "5",
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    },
    {
      id: 2,
      inputText: "prices = [7,6,4,3,1]",
      outputText: "0",
      explanation: "No profitable transaction is possible.",
    },
    {
      id: 3,
      inputText: "prices = [2,4,1]",
      outputText: "2",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ prices.length ≤ 10</code>
</li> 
<li class='mt-2'>
  <code>0 ≤ prices[i] ≤ 10</code>
</li>`,
  handlerFunction: handlerstocks,
  starterCode: starterCodestocks,
  order: 3,
  starterFunctionName: "function maxProfit(",
};
