import { FinalsScoreTable, PositionScoreTable } from "../types";

// this collects judges scores for each position
export function scoresToTable(judgeScores: FinalsScoreTable): PositionScoreTable {
    const scoreTable: PositionScoreTable = [];
    for (let i = 0; i < Object.keys(judgeScores[0].scores).length; i++) {
        scoreTable[i] = [];
        judgeScores.forEach(judge => {            
            scoreTable[i].push(Object.values(judge.scores)[i]);
        });
    }
    return scoreTable;
}
