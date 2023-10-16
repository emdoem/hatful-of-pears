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

export type FinalsResultsTable = number[]

export type FinalsScoreTable = JudgeScoreTable[];

type JudgeScoreTable = {
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
    scores: {[judgeId: string]: number}
};

type Role = 'follower' | 'leader' | 'solo';
export type DancerValues = Dancer | MixedCouple | FixedCouple;
