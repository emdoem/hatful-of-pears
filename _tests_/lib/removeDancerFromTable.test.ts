import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import { removeDancerFromTable } from '../../lib/helper_functions/removeDancerFromTable';
import { PositionScoreTable } from '@/lib/types';

describe('removeDancerFromTable', () => {
    it('removes a dancer by id from the score table - sample I', () => {
        const scoreTable: PositionScoreTable = [
            [7, 3, 3],
            [3, 1, 1, 7, 3, 3],
            [1, 7, 7, 3, 1, 1, 7, 3, 3]
        ]
        const dancerIdToRemove = 3;
        const expectedScoreTable = [
            [7],
            [1, 1, 7],
            [1, 7, 7, 1, 1, 7]
        ]

        const outputScoreTable = removeDancerFromTable(dancerIdToRemove, scoreTable);

        expect(outputScoreTable).toStrictEqual(expectedScoreTable);        
    });

    it('removes a dancer by id from the score table - sample II', () => {
        const scoreTable: PositionScoreTable = [
            [1, 3, 7, 7, 7], 
            [3, 4, 5, 2, 6, 7, 7, 7, 3, 1], 
            [1, 2, 1, 7, 5, 3, 4, 5, 2, 6, 7, 7, 7, 3, 1]
        ]
        const dancerIdToRemove = 7;
        const expectedScoreTable = [
            [1, 3], 
            [3, 4, 5, 2, 6, 3, 1], 
            [1, 2, 1, 5, 3, 4, 5, 2, 6, 3, 1]
        ]

        const outputScoreTable = removeDancerFromTable(dancerIdToRemove, scoreTable);

        expect(outputScoreTable).toStrictEqual(expectedScoreTable);        
    })

})