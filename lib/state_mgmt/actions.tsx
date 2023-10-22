'use client';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';
import { DancerValues } from '@/lib/types';


export type StartCompValues = typeof initialState.competitionSetup;
// actions?
export const goToStart = () => ({ type: "GO_TO_START", data: {} });
export const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {} });
export const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {} });
export const goToScores = () => ({ type: "GO_TO_SCORES", data: {} });
export const startCompetition = (values: StartCompValues) => ({ type: "START_COMPETITION", data: { ...values } });
export const addDancer = (dancerToAdd: DancerValues) => ({ type: "ADD_DANCER", data: { ...dancerToAdd } });
// judge type to be reworked?
export const addJudge = (judgeToAdd: { [property: string]: string; }) => ({ type: "ADD_JUDGE", data: { ...judgeToAdd } });
export const addScore = (scoreToAdd:{ [property: string]: any; }) => ({ type: "ADD_SCORE", data: { ...scoreToAdd } })