import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { finalsResults } from '../../lib/finalsResults';

function expectPosition(
    results: ReturnType<typeof finalsResults>,
    position: number,
    expected: string[]
) {
    const outcome = results[position - 1];
    return expect(outcome).toStrictEqual(expected);
}

// asserting all position assignments for each case to check for any erratic regression
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
            expectPosition(results, 1, ['7', '13']);
        });
        it('assigns 2nd place to no dancer', () => {
            expectPosition(results, 2, []);
        })
        it('assigns 3rd place to dancer no 27', () => {
            expectPosition(results, 3, ['27']);
        });
        it('assigns 4th place to dancer no 4', () => {
            expectPosition(results, 4, ['4']);
        });
        it('assigns 5th place to dancer no 3', () => {
            expectPosition(results, 5, ['3']);
        });

    });
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
            expectPosition(results, 1, ['6']);
        });
        it('assigns 2nd place to dancer no 4', () => {
            expectPosition(results, 2, ['4']);
        });
        it('assigns 3rd place to dancer no 2', () => {
            expectPosition(results, 3, ['2']);
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
    });
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
        it('assigns 3rd place to dancer no 103', () => {
            expectPosition(results, 3, ['103']);
        });
        it('assigns 4th place to dancer no 102', () => {
            expectPosition(results, 4, ['102']);
        });
        it('assigns 5th place to dancer no 106', () => {
            const expected = ['106'];

            const fifthPlace = results[4];

            expect(fifthPlace).toStrictEqual(expected);
        });
    });
    describe('for a random score table IV', () => {
        const inputScores = [
            {
                id: '101',
                scores: [4, 2, 2, 4, 4]
            },
            {
                id: '102',
                scores: [6, 1, 6, 3, 5]
            },
            {
                id: '103',
                scores: [2, 3, 4, 5, 3]
            },
            {
                id: '104',
                scores: [5, 6, 5, 1, 6]
            },
            {
                id: '105',
                scores: [1, 5, 3, 6, 1]
            },
            {
                id: '106',
                scores: [3, 4, 1, 2, 2]
            }
        ]
        const results = finalsResults(inputScores);

        it('assigns 1st place to dancer no 106', () => {
            expectPosition(results, 1, ['106']);
        });
        it('assings 2nd place to dancer no 105', () => {
            expectPosition(results, 2, ['105']);
        });
        it('assigns 3rd position to dancer no 103 - as 101 lacks majority', () => {
            expectPosition(results, 3, ['103']);
        });
        it('assigns 4th position to dancer no 101', () => {
            expectPosition(results, 4, ['101']);
        })
    });
    describe('for a random score table with 8 dancers', () => {
        const inputScores = [
            {
                id: '101',
                scores: [5, 1, 8, 4, 6, 5, 8]
            },
            {
                id: '102',
                scores: [8, 3, 3, 7, 8, 1, 4]
            },
            {
                id: '103',
                scores: [4, 4, 7, 1, 5, 4, 3]
            },
            {
                id: '104',
                scores: [1, 5, 4, 2, 2, 8, 1]
            },
            {
                id: '105',
                scores: [3, 2, 2, 6, 1, 2, 7]
            },
            {
                id: '106',
                scores: [6, 6, 5, 3, 7, 3, 2]
            },
            {
                id: '107',
                scores: [7, 7, 1, 8, 4, 6, 6]
            },
            {
                id: '108',
                scores: [2, 8, 6, 5, 3, 7, 5]
            }
        ];
        const results = finalsResults(inputScores);

        it('assigns 1st position to dancer no 104', () => {
            expectPosition(results, 1, ['104']);
        });
        it('assigns 2nd position to dancer no 105', () => {
            expectPosition(results, 2, ['105']);
        });
        it('assigns 3rd position to dancer no 103', () => {
            expectPosition(results, 3, ['103']);
        });
        it('assigns 4th position to dancer no 102', () => {
            expectPosition(results, 4, ['102']);
        });
        it('assigns 5th position to dancer no 106', () => {
            expectPosition(results, 5, ['106']);
        });
        it('assigns a tie on positions 6-7', () => {
            expectPosition(results, 6, ['101', '108']);
        });
    });
    describe('for Balboa Christmas Shuffle 2023 Mix&Match scores', () => {
        const inputScores = [
            {
                id: '101',
                scores: [1, 5, 3, 2, 2]
            },
            {
                id: '102',
                scores: [4, 8, 8, 6, 7]
            },
            {
                id: '103',
                scores: [5, 2, 6, 5, 6]
            },
            {
                id: '104',
                scores: [3, 1, 2, 3, 3]
            },
            {
                id: '105',
                scores: [6, 7, 5, 4, 4]
            },
            {
                id: '106',
                scores: [7, 4, 4, 7, 5]
            },
            {
                id: '107',
                scores: [8, 6, 7, 8, 8]
            },
            {
                id: '108',
                scores: [2, 3, 1, 1, 1]
            }
        ];
        const results = finalsResults(inputScores);

        it('assigns 1st position to dancer no 180', () => {
            expectPosition(results, 1, ['108']);
        });
        it('assigns 2nd position to dancer no 101', () => {
            expectPosition(results, 2, ['101']);
        });
        it('assigns 3rd position to dancer no 104', () => {
            expectPosition(results, 3, ['104']);
        });
        it('assigns 4th position to dancer no 103', () => {
            expectPosition(results, 4, ['103']);
        });
        it('assigns a tie on positions 5-6', () => {
            expectPosition(results, 5, ['105', '106']);
        });
        it('assigns 7th position to dancer no 102', () => {
            expectPosition(results, 7, ['102']);
        })
    });
})