'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { useState } from 'react';
import { InitializeCompetition } from './InitializeCompetition';
import {
  TableCaption,
} from "@/components/ui/table"
import { ScoreTable } from './ScoreTable';

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
  },{
    id: 'C',
    firstName: 'Mickey',
    lastName: 'Fortanasce'
  }
]

export default function CompetitionCreator() {
  const initialState: {
    creatorStep: 'start' | 'dancers' | 'judges' | 'scores'
  } = {
    creatorStep: 'start'
  }
  // a proper state reducer to be implemented
  const [state, setState] = useState(initialState);
  const goToNextStep = () => {
    if (state.creatorStep === 'start') {
      setState({ creatorStep: 'dancers' });
    } else if (state.creatorStep === 'dancers') {
      setState({ creatorStep: 'judges' });
    } else if (state.creatorStep === 'judges') {
      setState({ creatorStep: 'scores' });
    } else if (state.creatorStep === 'scores') {
      setState({ creatorStep: 'start' });
    } else {
      return null;
    }
  }
  return (
    <main className='flex flex-col justify-center p-20'>
      {(state.creatorStep === 'start') ? <InitializeCompetition onSubmit={goToNextStep} /> : null}
      {(state.creatorStep === 'dancers') ? <DancerInput coupleNumber={2} onSubmit={goToNextStep} /> : null}
      {(state.creatorStep === 'judges') ? <JudgeInput judgeNumber={4} onSubmit={goToNextStep} /> : null}
      {(state.creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} onSubmit={goToNextStep} /> : null}
      <ScoreTable data={sampleDancers} />
      <ScoreTable data={sampleJudges} />
    </main>
  )
}