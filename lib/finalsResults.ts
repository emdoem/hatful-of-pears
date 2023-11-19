import { FinalsResultsTable, FinalsScoreTable, PositionScoreTable } from "./types";
import { mode as findMode } from './helper_functions/mode';
import { aggregateScores } from "./helper_functions/aggregateScores";
import { scoresToTable } from "./helper_functions/scoresToTable";
import { removeDancerFromTable } from "./helper_functions/removeDancerFromTable";

type ScoresTable = DancerScores[];
type DancerScores = {
    id: string,
    scores: number[],
    calculated?: number,
    position?: number
}
type DancerScoresCalculated = {
    id: string,
    scores: number[],
    calculated: number,
    position?: number
}

function calculateScores(
    dancerScores: DancerScores, 
    position: number
) {
    dancerScores.calculated = dancerScores.scores.reduce(
        (accumulator, currentValue) => (currentValue <= position) ? ++accumulator : accumulator, 
        0
    );
    return dancerScores;
}

function findDancersForPosition(calculatedScoresTable: DancerScoresCalculated[]) {
    const maxCalculated = Math.max(...calculatedScoresTable.map(dancer => dancer.calculated), 0);
    return calculatedScoresTable
        .filter(dancer => dancer.calculated === maxCalculated)
        // .map(dancer => dancer.id);
}

export function recursiveResults(
    scoresTable: ScoresTable,
    results: string[][] = []
) {
    if (scoresTable.length > 0) { // base condition
        const position = results.flat().length + 1;

        // this is to be refactored into a single function?
        let calculatedScoresTable = scoresTable.map(dancer => calculateScores(dancer, position));
        let dancerForPosition = findDancersForPosition(calculatedScoresTable as DancerScoresCalculated[]);

        if (dancerForPosition.length === 1) {
            // majorityCheck  
            if (dancerForPosition[0].calculated < dancerForPosition[0].scores.length / 2) {
                // check next position
                calculatedScoresTable = scoresTable.map(dancer => calculateScores(dancer, position + 1));
                dancerForPosition = findDancersForPosition(calculatedScoresTable as DancerScoresCalculated[]);
                if (dancerForPosition.length > 1) {
                    // check the score sum
                    // update dancerForPosition
                } // continue
            } // continue to push
        } else {
            // tie for position
            if (position === 1) {
                calculatedScoresTable = scoresTable.map(dancer => calculateScores(dancer, position + 1));
                dancerForPosition = findDancersForPosition(calculatedScoresTable as DancerScoresCalculated[]);                
            } else {
                // check the score sum
                // update dancerForPosition
            }
        }

        results.push(dancerForPosition.map(dancer => dancer.id)); 
        const scoresTableForNextPos = scoresTable
            .filter(dancer => {
                // filter out placed dancer(s)
                const placedDancers = results.flat();
                return (!placedDancers.includes(dancer.id));
            })
            
        recursiveResults(scoresTableForNextPos, results);
    }
    return results;
}

// previous implementation was a mess, starting over
export function finalsResults(finalsScores: FinalsScoreTable) {
    // setup
    let positionScoreTable: PositionScoreTable = aggregateScores(scoresToTable(finalsScores));
    let results: FinalsResultsTable = [];

    function updateTable(placedDancer: number, position: number) {
        results[position] = placedDancer;
        positionScoreTable = removeDancerFromTable(placedDancer, positionScoreTable);
    }

    // start of iterative loop (for each position)
    for (let position = 0; position < positionScoreTable.length; position++) {
        const modeForPosition: number[] = findMode(positionScoreTable[position]);

        if (modeForPosition.length === 1) {
            // majority condition  
            if (checkMajority(positionScoreTable[position], modeForPosition[0])) { // majority
                updateTable(modeForPosition[0], position); // this good
            } else { // no majority                
                const modeForNext = findMode(positionScoreTable[position + 1]);
                if (modeForNext.length === 1) {
                    updateTable(modeForNext[0], position); // this good
                } else {
                    updateTable(modeForPosition[0], position); // this good
                }
            }
        } else {
            // tie on position 
            if (position > 0) {
                // tie for 2nd place & higher
                const modeForPrev = findMode(positionScoreTable[position - 1]);
                if (modeForPrev.length === 1) {
                    updateTable(modeForPrev[0], position); // this good
                } else {
                    // tie
                    results[position] = modeForPrev;
                    for (let j = 0; j < modeForPrev.length; j++) {
                        positionScoreTable = removeDancerFromTable(modeForPrev[j], positionScoreTable);
                    }
                    position++;
                }
            } else {
                // tie for 1st place
                const modeForNext = findMode(positionScoreTable[position + 1]);
                if (modeForNext.length === 1) { // this is the issue
                    updateTable(modeForNext[0], position);
                } else {
                    // tie
                    if (modeForNext === modeForPosition) {
                        results[position] = modeForPosition;
                        for (let j = 0; j < modeForPosition.length; j++) {
                            positionScoreTable = removeDancerFromTable(modeForPosition[j], positionScoreTable);
                        }
                        position++;
                    } else {
                        const tieWinner = modeForNext.filter((dancer: number) => modeForPosition.includes(dancer))[0];
                        const tieLoser = modeForNext.filter((dancer: number) => dancer !== tieWinner)[0];
                        updateTable(tieWinner, position);
                        updateTable(tieLoser, position + 1);
                        position++;
                    }

                }
            }
        }
    }

    // end of loop
    return results;
}

function checkMajority(arrayOfNumbers: number[], modeOfArray: number): boolean {
    const occurenceCount = arrayOfNumbers.filter(number => number === modeOfArray).length;
    if (occurenceCount > arrayOfNumbers.length / 2) {
        return true;
    }
    return false;
}