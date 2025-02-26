import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
	return (
		<div className='bg-dark-layer-1'>
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>1.Activity Selection Problem</div>
						</div>
						<div className='flex items-center mt-3'>
							<div className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}>
								Medium
							</div>
							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
								<BsCheck2Circle />
							</div>
							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
								<AiFillLike />
								<span className='text-xs'>85</span>
							</div>
							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'>
								<AiFillDislike />
								<span className='text-xs'>5</span>
							</div>
							<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '>
								<TiStarOutline />
							</div>
						</div>
						<div className='text-white text-sm'>
							<p className='mt-3'>
								Given <code>n</code> activities with their start and end times, select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.
							</p>
							<p className='mt-3'>
								Return the indices of the selected activities in order.
							</p>
						</div>
						<div className='mt-4'>
							<div>
								<p className='font-medium text-white '>Example 1: </p>
								<div className='example-card'>
									<pre>
										<strong className='text-white'>Input: </strong> start = [1,3,0,5,8,5], end = [2,4,6,7,9,9] <br />
										<strong>Output:</strong> [0,1,3,4] <br />
										<strong>Explanation:</strong> Selecting activities (0,1,3,4) allows for maximum activities without overlap.
									</pre>
								</div>
							</div>
							<div>
								<p className='font-medium text-white '>Example 2: </p>
								<div className='example-card'>
									<pre>
										<strong className='text-white'>Input: </strong> start = [10,12,20], end = [20,25,30] <br />
										<strong>Output:</strong> [0,1,2] <br />
										<strong>Explanation:</strong> All activities can be selected without conflicts.
									</pre>
								</div>
							</div>
						</div>

						{/* Constraints */}
						<div className='my-5'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc'>
								<li className='mt-2'>
									<code>1 ≤ n ≤ 10</code>
								</li>

								<li className='mt-2'>
									<code>1 ≤ start[i], end[i] ≤ 100</code>
								</li>
								<li className='mt-2'>
									<strong>Start time of an activity is always less than its end time.</strong>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;