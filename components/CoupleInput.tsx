import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useEffect } from 'react';


const FormSchema = z.object({
    id: z.number().min(0, 'Id must be a positive number.'),
    followerName: z.string(),
    leaderName: z.string()
});

export function CoupleInput({
    handleSubmit, 
    coupleNumber
}: {
    handleSubmit: (values: z.infer<typeof FormSchema>) => void;
    coupleNumber: number;
}) {
    const defaultValues = {
        id: coupleNumber + 100, 
        followerName: `Follower's name`,
        leaderName: `Leader's name`
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
                <CardTitle>Couple {coupleNumber}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem className="my-5">
                                    <FormLabel>Couple Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            min="0"
                                            {...field}
                                            onChange={(e) => form.setValue('id', parseInt(e.target.value, 10))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="followerName"
                            render={({ field }) => (
                                <FormItem className="my-5">
                                    <FormLabel>Follower&apos;s name</FormLabel>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="leaderName"
                            render={({ field }) => (
                                <FormItem className="my-5">
                                    <FormLabel>Leader&apos;s name</FormLabel>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <div className='flex justify-between'>
                            <Button type='submit' className='mr-5'>Add</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}


