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
  state = initialState,
  action: {
    type: string;
    data: { [property: string]: any; };
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
    default:
      return state;
  }
}
export const getCreatorStep = (state: typeof initialState) => state.creatorStep;


