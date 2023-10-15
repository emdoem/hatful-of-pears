'use client';
import { Dancer } from '../types';

export const initialState: {
  creatorStep: 'start' | 'dancers' | 'judges' | 'scores';
  competitionSetup: {
    competitionType: null | 'fixedCouples' | 'mixedCouples' | 'solo';
    numberOfJudges: number;
    numberOfDancers: number;
  };
  dancers: Dancer[];
  judges: { [property: string]: string; }[];
} = {
  creatorStep: 'start',
  competitionSetup: {
    competitionType: null,
    numberOfJudges: 0,
    numberOfDancers: 0
  },
  dancers: [],
  judges: []
};

export function competitionCreatorReducer(
  state: typeof initialState,
  action: {
    type: string;
    data: {[property: string]: any} // Partial<typeof initialState>;
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
      return { ...state, competitionSetup: {competitionType, numberOfJudges, numberOfDancers}};
    }
    default:
      return state;
  }
}

export const getCreatorStep = (state: typeof initialState) => state.creatorStep;
export const getCompetitionType = (state: typeof initialState) => state.competitionSetup.competitionType;
export const getCompetitionSetup = (state: typeof initialState) => state.competitionSetup;
