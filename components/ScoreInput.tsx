import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form'

const positions: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];



export function ScoreInput({
    judgeId,
    numberOfPositions,
    dancers,
    handleSubmit
}: {
    judgeId: string,
    numberOfPositions: number,
    dancers: { [property: string]: any; }[], // typing for dancers needs to be cleaned up
    handleSubmit: (values: any) => void // can't type values before defining the schema
}) {
    let finalPositions: string[] = [];
    for (let i = 0; i < numberOfPositions; i++) {
        finalPositions.push(positions[i]);
    };

    // using local state to control which dancers are displayed in select fields
    const noneSelectedDancers: { [property: string]: any } = {}
    const [selectedDancers, setSelectedDancers] = useState(noneSelectedDancers);
    function onSelectDancer(field: any, dancerId: string) {
        field.onChange(dancerId);
        setSelectedDancers({...selectedDancers, [field.name]: dancerId})
    }

    // schema needs to be defined after specifying number of scored positions
    const schemaObject = () => {
        let object: { [property: string]: any } = {}
        finalPositions.forEach(position => {
            object[position] = z.string() // let's keep this simple and generate valid select options
        })
        return object;
    }
    const FormSchema = z.object(schemaObject());

    // this is for testing purposes only
    let defaultValues: { [property: string]: any } = {};
    finalPositions.forEach((position) => {
        defaultValues[position] = ''
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        // console.log(values);
        handleSubmit(values);
        // form.reset(defaultValues);
    }

    // dependencies will probably have to be more specific
    useEffect(() => {
        form.reset(defaultValues);
        setSelectedDancers([]);
    }, [form.formState.submitCount])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeId} - scores:</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {finalPositions.map((position) => (
                            <FormField
                                control={form.control}
                                key={position}
                                name={position}
                                render={({ field }) => (
                                    <FormItem className="my-5">
                                        <FormLabel>{position} place</FormLabel>
                                        <Select onValueChange={(value) => onSelectDancer(field, value)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder="Please select a dancer / couple"
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dancers
                                                    .filter(dancer => (!Object.values(selectedDancers).includes(dancer.id.toString()) || selectedDancers[position] === dancer.id.toString()))
                                                    .map(dancer => (
                                                        <SelectItem
                                                            key={dancer.id.toString()}
                                                            value={dancer.id.toString()}
                                                        >{Object.values(dancer).join(', ')}</SelectItem>
                                                    ))}
                                                <SelectItem key='blank' value='none'>None</SelectItem>
                                            </SelectContent>

                                        </Select>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <div className='flex justify-between'>
                            <Button type='submit'>Submit</Button>
                            <Button variant='secondary' onClick={form.reset}>Randomize</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
