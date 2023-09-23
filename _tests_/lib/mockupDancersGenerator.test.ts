import { describe, expect, it, xdescribe } from '@jest/globals';
import { getFollowers, getLeaders, getSoloDancers } from "../../lib/mockupDancersGenerator";

describe('getFollowers', () => {
    it('returns an array of 8 objects given argument = 8', () => {
        const argument = 8;
        for (let i = 0; i < 100; i++) {
            const output = getFollowers(argument);
            expect(output.length).toEqual(8);
        }
    });
    it('returns objects with different ids', () => {
        const amount = 6;
        for (let i = 0; i < 100; i++) {
            const followers = getFollowers(amount);
            let followerIds: number[] = [];
            followers.forEach(dancer => {
                followerIds.push(dancer.id)
            });
            // const followerUniqueIds: string[] = Object.keys(new Set(followerIds))  
            const followerUniqueIds: number[] = Array.from(new Set(followerIds));         
            expect(followers.length).toEqual(followerUniqueIds.length);
        }
    });
    it('returns objects with role: follower', () => {
        const amount = 10;
        for (let i = 0; i < 10; i++) {
            const followers = getFollowers(amount);
            followers.forEach((dancer) => {
                expect(dancer.role).toEqual('follower')
            })
        }
    });
})