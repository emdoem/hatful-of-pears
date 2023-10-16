import { Dancer, MixedCouple } from './types';
import { getLuckyNumber } from './helper_functions/luckyNumber';

const numberOfCouplesInFinals: number = 6;
// number will depend on competition rules - to be implemented later
const luckyNumber: number = getLuckyNumber(numberOfCouplesInFinals);

export default function mixCouples(followers: Dancer[], leaders: Dancer[], luckyNumber: number, leadersRotating: boolean = false): MixedCouple[] {
    let finalsCouples: MixedCouple[] = [];
    const numberOfCouples = leaders.length;
    if (leadersRotating) {
        followers.forEach((dancer: Dancer, index) => {
            let leaderIndex = (index + luckyNumber) % leaders.length;
            if (leaderIndex < 0) {
                leaderIndex += leaders.length; // Ensure it's positive
            }            finalsCouples[index] = {
                id: dancer.id,
                leader: leaders[leaderIndex],
                follower: followers[index]
            }
        })
    }
    if (!leadersRotating) {
        leaders.forEach((dancer: Dancer, index) => {
            let followerIndex = (index + luckyNumber) % followers.length;
            if (followerIndex < 0) {
                followerIndex += followers.length; // Ensure it's positive
            }
            finalsCouples[index] = {
                id: dancer.id,
                leader: leaders[index],
                follower: followers[followerIndex]
            }
        })
    }
    return finalsCouples;
}