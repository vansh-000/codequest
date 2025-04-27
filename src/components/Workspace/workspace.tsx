import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/utils/types/problem";

type WorkspaceProps = {
	problem: Problem;
	existingSubmission: any | null;
	alreadySubmitted:boolean
};

const Workspace: React.FC<WorkspaceProps> = ({ problem, existingSubmission, alreadySubmitted }) => {
	return (
		<Split className="split" minSize={0}>
			<ProblemDescription problem={problem} />
			<Playground problem={problem} existingSubmission={existingSubmission} alreadySubmitted={alreadySubmitted} />
		</Split>
	);
};

export default Workspace;