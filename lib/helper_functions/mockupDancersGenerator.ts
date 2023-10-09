import { Dancer } from '../types';
// import * as getZiUser from 'zi-user';

const getZiUser = require('zi-user');

const getFirstName = () => getZiUser().firstName;
const getLastName = () => getZiUser().lastName;

export function getFollowers(amount: number) {
    let followers: Dancer[] = []
    for (let i = 0; i < amount; i++) {
        followers[i] = {
            id: i,
            firstName: getFirstName(),
            lastName: getLastName(),
            role: 'follower',
            scores: {}
        }
    }
    return followers;
}

export function getLeaders(amount: number) {
    let leaders: Dancer[] = []
    for (let i = 0; i < amount; i++) {
        leaders[i] = {
            id: i + 100,
            firstName: getFirstName(),
            lastName: getLastName(),
            role: 'leader',
            scores: {}
        }
    }
    return leaders;
}

export function getSoloDancers(amount: number) {
    let soloDancers: Dancer[] = []
    for (let i = 0; i < amount; i++) {
        soloDancers[i] = {
            id: i,
            firstName: getFirstName(),
            lastName: getLastName(),
            role: 'solo',
            scores: {}
        }
    }
    return soloDancers;
}