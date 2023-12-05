import { DancerScores, DancerScoresCalculated, ScoresTable } from "./types";

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

function scoreSum(
    dancerScores: DancerScoresCalculated,
    position: number
) {
    dancerScores.calculated = dancerScores.scores.reduce(
        (accumulator, currentValue) => (currentValue <= position) ? accumulator + currentValue : accumulator,
        0
    );
    return dancerScores;
}

function findSmallestSum(tiedForPosition: DancerScoresCalculated[]) {
    const minValue = tiedForPosition.reduce(
        (minValue, current) => (current.calculated < minValue) ? current.calculated : minValue,
        Infinity
    )
    return tiedForPosition.filter(dancer => dancer.calculated === minValue);
}

function findDancersForPosition(scoresTable: ScoresTable, position: number) {
    const calculatedScoresTable: DancerScoresCalculated[] = scoresTable.map(dancer => calculateScores(dancer, position) as DancerScoresCalculated);
    const maxCalculated = Math.max(...calculatedScoresTable.map(dancer => dancer.calculated), 0);
    return calculatedScoresTable
        .filter(dancer => dancer.calculated === maxCalculated)
    // .map(dancer => dancer.id);
}

function filterOutPlacedDancers(scoresTable: ScoresTable, results: string[][]) {
    return scoresTable
        .filter(dancer => {
            // filter out placed dancer(s)
            const placedDancers = results.flat();
            return (!placedDancers.includes(dancer.id));
        })
}

export function finalsResults(
    scoresTable: ScoresTable,
    results: string[][] = []
) {
    if (scoresTable.length === 0) return results;
    let tieLoser: DancerScoresCalculated[] = []; // will have to find a way to get rid of it
    let position = results.flat().length + 1;
    // if 2 couples get tied for a position - leave the next position blank i.e.: 1st place: couples 101 & 103, 3rd place: couple 107 and no 2nd place
    if (results[results.length - 1] && results[results.length - 1].length > 1) results.push([]); // this works (for now, unless I get 3 couples tied for a position)

    // first check
    let dancerForPosition = findDancersForPosition(scoresTable, position);

    // majority check
    while (dancerForPosition[0].calculated < dancerForPosition[0].scores.length / 2) {
        // no majority - check next position
        position++;
        dancerForPosition = findDancersForPosition(scoresTable, position);
    }

    // 1 dancer or tie?
    if (dancerForPosition.length > 1) {
        // more dancers - check scoreSum
        const tiedForPosition = dancerForPosition.map(dancer => scoreSum(dancer, position));
        // update dancerForPosition
        dancerForPosition = findSmallestSum(tiedForPosition);
        // assign tie loser to next position
        tieLoser = tiedForPosition.filter(dancer => !dancerForPosition.includes(dancer));
    }

    // finish step
    results.push(dancerForPosition.map(dancer => dancer.id));
    while (tieLoser.length > 1 && findSmallestSum(tieLoser).length === 1) {
        dancerForPosition = findSmallestSum(tieLoser);
        tieLoser = tieLoser.filter(dancer => !dancerForPosition.includes(dancer));
    }
    const dancersForNext: DancerScoresCalculated[] = [];
    if (tieLoser.length > 0) {
        tieLoser.forEach(dancer => dancersForNext.push(dancer));
        results.push(dancersForNext.map(dancer => dancer.id));
    } // this is suboptimal, looking for a work around

    // recursive call
    const scoresTableForNextPos = filterOutPlacedDancers(scoresTable, results);
    results = finalsResults(scoresTableForNextPos, results);

    return results;
}