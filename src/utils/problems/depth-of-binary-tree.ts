import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMaxDepth = `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

int main() {
  // Your code here
  return 0;
}`;

const handlerMaxDepth = (fn: any) => {
  try {
    class TreeNode {
      val: number;
      left: TreeNode | null;
      right: TreeNode | null;
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
      }
    }

    const buildTree = (arr: (number | null)[]): TreeNode | null => {
      if (!arr.length) return null;
      const root = new TreeNode(arr[0]!);
      const queue: (TreeNode | null)[] = [root];
      let i = 1;
      while (queue.length && i < arr.length) {
        const node = queue.shift();
        if (node) {
          if (arr[i] !== null) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
          }
          i++;
          if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
          }
          i++;
        }
      }
      return root;
    };

    const testCases = [
      { tree: [3, 9, 20, null, null, 15, 7], expected: 3 },
      { tree: [1, null, 2], expected: 2 },
      { tree: [], expected: 0 },
      { tree: [0], expected: 1 },
    ];

    for (const { tree, expected } of testCases) {
      const root = buildTree(tree);
      const result = fn(root);
      assert.strictEqual(result, expected);
    }
    return true;
  } catch (error: any) {
    console.log("Maximum Depth handler function error");
    throw new Error(error);
  }
};

export const maxDepth: Problem = {
  id: "max-depth-binary-tree",
  title: "12 Maximum Depth of Binary Tree",
  problemStatement: `<p class='mt-3'>
  Given the <code>root</code> of a binary tree, return its <strong>maximum depth</strong>.
</p>
<p class='mt-3'>
  A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path 
  from the root node down to the farthest leaf node.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "root = [3,9,20,null,null,15,7]",
      outputText: "3",
      explanation:
        "The longest path is from root (3) → right (20) → right (7), or root (3) → right (20) → left (15), both have depth 3.",
    },
    {
      id: 2,
      inputText: "root = [1,null,2]",
      outputText: "2",
      explanation: "The longest path is from root (1) → right (2), which has depth 2.",
    },
    {
      id: 3,
      inputText: "root = []",
      outputText: "0",
      explanation: "An empty tree has depth 0.",
    },
    {
      id: 4,
      inputText: "root = [0]",
      outputText: "1",
      explanation: "A tree with only the root node has depth 1.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>The number of nodes in the tree is in the range [0, 10⁴]</code>
</li> 
<li class='mt-2'>
  <code>-100 ≤ Node.val ≤ 100</code>
</li>`,
  handlerFunction: handlerMaxDepth,
  starterCode: starterCodeMaxDepth,
  order: 12,
  starterFunctionName: "function maxDepth(",
};
