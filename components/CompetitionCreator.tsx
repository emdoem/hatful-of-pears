'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { useState } from 'react';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { useReducer } from 'react';
import { competitionCreatorReducer, getCreatorStep } from '../lib/state_mgmt/competitionCreatorReducer';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';

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
const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {} });
const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {} });
const goToScores = () => ({ type: "GO_TO_SCORES", data: {} });

export default function CompetitionCreator() {
  const [creatorState, creatorDispatch] = useReducer(competitionCreatorReducer, initialState)
const creatorStep = getCreatorStep(creatorState)
  const goToNextStep = () => {
    
    if (creatorStep === 'start') {
      creatorDispatch(goToDancers());
    } else if (creatorStep === 'dancers') {
      creatorDispatch(goToJudges());
    } else if (creatorStep === 'judges') {
      creatorDispatch(goToScores());
    } else if (creatorStep === 'scores') {
      creatorDispatch(goToStart());
    } else {
      return null;
    }
  }
  return (
    <main className='flex flex-col justify-center p-20'>
      {(creatorStep === 'start') ? <InitializeCompetition onSubmit={goToNextStep} /> : null}
      {(creatorStep === 'dancers') ? <DancerInput coupleNumber={2} onSubmit={goToNextStep} /> : null}
      {(creatorStep === 'judges') ? <JudgeInput judgeNumber={4} onSubmit={goToNextStep} /> : null}
      {(creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} onSubmit={goToNextStep} /> : null}
      <div className='flex flex-col'>
        <ScoreTable data={sampleDancers} />
        <ScoreTable data={sampleJudges} />
      </div>

    </main>
  )
}