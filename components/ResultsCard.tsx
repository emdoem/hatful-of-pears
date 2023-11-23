'use client';
import { finalsResults } from '@/lib/finalsResults';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FinalsScoreTable, ScoresTable } from '@/lib/types';
import ErrorBoundary from './ErrorBoundary';

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

export function ResultsCard({
  scores,
  dancers
}: {
  scores: ScoresTable,
  dancers: { [property: string]: any }[]
}) {  
  const resultsPositions = positions.slice(0, dancers.length);
  const resultsArray = finalsResults(scores);

  const results = new Set(resultsPositions);
  for (const position in results) {
    results[position] = resultsArray
  }
  
  function getDancerInfoByPosition(position: number) {
    const dancer = dancers.filter(dancer => dancer.id === results[position])[0]; // this returns null (or undefined?)
    return Object.values(dancer).join(', ')
  }

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Competition Results</CardTitle>
        </CardHeader>
        <CardContent>
          {resultsPositions.map((position: string) => (
            <p key={position}>
              {position}: {results[position]}, 
            </p>
          ))}
        </CardContent>
      </Card>
    </ErrorBoundary>

  );
}

// {getDancerInfoByPosition(results[position])} - this throws an error, needs a fix
