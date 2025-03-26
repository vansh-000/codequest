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
  "67e384b983cbbb6a99297924": activitySelection,
  "67e384de83cbbb6a99297926": reverseLinkedList,
  "67e384f783cbbb6a99297928": stocks,
  "67e3850d83cbbb6a9929792a": celebrity,
  "67e3857a83cbbb6a9929792e": container,
  "67e385fd83cbbb6a99297932": knapsack,
  "67e3860e83cbbb6a99297934": minimumPlatforms,
  "67e3861e83cbbb6a99297936": jobSequencing,
  "67e3864f83cbbb6a99297938": subsetSum,
  "67e3852683cbbb6a9929792c": validParentheses,
  "67e3866483cbbb6a9929793a": maxDepth,
  "67e385e783cbbb6a99297930": jumpGame,
  "67e3867c83cbbb6a9929793c": twoSum,
  "67e3869883cbbb6a9929793e": search2DMatrix,
  "67e386b383cbbb6a99297940": mergeIntervals,
};
