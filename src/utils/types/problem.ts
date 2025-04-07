export type Example = {
	inputText: string;
	outputText: string;
	explanation?: string;
};

export type Problem = {
	_id: string;
	title: string;
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	order: number;
	likes: number;
	dislikes: number;
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
