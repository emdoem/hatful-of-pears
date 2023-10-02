import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { scoresToTable } from '../../lib/helper_functions/scoresToTable';
import { PositionScoreTable } from '@/lib/types';

describe('scoresToTable', () => {
    it('rewrites FinalsScoreTable to PositionScoreTable', () => {
        const input = [
            {
                id: 1,
                firstPlace: 7,
                secondPlace: 3,
                thirdPlace: 1
            },
            {
                id: 2,
                firstPlace: 3,
                secondPlace: 1,
                thirdPlace: 7
            },
            {
                id: 3,
                firstPlace: 3,
                secondPlace: 1,
                thirdPlace: 7
            },
        ];
        const expectedOutput: PositionScoreTable = [
            [7, 3, 3],
            [3, 1, 1],
            [1, 7, 7]
        ];

        const outputTable: PositionScoreTable = scoresToTable(input);

        expect(outputTable).toStrictEqual(expectedOutput);
    })
})