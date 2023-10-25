'use client';
import { finalsResults } from '@/lib/finalsResults';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FinalsScoreTable } from '@/lib/types';
import ErrorBoundary from './ErrorBoundary';

export function ResultsCard({
  scores,
  dancers
}: {
  scores: { [property: string]: any }[],
  dancers: { [property: string]: any }[]
}) {  
  const positions = [...Object.keys(scores[0])];
  const resultsArray = finalsResults(scores as FinalsScoreTable);
  const results: { [property: string]: any } = {};
  positions.forEach((position: string, index: number) => {
    results[position] = resultsArray[index];
  })

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Competition Results</CardTitle>
        </CardHeader>
        <CardContent>
          {positions.map((position: string) => (
            <p key={position}>
              {position}: {results[position]}, {dancers.filter(dancer => dancer.id === results[position])}
            </p>
          ))}
        </CardContent>
      </Card>
    </ErrorBoundary>

  );
}
