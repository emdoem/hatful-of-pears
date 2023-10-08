import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import mixCouples from '../../lib/mixCouples';
import { followers, leaders } from '../../lib/helper_functions/mockupDancers';
import { Couple } from '@/lib/types';
import { getLuckyNumber } from '../../lib/helper_functions/luckyNumber';

describe('mockupDancers - leaders array', () => {
    it('contains 6 objects', () => {
        expect(leaders.length).toEqual(6)
    });
    it('contains objects with role = leader', () => {
        leaders.forEach(dancer => {
            expect(dancer.role).toBe('leader')
        })
    });
})

describe('mockupDancers - followers array', () => {
    it('contains 6 objects', () => {
        expect(followers.length).toEqual(6)
    });
    it('contains objects with role = leader', () => {
        followers.forEach(dancer => {
            expect(dancer.role).toBe('follower')
        })
    });
})

describe('mixCouples', () => {
    let luckyNumber: number;
    beforeEach(() => {
        luckyNumber = getLuckyNumber(leaders.length)
    });
    it('returns an amount of couples equal to the number of leaders', () => {
        const finalCouples = mixCouples(followers, leaders, luckyNumber);
        expect(finalCouples.length).toEqual(leaders.length)
    });
    it('returns first couple with a leader and a follower', () => {
        const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber);
        const firstCouple = finalCouples[0]
        expect(firstCouple.leader.role).toBe('leader');
        expect(firstCouple.follower.role).toBe('follower');
    });
    it('returns each couple with a leader and a follower', () => {
        const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber);
        finalCouples.forEach((couple: Couple) => {
            expect(couple.leader.role).toBe('leader');
            expect(couple.follower.role).toBe('follower');
        })

    });
    it('returns first leader in the first couple if the followers are rotating', () => {
        const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber);
        expect(finalCouples[0].leader).toBe(leaders[0]);
    });
    it('returns first follower in the first couple if the leaders are rotating', () => {
        const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber, true);
        expect(finalCouples[0].follower).toBe(followers[0]);
    });
    // the loop wraps around these 2 tests so that each iteration gets a new luckyNumber
    for (let i = 0; i < 10; i++) {
        it('rotates leaders when leaders should be rotating', () => {
            const leadersRotating = true;
            const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber, leadersRotating);
            const leaderInitialPosition = leaders[0].id;
            const leaderEndPosition = finalCouples[0].leader.id;
            if (luckyNumber != leaders.length) { 
                expect(leaderInitialPosition).not.toEqual(leaderEndPosition) 
            } else {
                expect(leaderInitialPosition).toEqual(leaderEndPosition)
            };
        });
        it('rotates followers when followers should be rotating', () => {
            const leadersRotating = false;
            const finalCouples: Couple[] = mixCouples(followers, leaders, luckyNumber, leadersRotating);
            const followerInitialPosition = followers[0].id;
            const followerEndPosition = finalCouples[0].follower.id;
            if (luckyNumber != leaders.length){
                expect(followerInitialPosition).not.toEqual(followerEndPosition)
            } else {
                expect(followerInitialPosition).toEqual(followerEndPosition)
            };
        });
    }
})
