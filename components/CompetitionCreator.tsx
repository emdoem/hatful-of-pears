'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { useEffect, useReducer } from 'react';
import { competitionCreatorReducer, getCreatorStep, getCompetitionSetup, getCompetitionType, getDancers, getJudges } from '../lib/state_mgmt/competitionCreatorReducer';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';
import { sampleJudges } from '../lib/helper_functions/sampleDataForCompetitionCreator';
import { DancerValues } from '@/lib/types';
import { CompetitionSetupCard } from './CompetitionSetupCard';
import { getLetterFromNumber } from '../lib/helper_functions/getLetterFromNumber';

export type StartCompValues = typeof initialState.competitionSetup;
// actions?
const goToStart = () => ({ type: "GO_TO_START", data: {} });
const goToDancers = () => ({ type: "GO_TO_DANCERS", data: {} });
const goToJudges = () => ({ type: "GO_TO_JUDGES", data: {} });
const goToScores = () => ({ type: "GO_TO_SCORES", data: {} });
const startCompetition = (values: StartCompValues) => ({ type: "START_COMPETITION", data: { ...values } });
const addDancer = (dancerToAdd: DancerValues) => ({ type: "ADD_DANCER", data: { ...dancerToAdd } });
// judge type to be reworked?
const addJudge = (judgeToAdd: { [property: string]: string }) => ({ type: "ADD_JUDGE", data: { ...judgeToAdd } });

export default function CompetitionCreator() {
  const [creatorState, dispatch] = useReducer(competitionCreatorReducer, initialState);

  const creatorStep = getCreatorStep(creatorState);
  const competitionSetup = getCompetitionSetup(creatorState);
  const competitionType = getCompetitionType(creatorState);
  const numberOfDancers = getCompetitionSetup(creatorState).numberOfDancers;
  const numberOfJudges = getCompetitionSetup(creatorState).numberOfJudges;
  const dancers = getDancers(creatorState);
  const judges = getJudges(creatorState);
  const judgeId = getLetterFromNumber(judges.length);

  // progressing through iterative forms:
  useEffect(() => {
    const updatedDancers = getDancers(creatorState);
    const updatedJudges = getJudges(creatorState);

    if ((updatedDancers.length === numberOfDancers) && (creatorStep === 'dancers')) {
      goToNextStep();
    }
    if ((updatedJudges.length === numberOfJudges) && (creatorStep === 'judges')) {
      goToNextStep();
    }
    // same for updatedScores
  }, [creatorState]);

  // progressing through creator steps:
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

  // handlers for form submissions - these could be complex actions after implementing Redux + Thunk
  const handleStart = (values: any) => {
    dispatch(startCompetition(values));
    goToNextStep();
    // console.log('Initializing the competition:', creatorState.competitionSetup); - this doesn't even display the current state value!
  }

  const handleSubmitDancer = (values: any) => {
    dispatch(addDancer(values));
    console.log('Dispatching addDancer action!');
  }

  const handleSubmitJudge = (values: any) => {
    values.id = judgeId;
    dispatch(addJudge(values));
  }

  return (
    <main className='flex flex-row justify-center p-20'>
      <div className='flex flex-col m-3'>
        {(creatorStep === 'start') ? <InitializeCompetition handleSubmit={handleStart} /> : null}
        {(creatorStep === 'dancers') ? <DancerInput
          competitionType={getCompetitionSetup(creatorState).competitionType}
          handleSubmit={handleSubmitDancer}
          inputNumber={dancers.length + 1}
        /> : null}
        {(creatorStep === 'judges') ? <JudgeInput
          judgeId={judgeId}
          handleSubmit={handleSubmitJudge}
        /> : null}
        {(creatorStep === 'scores') ? <ScoreInput judgeName={'Andreas Olsson'} numberOfPositions={6} handleSubmit={goToNextStep} /> : null}
        {(competitionType != '') ? <CompetitionSetupCard competitionSetup={competitionSetup} /> : null}
      </div>
      <div className='flex flex-col m-3'>

        {(dancers.length > 0) ? <ScoreTable data={dancers} /> : null}
        {(judges.length > 0) ? <ScoreTable data={judges} /> : null}
      </div>

    </main>
  )
}

