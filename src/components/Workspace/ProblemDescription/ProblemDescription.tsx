import { Problem } from "@/utils/types/problem";

type ProblemDescriptionProps = {
};

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
							<div className='flex-1 mr-2 text-lg text-white font-medium'>Hello World</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;
