import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { finalsResults } from '../../lib/finalsResults';
import { FinalsResultsTable } from '@/lib/types';

describe('finalsResults ', () => {       
    describe('for a random score table I', () => {
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
        });
        it('assigns 3rd place to dancer no 3', () => {
            const expected = 3;

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 4', () => {
            const expected = 4;

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 6', () => {
            const expected = 6;

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });

    })
    describe('for a random score table II', () => {
        const inputScores = [
            {
                id: 'A',
                scores: {
                    '1st': 2,
                    '2nd': 4,
                    '3rd': 1,
                    '4th': 5,
                    '5th': 6,
                    '6th': 3
                }
            },
            {
                id: 'B',
                scores: {
                    '1st': 2,
                    '2nd': 6,
                    '3rd': 5,
                    '4th': 4,
                    '5th': 1,
                    '6th': 3
                }
            },
            {
                id: 'C',
                scores: {
                    '1st': 6,
                    '2nd': 4,
                    '3rd': 1,
                    '4th': 2,
                    '5th': 3,
                    '6th': 5
                }
            },
            {
                id: 'D',
                scores: {
                    '1st': 6,
                    '2nd': 1,
                    '3rd': 2,
                    '4th': 5,
                    '5th': 3,
                    '6th': 4
                }
            },
            {
                id: 'E',
                scores: {
                    '1st': 4,
                    '2nd': 3,
                    '3rd': 5,
                    '4th': 6,
                    '5th': 1,
                    '6th': 2
                }
            },
        ];
        const results = finalsResults(inputScores);

        it('breaks the tie for 1st place', () => {
            const expected = 6;

            const winner = results[0];

            expect(winner).toStrictEqual(expected);
        });
        it('assigns 2nd place to dancer no 4', () => {
            const expected = 4;

            const secondPlace = results[1];

            expect(secondPlace).toStrictEqual(expected);
        });
        it('assigns 3rd place to dancer no 2', () => {
            const expected = 2;

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 1', () => {
            const expected = 1;

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 5', () => {
            const expected = 5;

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });
        it('assigns 6th place to dancer no 3', () => {
            const expected = 3;

            const sixthPlace = results[5];

            expect(sixthPlace).toStrictEqual(expected);
        });
    }) 
    describe('for a random score table III', () => {
        const inputScores = [
            {
                id: 'judge_A',
                scores: {
                    '1st': 106,
                    '2nd': 102,
                    '3rd': 104,
                    '4th': 103,
                    '5th': 105,
                    '6th': 101
                }
            },
            {
                id: 'judge_B',
                scores: {
                    '1st': 101,
                    '2nd': 104,
                    '3rd': 105,
                    '4th': 103,
                    '5th': 106,
                    '6th': 102
                }
            },
            {
                id: 'judge_C',
                scores: {
                    '1st': 104,
                    '2nd': 102,
                    '3rd': 101,
                    '4th': 105,
                    '5th': 103,
                    '6th': 106
                }
            },
            {
                id: 'judge_D',
                scores: {
                    '1st': 104,
                    '2nd': 103,
                    '3rd': 106,
                    '4th': 101,
                    '5th': 102,
                    '6th': 105
                }
            },
            {
                id: 'judge_E',
                scores: {
                    '1st': 104,
                    '2nd': 101,
                    '3rd': 103,
                    '4th': 102,
                    '5th': 106,
                    '6th': 105
                }
            }
        ];
        const results: FinalsResultsTable = finalsResults(inputScores);

        it('assigns 1st place to dancer no 104', () => {
            const expected = 104;

            const firstPlace = results[0];

            expect(firstPlace).toStrictEqual(expected);
        });
        it('assigns 2nd place to dancer no 101', () => {
            const expected = 101;

            const secondPlace = results[1];

            expect(secondPlace).toStrictEqual(expected);
        });
        it('assigns 3rd place to dancer no 102', () => {
            const expected = 102;

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 103', () => {
            const expected = 103;

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 106', () => {
            const expected = 106;

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });
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