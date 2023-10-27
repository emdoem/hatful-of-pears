import { FinalsResultsTable, FinalsScoreTable, PositionScoreTable } from "./types";
import { mode as findMode } from './helper_functions/mode';
import { aggregateScores } from "./helper_functions/aggregateScores";
import { scoresToTable } from "./helper_functions/scoresToTable";
import { removeDancerFromTable } from "./helper_functions/removeDancerFromTable";

export function finalsResults(finalsScores: FinalsScoreTable) {
    let positionScoreTable: PositionScoreTable = scoresToTable(finalsScores);
    aggregateScores(positionScoreTable);

    let results: FinalsResultsTable = [];

    for (let i = 0; i < positionScoreTable.length; i++) {
        let modeForI: number[] = findMode(positionScoreTable[i]);
        let n = i;
        while (modeForI.length > 1) {
            // tiebreaker logic here
            if (i > 1) {
                modeForI = findMode(positionScoreTable[i - 1])
            } else if (positionScoreTable[n + 1]) {
                modeForI = findMode(positionScoreTable[n + 1].filter(id => modeForI.includes(id)));
                n++;
            } else {
                return modeForI;
            }
        }

        if (modeForI.length === 1) {
            results[i] = modeForI[0];
            positionScoreTable = removeDancerFromTable(results[i] as number, positionScoreTable);
        } else {
            results[i] = modeForI;
            if (isArrayOfNumbers(results[i])) {
                for (let j = 0; j < results[i].length; j++) {
                    positionScoreTable = removeDancerFromTable(results[i][j], positionScoreTable);
                }
            }
        }
    }

    return results;
}

function isArrayOfNumbers(arr: number | number[]): arr is number[] {
    return Array.isArray(arr);
}