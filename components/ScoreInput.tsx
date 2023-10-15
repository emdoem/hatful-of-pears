import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
export function ScoreInput({ judgeName, numberOfPositions, handleSubmit }: { [prop: string]: any; }) {
    let finalPositions: string[] = [];
    for (let i = 0; i < numberOfPositions; i++) {
        finalPositions.push(positions[i]);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeName}</CardTitle>
            </CardHeader>
            <CardContent>
                {finalPositions.map((position) => (
                    <div className="flex my-5">
                        <Label>{position} Place</Label>
                        <Input type='number' />
                    </div>
                ))}
                <div className='flex justify-between'>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button variant='secondary'>Random</Button>
                </div>
            </CardContent>
        </Card>
    );
}
