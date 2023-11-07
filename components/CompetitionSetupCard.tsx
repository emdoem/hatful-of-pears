'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { StartCompValues } from '../lib/state_mgmt/actions';

export function CompetitionSetupCard({
  competitionSetup,
  className
}: {
  competitionSetup: StartCompValues,
  className?: string
}) {
  const { competitionType, numberOfJudges, numberOfDancers } = competitionSetup;
  return (
    <Card className={className}>
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
  );
}
