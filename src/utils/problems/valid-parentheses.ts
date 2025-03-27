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
      console.error("Handler function error:", error);
      throw new Error(error);
    }
  };
};

const inputValidParentheses = [["()"], ["()[]{}"], ["(]"], ["([)]"], ["{[]}"]];
const outputValidParentheses = [true, true, false, false, true];

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
  return true; // Placeholder return statement
};`;

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "5. Valid Parentheses",
  problemStatement: `
		<p class='mt-3'>
			Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, 
			<code>'{'</code>, <code>'}'</code>, <code>'['</code>, and <code>']'</code>, determine if the input string is valid.
		</p>
		<p class='mt-3'>An input string is valid if:</p>
		<ul>
			<li class='mt-2'>Open brackets must be closed by the same type of brackets.</li>
			<li class='mt-3'>Open brackets must be closed in the correct order.</li>
			<li class="mt-3">Every closing bracket must have a corresponding open bracket of the same type.</li>
		</ul>
	`,
  examples: [
    {
      id: 0,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 1,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 3,
      inputText: 's = "([)]"',
      outputText: "false",
    },
    {
      id: 4,
      inputText: 's = "{[]}"',
      outputText: "true",
    },
  ],
  constraints: `
		<li class='mt-2'><code>1 ≤ s.length ≤ 10<sup>4</sup></code></li>
		<li class='mt-2'><code>s</code> consists of only <code class="text-md">'()[]{}'</code> characters.</li>
	`,
  handlerFunction: createHandlerFunction(
    inputValidParentheses,
    outputValidParentheses
  ),
  starterCode: starterCodeValidParenthesesJS,
  starterFunctionName: "function validParentheses",
  order: 5,
};
