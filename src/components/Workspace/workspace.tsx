import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import { Problem } from "@/utils/types/problem";

type WorkspaceProps = {
	problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
	const [solved, setSolved] = useState(false);
	return (
		<Split className='split' minSize={0}>
			<ProblemDescription problem={problem} />
			<div className='bg-dark-fill-2'>
				<Playground problem={problem} />
			</div>
		</Split>
	);
};
export default Workspace;
