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

const inputJumpGame = [
  [[2, 3, 1, 1, 4]],
  [[3, 2, 1, 0, 4]],
  [[2, 0, 0]],
  [[2, 5, 0, 0]],
];

const outputJumpGame = [true, false, true, true];

const starterCodeJumpGame = `function canJump(nums) {
  // Your code here
}`;

export const jumpGame: Problem = {
  id: "jump-game",
  title: "7. Jump Game",
  problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
    and each element in the array represents your maximum jump length at that position.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
  </p>`,
  examples: [
    {
      id: 0,
      inputText: `nums = [2,3,1,1,4]`,
      outputText: `true`,
      explanation:
        "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
    },
    {
      id: 1,
      inputText: `nums = [3,2,1,0,4]`,
      outputText: `false`,
      explanation:
        "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
    },
  ],
  constraints: `<li class='mt-2'><code>1 ≤ nums.length ≤ 10^4</code></li>
    <li class='mt-2'><code>0 ≤ nums[i] ≤ 10^5</code></li>`,
  starterCode: starterCodeJumpGame,
  handlerFunction: createHandlerFunction(inputJumpGame, outputJumpGame),
  order: 7,
  starterFunctionName: "canJump",
};
