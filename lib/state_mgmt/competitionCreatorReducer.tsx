'use client';
import { Dancer, FixedCouple, MixedCouple, DancerValues, FinalsScoreTable } from '../types';

export const initialState: {
  creatorStep: 'start' | 'dancers' | 'judges' | 'scores';
  competitionSetup: {
    competitionType: '' | 'fixedCouples' | 'mixedCouples' | 'solo';
    numberOfJudges: number;
    numberOfDancers: number;
  };
  dancers: { [property: string]: string; }[]; // wait, why doesn't this throw an error on submission?!
  // this should've been DancerValues[], but the shape is to complicated to narrow type in actions
  judges: { [property: string]: string; }[],
  scores: FinalsScoreTable
} = {
  creatorStep: 'start',
  competitionSetup: {
    competitionType: '',
    numberOfJudges: 0,
    numberOfDancers: 0
  },
  dancers: [],
  judges: [],
  scores: []
};

export function competitionCreatorReducer(
  state: typeof initialState,
  action: {
    type: string;
    data: { [property: string]: any } // Partial<typeof initialState>; - still have to do type narrowing for actions
  }
): typeof initialState {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "GO_TO_START": {
      return { ...state, creatorStep: 'start' };
    }
    case "GO_TO_DANCERS": {
      return { ...state, creatorStep: 'dancers' };
    }
    case "GO_TO_JUDGES": {
      return { ...state, creatorStep: 'judges' };
    }
    case "GO_TO_SCORES": {
      return { ...state, creatorStep: 'scores' };
    }
    case "START_COMPETITION": {
      if (!action.data.competitionType && !action.data.numberOfJudges && !action.data.numberOfDancers) return state;
      const { competitionType, numberOfJudges, numberOfDancers } = action.data;
      // console.log('Updating competition setup with: ', competitionType, numberOfJudges, numberOfDancers);
      return { ...state, competitionSetup: { competitionType, numberOfJudges, numberOfDancers } };
    }
    case "ADD_DANCER": {
      const dancerToAdd = action.data;
      const dancers = [...state.dancers];
      if (!dancerToAdd.id) return state;
      let areIdsUnique = true;
      dancers.forEach(dancer => (dancer.id === dancerToAdd.id) ? areIdsUnique = false : null);
      if (!areIdsUnique) {
        console.log('Ids must be unique!');
        return state;
      }
      if (dancers.length < state.competitionSetup.numberOfDancers) dancers.push(dancerToAdd);
      return { ...state, dancers };
    }
    case "ADD_JUDGE": {
      const judgeToAdd = action.data;
      const judges = [...state.judges];
      if (!judgeToAdd.id) return state;
      if (judges.length < state.competitionSetup.numberOfJudges) judges.push(judgeToAdd);
      return { ...state, judges }
    }
    default:
      return state;
  }
}

export const getCreatorStep = (state: typeof initialState) => state.creatorStep;
export const getCompetitionType = (state: typeof initialState) => state.competitionSetup.competitionType;
export const getCompetitionSetup = (state: typeof initialState) => state.competitionSetup;
export const getDancers = (state: typeof initialState) => state.dancers;
export const getJudges = (state: typeof initialState) => state.judges;
export const getScores = (state: typeof initialState) => state.scores;