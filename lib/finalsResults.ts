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
    let tieLoser: DancerScoresCalculated[] = []; // will have to find a way to get rid of it
    if (scoresTable.length > 0) { // base condition
        const position = results.flat().length + 1;
        // if 2 couples get tied for a position - leave the next position blank i.e.: 1st place: couples 101 & 103, 3rd place: couple 107 and no 2nd place
        if (results[results.length - 1] && results[results.length - 1].length > 1) results.push([]); // this works (for now, unless I get 3 couples tied for a position)

        let dancerForPosition = findDancersForPosition(scoresTable, position);

        if (dancerForPosition.length === 1) {
            // majorityCheck  
            if (dancerForPosition[0].calculated < dancerForPosition[0].scores.length / 2) {
                // check next position
                dancerForPosition = findDancersForPosition(scoresTable, position + 1);
                if (dancerForPosition.length > 1) {
                    // check the score sum
                    const tiedForPosition = dancerForPosition.map(dancer => scoreSum(dancer, position));                    
                    // update dancerForPosition
                    dancerForPosition = findSmallestSum(tiedForPosition);
                } // continue
            } // continue to results.push()
        } else {
            // tie for position
            if (position === 1) {
                dancerForPosition = findDancersForPosition(scoresTable, position + 1);   
                if (dancerForPosition.length > 1) {
                    // check the score sum
                    const tiedForPosition = dancerForPosition.map(dancer => scoreSum(dancer, position + 1));                    
                    // update dancerForPosition
                    dancerForPosition = findSmallestSum(tiedForPosition);
                } // continue             
            } else {
                // check the score sum
                const tiedForPosition = dancerForPosition.map(dancer => scoreSum(dancer, position));                    
                // update dancerForPosition
                dancerForPosition = findSmallestSum(tiedForPosition);
                // assign tie loser to next position
                tieLoser = tiedForPosition.filter(dancer => !dancerForPosition.includes(dancer));
            }
        }

        results.push(dancerForPosition.map(dancer => dancer.id)); 
        if (tieLoser.length > 0) results.push([tieLoser[0].id]); // this is suboptimal, looking for a work around
        const scoresTableForNextPos = filterOutPlacedDancers(scoresTable, results);            
        results = finalsResults(scoresTableForNextPos, results);
    }
    return results;
}