export type PositionScoreTable = number[][];
/* previous version of this type, but it'll be easier to work with a 2-dimensional table
{
    'I-I': number[],
    'I-II': number[],
    'I-III': number[],
    'I-IV': number[],
    'I-V': number[],
    'I-VI': number[],
    'I-VII': number[],
    'I-VIII': number[]
}
*/

export type FinalsResultsTable = (number | number[])[]

export type FinalsScoreTable = JudgeScoreTable[];

export type JudgeScoreTable = {
    id: string,
    scores: {[position: string]: number}
}

export type FixedCouple = {
    id: number,
    followersName: string,
    leadersName: string
}

export type MixedCouple = {
    id: number,
    leader: Dancer,
    follower: Dancer
};

export type Dancer = { 
    id: number,
    firstName: string,
    lastName: string,
    role: Role,
    // scores: {[judgeId: string]: number} - this is unnecessary - scores will be derived from state by a selector
};

type Role = 'follower' | 'leader' | 'solo';
export type DancerValues = Dancer | MixedCouple | FixedCouple;

export type ScoresTable = DancerScores[];
export type DancerScores = {
    id: string;
    scores: number[];
    calculated?: number;
    position?: number;
};
export type DancerScoresCalculated = {
    id: string;
    scores: number[];
    calculated: number;
    position?: number;
};
