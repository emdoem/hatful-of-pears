import { FinalsResultsTable, FinalsScoreTable, PositionScoreTable } from "./types";
import { mode as findMode } from './helper_functions/mode';
import { aggregateScores } from "./helper_functions/aggregateScores";
import { scoresToTable } from "./helper_functions/scoresToTable";
import { removeDancerFromTable } from "./helper_functions/removeDancerFromTable";

export function finalsResults(finalsScores: FinalsScoreTable) {
    let positionScoreTable: PositionScoreTable = scoresToTable(finalsScores);
    positionScoreTable = aggregateScores(positionScoreTable);

    let results: FinalsResultsTable = [];

    for (let position = 0; position < positionScoreTable.length; position++) {
        let modeForPosition: number[] = findMode(positionScoreTable[position]);
        // majority condition?
        if (modeForPosition.length === 1) {
            const occurenceCount = positionScoreTable[position].filter(dancer => modeForPosition.includes(dancer)).length;
            if (occurenceCount > positionScoreTable[0].length / 2) {
                results[position] = modeForPosition[0];
                positionScoreTable = removeDancerFromTable(results[position] as number, positionScoreTable);
            } else {
                let pointerForTies = position;
                do {
                    if (position === 1 && positionScoreTable[pointerForTies + 1]) {
                        modeForPosition = findMode(positionScoreTable[pointerForTies + 1].filter(id => modeForPosition.includes(id)));
                        pointerForTies++;
                    } else if (position > 1 && positionScoreTable[pointerForTies - 1]) {
                        modeForPosition = findMode(positionScoreTable[pointerForTies - 1]);
                        pointerForTies--;
                    } else {
                        break;
                    }
                } while (modeForPosition.length > 1);
                if (modeForPosition.length === 1) {
                    results[position] = modeForPosition[0];
                    positionScoreTable = removeDancerFromTable(results[position] as number, positionScoreTable);
                } else {
                    const tiedDancers = modeForPosition; // this is bonkers, but there's a typing issue with using results[position]
                    results[position] = modeForPosition;
                    for (let j = 0; j < tiedDancers.length; j++) {
                        positionScoreTable = removeDancerFromTable(tiedDancers[j], positionScoreTable);
                    }
        
                }
            }
        }
    }

    return results;
}

function isArrayOfNumbers(arr: number | number[]): arr is number[] {
    return Array.isArray(arr);
}