import {describe, expect, it} from '@jest/globals';
import {getLuckyNumber} from '../../lib/helper_functions/luckyNumber';

describe('getLuckyNumber', ()=> {
    it('returns a number larger than 0 each time', () => {
        const range = 1;
        // function contains Math.random(), so test needs to be repeated many times over
        for (let i=0; i < 100; i++) {
            const output = getLuckyNumber(range);
            expect(output).toBeGreaterThan(0);
        }
    })

    it('returns a number smaller or equal to 8 for range = 8', ()=> {
        const range = 8;
        // function contains Math.random(), so test needs to be repeated many times over
        for (let i=0; i < 100; i++) {
            const output = getLuckyNumber(range);
            expect(output).toBeGreaterThan(0);
            expect(output).toBeLessThanOrEqual(8);
        }
    })

    it('sometimes returns 8 for range = 8', () => {
        const range = 8;
        const outputArray: number[] = [];
        for (let i=0; i < 100; i++) {
            const output: number = getLuckyNumber(range);
            outputArray.push(output);
        }
        expect(outputArray).toContain(8);
    })
})