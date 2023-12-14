'use client';
import { finalsResults } from '@/lib/finalsResults';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { FinalsScoreTable, ScoresTable } from '@/lib/types';
import ErrorBoundary from './ErrorBoundary';
import { Button } from './ui/button';

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

export default function ResultsWithBoundary({
  scores,
  dancers,
  className
}: {
  scores: ScoresTable,
  dancers: Record<string, any>[],
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Competition Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorBoundary>
          <ResultsCard scores={scores} dancers={dancers} />
        </ErrorBoundary>
      </CardContent>
      <CardFooter>
        <Button>Print</Button>
      </CardFooter>
    </Card>

  )
}

function ResultsCard({
  scores,
  dancers
}: {
  scores: ScoresTable,
  dancers: Record<string, any>[]
}) {
  const resultsPositions = positions.slice(0, dancers.length);
  const results = finalsResults(scores);

  const displayResults = resultsPositions.map((position: string, index: number) => {
    const dancerData = results[index].map(dancerOnPosition => {
      const dancerObject = dancers.find(dancer => dancer.id === dancerOnPosition);
      if (dancerObject === undefined) return null;
      return Object.values(dancerObject).join(', ');
    })
    return {
      placeNumber: position,
      content: dancerData
    }
  })

  // throw new Error('Whoopsie!');

  return (
    <>
      {displayResults.map((position) => (
        <div key={position.placeNumber} className='my-5'>
          <b>{position.placeNumber}:</b> {position.content.map(dancer => (
            <p>{dancer}</p>
          ))}
        </div>
      ))}
    </>
  );
}
