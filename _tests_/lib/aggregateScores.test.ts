import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { aggregateScores } from '../../lib/helper_functions/aggregateScores';
import { PositionScoreTable } from '@/lib/types';

describe('aggregateScores', () => {
    it('aggregates lower arrays to include those above', () => {
        const inputTable: PositionScoreTable = [
            [7, 3, 3],
            [3, 1, 1],
            [1, 7, 7]
        ];
        const expectedOutput: PositionScoreTable = [
            [7, 3, 3],
            [3, 1, 1, 7, 3, 3],
            [1, 7, 7, 3, 1, 1, 7, 3, 3]
        ]

        const outputTable: PositionScoreTable = aggregateScores(inputTable);

        expect(outputTable).toStrictEqual(expectedOutput);
    })
})