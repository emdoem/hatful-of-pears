import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dancer } from '@/lib/types';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Label } from './ui/label';
import { Button } from './ui/button';

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

export function ScoreInput({
    judgeId,
    dancers,
    handleSubmit
}: {
    judgeId: string,
    dancers: { [property: string]: any }[],
    handleSubmit: (values: any) => void // can't type values before defining the schema
}) {
    const finalPositions: string[] = [];
    for (let i = 0; i < dancers.length; i++) {
        finalPositions.push(positions[i]);
    };

    // shape of form data defined dynamically
    const scoreInputShape = dancers.reduce((obj, property) => {
        return {
            ...obj,
            [property.id]: null
        }
    }, {});
    type ScoreInputs = typeof scoreInputShape;

    const form = useForm<ScoreInputs>()
    const onSubmit: SubmitHandler<ScoreInputs> = (data) => {
        console.log(data); // this doesn't log the form input yet...
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeId} - scores:</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {dancers.map(dancer => (
                        <div key={dancer.id} className='my-5'>
                            <Label className='py-1.5 pr-2 text-sm font-semibold'>Position for dancer {dancer.id}</Label>
                            <select
                                name={dancer.id}
                                id={dancer.id}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Please select a scoring</option>
                                {finalPositions.map(position => (
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