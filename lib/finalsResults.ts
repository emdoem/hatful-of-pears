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
            } else {
                modeForI = findMode(positionScoreTable[n + 1].filter(id => modeForI.includes(id)));
                n++;
            }
        }

        results[i] = modeForI[0];
        positionScoreTable = removeDancerFromTable(results[i], positionScoreTable);
    }

    return results;
}

/*
const scoresForFirstPlace = finalsScores.map((dancer) => dancer['1-1']);
    const indexForFirstPlace = findModeIndex(scoresForFirstPlace);
    results = {
        firstPlace: finalsScores[indexForFirstPlace].id,
        secondPlace: null,
        thirdPlace: null
    };
    if (podiumSize > 1) {
        for (let i=1; i<podiumSize; i++) {
            // logic for rest of podium positions
        }
    }
*/