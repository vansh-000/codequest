import { Problem } from "../types/problem";
import { activitySelection } from "./activitySelection";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "activity-selection": activitySelection,
  "reverse-linked-list": reverseLinkedList,
  "valid-parentheses": validParentheses,
  "jump-game": jumpGame,
  "two-sum": twoSum,
  "search-a-2d-matrix": search2DMatrix,
};
