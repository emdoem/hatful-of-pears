'use client'

import { DancerInput } from '@/components/DancerInput';
import { JudgeInput } from '@/components/JudgeInput';
import { ScoreInput } from '@/components/ScoreInput_forDancers_pure';
import { InitializeCompetition } from './InitializeCompetition';
import { ScoreTable } from './ScoreTable';
import { useEffect, useReducer } from 'react';
import { competitionCreatorReducer, getCreatorStep, getCompetitionSetup, getCompetitionType, getDancers, getJudges, getScores, getDancersWithScores } from '../lib/state_mgmt/competitionCreatorReducer';
import { initialState } from '@/lib/state_mgmt/competitionCreatorReducer';
import { CompetitionSetupCard } from './CompetitionSetupCard';
import { getLetterFromNumber } from '../lib/helper_functions/getLetterFromNumber';
import { goToDancers, goToJudges, goToScores, goToStart, goToResults, startCompetition, addDancer, addJudge, addScore } from '../lib/state_mgmt/actions';
import { ResultsCard } from './ResultsCard';
import ErrorBoundary from './ErrorBoundary';
import { JudgeScoreTable } from '../lib/types'

export default function CompetitionCreator() {
  const [creatorState, dispatch] = useReducer(competitionCreatorReducer, initialState);

  // using selectors for further clarity:
  const creatorStep = getCreatorStep(creatorState);
  const competitionSetup = getCompetitionSetup(creatorState);
  const competitionType = getCompetitionType(creatorState);
  const numberOfDancers = getCompetitionSetup(creatorState).numberOfDancers;
  const numberOfJudges = getCompetitionSetup(creatorState).numberOfJudges;
  const dancers = getDancers(creatorState);
  const dancersWithScores = getDancersWithScores(creatorState);
  const judges = getJudges(creatorState);
  const judgeId = getLetterFromNumber(judges.length);
  const scores = getScores(creatorState);
  const scoreId = getLetterFromNumber(scores.length);

  // progressing through iterative forms:
  useEffect(() => {
    const updatedDancers = getDancers(creatorState);
    const updatedJudges = getJudges(creatorState);
    const updatedScores = getScores(creatorState);

    if ((updatedDancers.length === numberOfDancers) && (creatorStep === 'dancers')) {
      goToNextStep();
    }
    if ((updatedJudges.length === numberOfJudges) && (creatorStep === 'judges')) {
      goToNextStep();
    }
    if ((updatedScores.length === numberOfJudges) && (creatorStep === 'scores')) {
      goToNextStep();
    }
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
      dispatch(goToResults());
    } else {
      return null;
    }
  }

  // handlers for form submissions
  const handleStart = (values: any) => {
    dispatch(startCompetition(values));
    goToNextStep();
  }

  // values verified by form and by reducer - no need for typing?
  const handleSubmitDancer = (values: any) => {
    dispatch(addDancer(values));
  }

  // values verified by form and by reducer - no need for typing?
  const handleSubmitJudge = (values: any) => {
    values.id = judgeId;
    dispatch(addJudge(values));
  }

  const handleSubmitScore = (values: { [property: string]: string }) => {
    let newValues: JudgeScoreTable = {
      id: '',
      scores: {}
    };
    // parsing scores from to string to numbers, because select field only accepts strings as values
    for (const property in values) {
      newValues.scores[property] = parseInt(values[property], 10)
    }
    // adding id now (as a string) so it doesn't parse into a number
    newValues.id = scoreId;
    dispatch(addScore(newValues));
  }

  return (
    <div className='flex flex-col lg:flex-row justify-start p-20'>
      <div className='flex flex-row lg:flex-col mx-3'>
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
        {(creatorStep === 'scores') ? <ScoreInput
          judgeId={scoreId}
          dancers={dancers}
          handleSubmit={handleSubmitScore}
        /> : null}
        {(creatorStep === 'results')
          ? <ErrorBoundary>
            <ResultsCard
              scores={scores}
              dancers={dancers}
            />
          </ErrorBoundary>
          : null}
        {(competitionType != '') 
          ? <CompetitionSetupCard competitionSetup={competitionSetup} className='ml-6 lg:ml-0' /> 
          : null
        }
      </div>
      <div className='flex flex-col mx-3'>

        {(dancers.length > 0) ? <ScoreTable data={dancersWithScores} className="max-w-2xl" /> : null}
        {(judges.length > 0) ? <ScoreTable data={judges} className="max-w-md" /> : null}
      </div>

    </div>
  )
}
