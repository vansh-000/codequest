import React from "react";
import { BsChevronUp } from "react-icons/bs";

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
				<div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
					<button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
						Console
						<div className="ml-1 transform transition flex items-center">
							<BsChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
						</div>
					</button>
				</div>
				<div className="ml-auto flex items-center space-x-4">
					<button
						className={`px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white ${alreadySubmitted
								? "bg-green-600 hover:bg-green-700 cursor-default"
								: "bg-dark-green-s hover:bg-green-3 active:bg-green-3"
							} rounded-lg`}
						onClick={onSubmit}
						disabled={loading || alreadySubmitted}
					>
						{alreadySubmitted ? "Submitted" : (loading ? "Submitting..." : "Submit")}
					</button>

				</div>
			</div>
		</div>
	);
};

export default EditorFooter;
