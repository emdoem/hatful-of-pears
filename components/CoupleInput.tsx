import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl } from '@/components/ui/form';

const FormSchema = z.object({
    id: z.number().min(0, 'Id must be a positive number.'),
    followerName: z.string(),
    leaderName: z.string()
});
// props typing needs to be fixed - do I have to import handler type from CompetitionCreator?
export function CoupleInput({
    handleSubmit, coupleNumber
}: {
    handleSubmit: (values: any) => void;
    coupleNumber: number;
}) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            // id: 7
            followerName: `Follower's name`,
            leaderName: `Leader's name`
        }
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values);
        handleSubmit(values);

    }

    function randomCouple(e: any) {
        console.log('Inserting random couple!');
        e.preventDefault; // this doesn't work yet
    }

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
                                    <FormLabel>Follower's name</FormLabel>
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
                                    <FormLabel>Leader's name</FormLabel>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <div className='flex justify-between'>
                            <Button type='submit'>Add to competition</Button>
                            <Button variant='secondary' onClick={randomCouple}>Random</Button>
                        </div>
                    </form>
                </Form>


            </CardContent>
        </Card>
    );
}
