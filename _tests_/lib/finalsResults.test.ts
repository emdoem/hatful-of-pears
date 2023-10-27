import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { finalsResults } from '../../lib/finalsResults';
import { FinalsResultsTable } from '@/lib/types';

describe('finalsResults ', () => {
    describe('for a sample score table ', () => {
        const inputScores = [
            {
                id: 'judge_A',
                scores: {
                    firstPlace: 7,
                    secondPlace: 3,
                    thirdPlace: 1
                }
            },
            {
                id: 'judge_B',
                scores: {
                    firstPlace: 7,
                    secondPlace: 4,
                    thirdPlace: 2
                }
            },
            {
                id: 'judge_C',
                scores: {
                    firstPlace: 7,
                    secondPlace: 5,
                    thirdPlace: 1
                }
            },
            {
                id: 'judge_D',
                scores: {
                    firstPlace: 3,
                    secondPlace: 2,
                    thirdPlace: 7
                }
            },
            {
                id: 'judge_E',
                scores: {
                    firstPlace: 1,
                    secondPlace: 6,
                    thirdPlace: 5
                }
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
    describe('for a random score table', () => {
        const inputScores = [
            {
                id: 'A',
                scores: {
                    '1st': 1,
                    '2nd': 2,
                    '3rd': 3,
                    '4th': 4,
                    '5th': 5,
                    '6th': 6
                }
            },
            {
                id: 'B',
                scores: {
                    '1st': 2,
                    '2nd': 1,
                    '3rd': 4,
                    '4th': 3,
                    '5th': 6,
                    '6th': 5
                }
            },
            {
                id: 'C',
                scores: {
                    '1st': 1,
                    '2nd': 3,
                    '3rd': 2,
                    '4th': 4,
                    '5th': 5,
                    '6th': 6
                }
            },
            {
                id: 'D',
                scores: {
                    '1st': 2,
                    '2nd': 1,
                    '3rd': 4,
                    '4th': 3,
                    '5th': 6,
                    '6th': 5
                }
            },
            {
                id: 'E',
                scores: {
                    '1st': 3,
                    '2nd': 2,
                    '3rd': 1,
                    '4th': 6,
                    '5th': 5,
                    '6th': 4
                }
            },
        ];
        const results = finalsResults(inputScores);

        it('presents a tie for 1st place', () => {
            const expected = [1, 2];

            const winner = results[0];

            expect(winner).toStrictEqual(expected);
        })

    })
    describe('for a historical data sample I ', () => {
        const inputScores = [
            {
                id: 'judge_A',
                scores: {
                    first: 78,
                    second: 82,
                    third: 80,
                    fourth: 77,
                    fifth: 79
                }
            },
            {
                id: 'judge_B',
                scores: {
                    first: 78,
                    second: 82,
                    third: 79,
                    fourth: 77,
                    fifth: 80
                }
            },
            {
                id: 'judge_C',
                scores: {
                    first: 78,
                    second: 82,
                    third: 80,
                    fourth: 79,
                    fifth: 77
                }
            },
            {
                id: 'judge_D',
                scores: {
                    first: 78,
                    second: 80,
                    third: 82,
                    fourth: 77,
                    fifth: 79
                }
            },
            {
                id: 'judge_E',
                scores: {
                    first: 78,
                    second: 82,
                    third: 80,
                    fourth: 79,
                    fifth: 77
                }
            },
            {
                id: 'judge_F',
                scores: {
                    first: 78,
                    second: 82,
                    third: 80,
                    fourth: 77,
                    fifth: 79
                }
            },
            {
                id: 'judge_G',
                scores: {
                    first: 78,
                    second: 82,
                    third: 77,
                    fourth: 80,
                    fifth: 79
                }
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