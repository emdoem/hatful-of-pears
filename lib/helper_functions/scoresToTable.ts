import { FinalsScoreTable, PositionScoreTable } from "../types";

// this collects judges scores for each position
export function scoresToTable(judgeScores: FinalsScoreTable): PositionScoreTable {
    const scoreTable: PositionScoreTable = [];
    for (let i = 1; i < Object.keys(judgeScores[0]).length; i++) {
        scoreTable[i-1] = [];
        judgeScores.forEach(judge => {            
            scoreTable[i-1].push(Object.values(judge)[i]);
        });
    }
    return scoreTable;
}
