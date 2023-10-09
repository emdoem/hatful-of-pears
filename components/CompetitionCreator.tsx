'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { useState } from 'react';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { Dancer } from '@/lib/types';
import { useReducer } from 'react';
import { competitionCreatorReducer } from '../lib/competitionCreatorReducer';

const sampleDancers = [
  {
    id: 7,
    dancers: 'Betty Takier, Hal Takier',
    judge_A: 3,
    judge_B: 1,
    judge_C: 1
  },
  {
    id: 13,
    dancers: 'Natalia Esparza, Maxi Dorf',
    judge_A: 1,
    judge_B: 2,
    judge_C: 3
  },
  {
    id: 32,
    dancers: 'Laila & Willie Desatoff',
    judge_A: 2,
    judge_B: 3,
    judge_C: 2
  }
]

const sampleJudges = [
  {
    id: 'A',
    firstName: 'Andreas',
    lastName: 'Olsson'
  },
  {
    id: 'B',
    firstName: 'Jeremy',
    lastName: 'Otth'
  }, {
    id: 'C',
    firstName: 'Mickey',
    lastName: 'Fortanasce'
  }
]

const goToStart = () => ({ type: "GO_TO_START", data: {} });
const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {}  });
const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {}  });
const goToScores = () => ({ type: "GO_TO_SCORES", data: {}  });

export const initialState: {
  creatorStep: 'start' | 'dancers' | 'judges' | 'scores',
  competitionSetup: {
    competitionType: null | 'fixedCouples' | 'mixedCouples' | 'solo',
    numberOfJudges: number,
    numberOfDancers: number
  },
  dancers: Dancer[],
  judges: { [property: string]: string }[]
} = {
  creatorStep: 'start',
  competitionSetup: {
    competitionType: null,
    numberOfJudges: 0,
    numberOfDancers: 0
  },
  dancers: [],
  judges: []
}

export default function CompetitionCreator() {
  const [creatorState, creatorDispatch] = useReducer(competitionCreatorReducer, initialState)

  const goToNextStep = () => {
    if (creatorState.creatorStep === 'start') {
      creatorDispatch(goToDancers());
    } else if (creatorState.creatorStep === 'dancers') {
      creatorDispatch(goToJudges());
    } else if (creatorState.creatorStep === 'judges') {
      creatorDispatch(goToScores());
    } else if (creatorState.creatorStep === 'scores') {
      creatorDispatch(goToStart());
    } else {
      return null;
    }
  }
  return (
    <main className='flex flex-col justify-center p-20'>
      {(creatorState.creatorStep === 'start') ? <InitializeCompetition onSubmit={goToNextStep} /> : null}
      {(creatorState.creatorStep === 'dancers') ? <DancerInput coupleNumber={2} onSubmit={goToNextStep} /> : null}
      {(creatorState.creatorStep === 'judges') ? <JudgeInput judgeNumber={4} onSubmit={goToNextStep} /> : null}
      {(creatorState.creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} onSubmit={goToNextStep} /> : null}
      <ScoreTable data={sampleDancers} />
      <ScoreTable data={sampleJudges} />
    </main>
  )
}