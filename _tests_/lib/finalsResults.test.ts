import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { finalsResults } from '../../lib/finalsResults';
import { FinalsResultsTable } from '@/lib/types';

describe('finalsResults ', () => {
    describe('for a sample score table ', () => {
        const inputScores = [
            {
                id: 1,
                firstPlace: 7,
                secondPlace: 3,
                thirdPlace: 1
            },
            {
                id: 2,
                firstPlace: 7,
                secondPlace: 4,
                thirdPlace: 2
            },
            {
                id: 3,
                firstPlace: 7,
                secondPlace: 5,
                thirdPlace: 1
            },
            {
                id: 4,
                firstPlace: 3,
                secondPlace: 2,
                thirdPlace: 7
            },
            {
                id: 5,
                firstPlace: 1,
                secondPlace: 6,
                thirdPlace: 5
            },
        ];
        const results = finalsResults(inputScores);

        it('returns a winner with a clear majority', () => {
            const expectedWinner = 7;

            const winner = results[0];

            expect(winner).toStrictEqual(expectedWinner);
        });
        it('breaks the tie for second place', () => {
            const expected = 3;

            const outcome = results[1];

            expect(outcome).toStrictEqual(expected);
        });
        it('breaks the tie for third place', () => {
            const expected = 1;

            const outcome = results[2];

            expect(outcome).toStrictEqual(expected);
        });
    });
    describe('for a historical data sample I ', () => {
        const inputScores = [
            {
                id: 1,
                first: 78,
                second: 82,
                third: 80,
                fourth: 77,
                fifth: 79
            },
            {
                id: 2,
                first: 78,
                second: 82,
                third: 79,
                fourth: 77,
                fifth: 80
            },
            {
                id: 3,
                first: 78,
                second: 82,
                third: 80,
                fourth: 79,
                fifth: 77
            },
            {
                id: 4,
                first: 78,
                second: 80,
                third: 82,
                fourth: 77,
                fifth: 79
            },
            {
                id: 5,
                first: 78,
                second: 82,
                third: 80,
                fourth: 79,
                fifth: 77
            },
            {
                id: 6,
                first: 78,
                second: 82,
                third: 80,
                fourth: 77,
                fifth: 79
            },
            {
                id: 7,
                first: 78,
                second: 82,
                third: 77,
                fourth: 80,
                fifth: 79
            },
        ];
        const results: FinalsResultsTable = finalsResults(inputScores);

        it('returns a winner with a clear majority', () => {
            const expectedWinner = 78;

            const winner = results[0];

            expect(winner).toStrictEqual(expectedWinner);
        });
        it('places all scored couples', () => {
            const expected = 5;

            const outcome = results.length;

            expect(outcome).toStrictEqual(expected);
        });
        it('places each couple only to 1 position', () => {
            const uniqueValues = results.map((x, index) => results.indexOf(x) != index ? x : null)

            expect(results.length).toEqual(uniqueValues.length);
        })
    })
})