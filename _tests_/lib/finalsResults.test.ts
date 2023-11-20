import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { finalsResults } from '../../lib/finalsResults';
import { FinalsResultsTable } from '@/lib/types';

describe('finalsResults ', () => {       
    describe('for a random score table I', () => {
        const inputScores = [
            {
                id: '7',
                scores: [1, 2, 1, 2, 3]
            },
            {
                id: '13',
                scores: [2, 1, 3, 1, 2]
            },
            {
                id: '27',
                scores: [3, 4, 2, 4, 1]
            },
            {
                id: '4',
                scores: [4, 3, 4, 3, 6]
            },
            {
                id: '1',
                scores: [5, 6, 5, 6, 5]
            },
            {
                id: '3',
                scores: [6, 5, 6, 5, 4]
            }
        ];
        const results = finalsResults(inputScores);

        it('presents a tie for 1st place', () => {
            const expected = ['7', '13'];

            const winner = results[0];

            expect(winner).toStrictEqual(expected);
        });
        it('assigns 3rd place to dancer no 27', () => {
            const expected = ['27'];

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 4', () => {
            const expected = ['4'];

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 3', () => {
            const expected = ['3'];

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });

    })
    describe('for a random score table II', () => {
        const inputScores = [
            {
                id: '1',
                scores: [3, 5, 3, 2, 5]
            },
            {
                id: '2',
                scores: [1, 1, 4, 3, 6]
            },
            {
                id: '3',
                scores: [6, 6, 5, 5, 2]
            },
            {
                id: '4',
                scores: [2, 4, 2, 6, 1]
            },
            {
                id: '5',
                scores: [4, 3, 6, 4, 3]
            },
            {
                id: '6',
                scores: [5, 2, 1, 1, 4]
            }
        ];
        const results = finalsResults(inputScores);

        it('breaks the tie for 1st place', () => {
            const expected = ['6'];

            const winner = results[0];

            expect(winner).toStrictEqual(expected);
        });
        it('assigns 2nd place to dancer no 4', () => {
            const expected = ['4'];

            const secondPlace = results[1];

            expect(secondPlace).toStrictEqual(expected);
        });
        it('assigns 3rd place to dancer no 2', () => {
            const expected = ['2'];

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 1', () => {
            const expected = ['1'];

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 5', () => {
            const expected = ['5'];

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });
        it('assigns 6th place to dancer no 3', () => {
            const expected = ['3'];

            const sixthPlace = results[5];

            expect(sixthPlace).toStrictEqual(expected);
        });
    }) 
    describe('for a random score table III', () => {
        const inputScores = [
            {
                id: '101',
                scores: [6, 1, 3, 4, 2]
            },
            {
                id: '102',
                scores: [2, 6, 2, 5, 4]
            },
            {
                id: '103',
                scores: [4, 4, 5, 2, 3]
            },
            {
                id: '104',
                scores: [3, 2, 1, 1, 1]
            },
            {
                id: '105',
                scores: [5, 3, 4, 6, 6]
            },
            {
                id: '106',
                scores: [1, 5, 6, 3, 5]
            }
        ];
        const results = finalsResults(inputScores);

        it('assigns 1st place to dancer no 104', () => {
            const expected = ['104'];

            const firstPlace = results[0];

            expect(firstPlace).toStrictEqual(expected);
        });
        it('assigns 2nd place to dancer no 101', () => {
            const expected = ['101'];

            const secondPlace = results[1];

            expect(secondPlace).toStrictEqual(expected);
        });
        it('assigns 3rd place to dancer no 102', () => {
            const expected = ['102'];

            const thirdPlace = results[2];

            expect(thirdPlace).toStrictEqual(expected);
        });
        it('assigns 4th place to dancer no 103', () => {
            const expected = ['103'];

            const fourthPlace = results[3];

            expect(fourthPlace).toStrictEqual(expected);
        });
        it('assigns 5th place to dancer no 106', () => {
            const expected = ['106'];

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });
    })
    
})