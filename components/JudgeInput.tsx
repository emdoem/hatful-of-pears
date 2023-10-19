import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl } from '@/components/ui/form';
import { randomCouple } from '../lib/helper_functions/randomCouple';
import { useEffect } from 'react';

const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
});

export function JudgeInput({
    judgeId: judgeNumber,
    handleSubmit
}: {
    judgeId: string,
    handleSubmit: (values: z.infer<typeof FormSchema>) => void
}) {
    const defaultValues = {
        firstName: 'First name',
        lastName: 'Last name'
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values);
        handleSubmit(values);
    }

    useEffect(() => {
        form.reset(defaultValues)
    }, [form.formState.submitCount])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeNumber}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="my-5">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="my-5">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-between'>
                            <Button type="submit">Add to competition</Button>
                            <Button variant='secondary' disabled>Random</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
