import React from "react";
import { BsChevronUp, BsPlay, BsCheckCircle } from "react-icons/bs";

type EditorFooterProps = {
	onRun: () => void;
	onSubmit: () => void;
	loading: boolean;
	alreadySubmitted: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ onRun, onSubmit, loading, alreadySubmitted }) => {
	return (
		<div className="flex bg-dark-layer-1 absolute bottom-0 z-10 w-full">
			<div className="mx-5 my-[10px] flex justify-between w-full">
				<div className="ml-auto flex items-center space-x-4">
					<button
						className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-blue-s hover:bg-blue-600 active:bg-blue-700 rounded-lg"
						onClick={onRun}
						disabled={loading}
					>
						<BsPlay className="mr-1" />
						{loading ? "Running..." : "Run Code"}
					</button>
					<button
						className={`px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white ${alreadySubmitted
							? "bg-green-600 hover:bg-green-700"
							: "bg-dark-green-s hover:bg-green-600 active:bg-green-700"
							} rounded-lg`}
						onClick={onSubmit}
						disabled={loading}
					>
						{alreadySubmitted ? (
							<>
								<BsCheckCircle className="mr-1" />
								Submitted
							</>
						) : loading ? (
							"Submitting..."
						) : (
							"Submit"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditorFooter;