import { Problem } from "../types/problem";
import { activitySelection } from "./activitySelection";
import { celebrity } from "./celebrity-problem";
import { maxDepth } from "./depth-of-binary-tree";
import { knapsack } from "./fractional-knapsack";
import { jobSequencing } from "./job-sequencing";
import { jumpGame } from "./jump-game";
import { mergeIntervals } from "./merge-intervals";
import { minimumPlatforms } from "./platform-problem";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { stocks } from "./stocks";
import { subsetSum } from "./subset-sum";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
import { container } from "./water-containier";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "activity-selection": activitySelection,
  "reverse-linked-list": reverseLinkedList,
  "stocks-buying":stocks,
  "celebrity-problem":celebrity,
  "water-container":container,
  "fractional-knapsack":knapsack,
  "minimum-platforms":minimumPlatforms,
  "job-sequencing":jobSequencing,
  "subset-sum":subsetSum,
  "valid-parentheses": validParentheses,
  "maximum-depth-of-binary-tree":maxDepth,
  "jump-game": jumpGame,
  "two-sum": twoSum,
  "search-a-2d-matrix": search2DMatrix,
  "merge-intervals":mergeIntervals
};
