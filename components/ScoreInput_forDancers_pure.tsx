import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dancer } from '@/lib/types';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useState } from 'react';

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

export function ScoreInput({
    judgeId,
    dancers,
    handleSubmit
}: {
    judgeId: string,
    dancers: Record<string, string>[], // Record is so much fancier than what I used before
    handleSubmit: (values: any) => void // can't type values before defining the schema
}) {
    const finalPositions: string[] = [];
    for (let i = 0; i < dancers.length; i++) {
        finalPositions.push(positions[i]);
    };

    // using local state to control which dancers are displayed in select fields
    const noneSelectedPositions: Record<string, string> = {}
    const [selectedPositions, setSelectedPositions] = useState(noneSelectedPositions);
    function onSelectPosition(event: React.ChangeEvent<HTMLSelectElement>) {
        const {name, value} = event.target
        setSelectedPositions({ ...selectedPositions, [name]: value })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
    
        // Convert FormData to an object for easier handling
        const formDataObject: Record<string, string> = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value.toString();
        });
    
        console.log('Form data submitted:', formDataObject);
        // Perform any additional actions, like sending data to the server
        handleSubmit(formDataObject);
        event.currentTarget.reset();
      };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeId} - scores:</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    {dancers.map(dancer => (
                        <div key={dancer.id} className='my-5'>
                            <Label className='py-1.5 pr-2 text-sm font-semibold'>Position for dancer {dancer.id}</Label>
                            <select
                                name={dancer.id}
                                id={dancer.id}
                                onChange={onSelectPosition}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Please select a scoring</option>
                                {finalPositions
                                    .filter(position => (!Object.values(selectedPositions).includes(position)) || selectedPositions[dancer.id] === position)
                                    .map(position => (
                                        <option
                                            key={position}
                                            value={position}
                                        >{position} place</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className='flex justify-between'>
                        <Button type='submit'>Submit</Button>
                        <Button variant='secondary'>Randomize</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}