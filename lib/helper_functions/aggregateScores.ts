import { PositionScoreTable } from "../types";

// this aggregates scores into field 'I-I', 'I-II', 'I-III' etc.
export function aggregateScores(scoreTable: PositionScoreTable): PositionScoreTable {
    for (let i = 1; i < scoreTable.length; i++) {
        scoreTable[i].push(...scoreTable[i - 1]);
    }
    return scoreTable;
}
