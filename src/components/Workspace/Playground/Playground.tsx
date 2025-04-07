import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";

type PlaygroundProps = {
	problem: Problem
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
	console.log(problem);
	console.log(problem.testCases);
	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav />

			<Split className='h-[calc(100vh-95px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={problem.starterCode}
						theme={vscodeDark}
						extensions={[cpp()]}
					/>
				</div>
				<div className='w-full px-5 overflow-auto'>
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					<div className='font-semibold my-4'>
						{problem.testCases.map((testcase, index) => (
							<div key={index} className='mb-6'>
								<p className='text-sm font-medium mt-4 text-white'>
									Input {index + 1}:
								</p>
								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{testcase.input}
								</div>

								<p className='text-sm font-medium mt-4 text-white'>
									Output {index + 1}:
								</p>
								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{testcase.output}
								</div>
							</div>
						))}
					</div>
				</div>
			</Split>
			<EditorFooter />
		</div>
	);
};

export default Playground;
