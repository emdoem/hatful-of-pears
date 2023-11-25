'use client';
import { Dancer, FixedCouple, MixedCouple, DancerValues, FinalsScoreTable, JudgeScoreTable, ScoresTable, DancerScores } from '../types';
import { getLetterFromNumber } from '../helper_functions/getLetterFromNumber';

export const initialState: {
  creatorStep: 'start' | 'dancers' | 'judges' | 'scores' | 'results',
  competitionSetup: {
    competitionType: '' | 'fixedCouples' | 'mixedCouples' | 'solo',
    numberOfJudges: number,
    numberOfDancers: number,
  },
  dancers: Record<string, any>[],
  // this should've been DancerValues[], but the shape is to complicated to narrow type in actions
  judges: Record<string, string>[],
  scores: Record<string, any>[]
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
    type: string,
    data: Record<string, any> // Partial<typeof initialState>; - still have to do type narrowing for actions
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
    case "GO_TO_RESULTS": {
      return { ...state, creatorStep: 'results' };
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
      dancerToAdd.id = dancerToAdd.id.toString();
      let areIdsUnique = true;
      dancers.forEach(dancer => (dancer.id === dancerToAdd.id) ? areIdsUnique = false : null);
      if (!areIdsUnique) {
        console.log('Ids must be unique!'); // this should be a pop up message?
        return state;
      }
      if (dancers.length < state.competitionSetup.numberOfDancers) dancers.push(dancerToAdd);
      return { ...state, dancers };
    }
    case "ADD_JUDGE": {
      const judgeToAdd = action.data;
      const judges = [...state.judges];
      judgeToAdd.id = getLetterFromNumber(judges.length);
      if (judges.length < state.competitionSetup.numberOfJudges) judges.push(judgeToAdd);
      return { ...state, judges }
    }
    case "ADD_SCORE": {
      const scoreToAdd: Record<string, any> = {
        id: null,
        scores: action.data
      };
      const scores = [...state.scores];
      scoreToAdd.id = getLetterFromNumber(scores.length)
      if (scores.length < state.competitionSetup.numberOfJudges) scores.push(scoreToAdd);
      return { ...state, scores }
    }
    default:
      return state;
  }
}

export const getCreatorStep = (state: typeof initialState) => state.creatorStep;
export const getCompetitionType = (state: typeof initialState) => state.competitionSetup.competitionType;
export const getCompetitionSetup = (state: typeof initialState) => state.competitionSetup;
export const getDancers = (state: typeof initialState) => state.dancers;
export const getDancersWithScores = (state: typeof initialState) => {
  // create a copy of 'dancers':
  const dancers = state.dancers.map((dancer) => ({ ...dancer }));
  // getting scores corresponding to each dancer / couple:
  const scores = getScores(state);
  scores.forEach(judge => {
    dancers.forEach(dancer => dancer[judge.id] = judge.scores[dancer.id]);
  })
  return dancers;
}
export const getScoresForResults = (state: typeof initialState) => {
  const scoresTable: ScoresTable = state.dancers.map(dancer => {
    const scoresForDancer = state.scores.map(judgeScore => judgeScore.scores[dancer.id])
    const dancerScores: DancerScores =  {
      id: dancer.id,
      scores: scoresForDancer
    }
    return dancerScores;
  });
  return scoresTable;
}
export const getJudges = (state: typeof initialState) => state.judges;
export const getScores = (state: typeof initialState) => state.scores;