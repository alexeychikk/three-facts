declare namespace ThreeFacts {
	export interface Question {
		author?: string;
		id?: string;
		text?: string;
	}

	export interface Vote {
		author?: string;
		game?: string;
		player?: string;
		// question?: string; // not sure if this is necessary
	}

	export interface Game {
		admin?: string;
		currentQuestion?: string;
		discussTime?: number;
		id?: string;
		name?: string;
		players?: string[];
		questions?: string[];
		remainingQuestions?: string[];
		voteTime?: number;
	}

	export interface Player {
		id?: string;
		name?: string;
	}
}
