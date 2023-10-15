'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { useState } from 'react';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { useReducer } from 'react';
import { competitionCreatorReducer, getCreatorStep, getCompetitionSetup } from '../lib/state_mgmt/competitionCreatorReducer';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';
import { string } from 'zod';
import { sampleDancers, sampleJudges } from '../lib/helper_functions/sampleDataForCompetitionCreator';

type startCompValues = typeof initialState.competitionSetup;

// actions?
const goToStart = () => ({ type: "GO_TO_START", data: {} });
const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {} });
const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {} });
const goToScores = () => ({ type: "GO_TO_SCORES", data: {} });
const startCompetition = (values: startCompValues) => ({type: "START_COMPETITION", data: {...values}})

export default function CompetitionCreator() {
  const [creatorState, dispatch] = useReducer(competitionCreatorReducer, initialState);
  const creatorStep = getCreatorStep(creatorState);

  const goToNextStep = () => {    
    if (creatorStep === 'start') {
      dispatch(goToDancers());
    } else if (creatorStep === 'dancers') {
      dispatch(goToJudges());
    } else if (creatorStep === 'judges') {
      dispatch(goToScores());
    } else if (creatorStep === 'scores') {
      dispatch(goToStart());
    } else {
      return null;
    }
  }

  const handleStart = (values: any) => {
    
    dispatch(startCompetition(values));
    goToNextStep();
    console.log('Initializing the competition:', creatorState.competitionSetup);
  }

  return (
    <main className='flex flex-col justify-center p-20'>
      {(creatorStep === 'start') ? <InitializeCompetition handleSubmit={handleStart} /> : null}
      {(creatorStep === 'dancers') ? <DancerInput coupleNumber={2} handleSubmit={goToNextStep} /> : null}
      {(creatorStep === 'judges') ? <JudgeInput judgeNumber={4} handleSubmit={goToNextStep} /> : null}
      {(creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} handleSubmit={goToNextStep} /> : null}
      <div className='flex flex-col'>
        <ScoreTable data={sampleDancers} />
        <ScoreTable data={sampleJudges} />
      </div>

    </main>
  )
}