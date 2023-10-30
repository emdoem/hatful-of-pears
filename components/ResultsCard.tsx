'use client';
import { finalsResults } from '@/lib/finalsResults';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FinalsScoreTable } from '@/lib/types';
import ErrorBoundary from './ErrorBoundary';

export function ResultsCard({
  scores,
  dancers
}: {
  scores: FinalsScoreTable,
  dancers: { [property: string]: any }[]
}) {  
  const positions = [...Object.keys(scores[0].scores)];
  const resultsArray = finalsResults(scores);
  const results: { [property: string]: any } = {};
  positions.forEach((position: string, index: number) => {
    results[position] = resultsArray[index];
  })

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
          {positions.map((position: string) => (
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
