'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { useState } from 'react';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { useReducer } from 'react';
import { competitionCreatorReducer, getCreatorStep, getCompetitionSetup, getCompetitionType, getDancers } from '../lib/state_mgmt/competitionCreatorReducer';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';
import { string } from 'zod';
import { sampleDancers, sampleJudges } from '../lib/helper_functions/sampleDataForCompetitionCreator';
import { DancerValues } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type StartCompValues = typeof initialState.competitionSetup;
// actions?
const goToStart = () => ({ type: "GO_TO_START", data: {} });
const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {} });
const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {} });
const goToScores = () => ({ type: "GO_TO_SCORES", data: {} });
const startCompetition = (values: StartCompValues) => ({ type: "START_COMPETITION", data: { ...values } });
const addDancer = (dancerToAdd: DancerValues) => ({ type: "ADD_DANCER", data: { ...dancerToAdd } });

export default function CompetitionCreator() {
  const [creatorState, dispatch] = useReducer(competitionCreatorReducer, initialState);
  const creatorStep = getCreatorStep(creatorState);

  const competitionSetup = getCompetitionSetup(creatorState);
  const competitionType = getCompetitionType(creatorState);
  const numberOfDancers = getCompetitionSetup(creatorState).numberOfDancers;
  const numberOfJudges = getCompetitionSetup(creatorState).numberOfJudges;
  const dancers = getDancers(creatorState);

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

  const handleSubmitDancer = (values: any) => {
    dispatch(addDancer(values));
    console.log('Dispatching addDancer action!');
    if (dancers.length === numberOfDancers) {
      goToNextStep();
    }
  }

  return (
    <main className='flex flex-col justify-center p-20'>
      {(creatorStep === 'start') ? <InitializeCompetition handleSubmit={handleStart} /> : null}
      {(creatorStep === 'dancers') ? <DancerInput
        competitionType={getCompetitionSetup(creatorState).competitionType}
        handleSubmit={handleSubmitDancer}
        inputNumber={dancers.length + 1}
      /> : null}
      {(creatorStep === 'judges') ? <JudgeInput judgeNumber={4} handleSubmit={goToNextStep} /> : null}
      {(creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} handleSubmit={goToNextStep} /> : null}
      {(competitionType != '') ? <CompetitionSetupCard competitionSetup={competitionSetup} /> : null}
      <div className='flex flex-col'>

        {(dancers.length > 0) ? <ScoreTable data={dancers} /> : null}
        <ScoreTable data={sampleJudges} />
      </div>

    </main>
  )
}

function CompetitionSetupCard({
  competitionSetup
}: {
  competitionSetup: StartCompValues
}) {
  const { competitionType, numberOfJudges, numberOfDancers } = competitionSetup
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competition Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Competition type: {competitionType}<br />
          number of judges: {numberOfJudges}<br />
          number of couples / solo dancers: {numberOfDancers}
        </p>
      </CardContent>
    </Card>
  )
}