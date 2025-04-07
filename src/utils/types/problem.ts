export type Example = {
	inputText: string;
	outputText: string;
	explanation?: string;
};
export type TestCase = {
	input: string;
	output: string;
};
export type Problem = {
	_id: string;
	title: string;
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	order: number;
	likes: number;
	dislikes: number;
	testCases:TestCase[];
	description: string;
	examples: Example[];
	constraints: string[];
	handlerFunction: string;
	starterCode: string;
	videoId?: string;
	link?: string;
};

export type DBProblem = {
	_id: string;
	title: string;
	category: string;
	difficulty: string;
	videoId?: string;
	link?: string;
};
