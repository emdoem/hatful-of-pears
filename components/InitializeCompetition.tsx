'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form'

const FormSchema = z.object({
  competitionType: z.enum(["fixed couples", "mixed couples", "solo"], {
    required_error: "Please select competition type."
  }),
  numberOfJudges: z.number().min(3, { message: "Competition needs at least 3 judges!" }),
  numberOfDancers: z.number().min(2, { message: "Competition needs at least 2 dancers / couples!" })
})

export function InitializeCompetition({ handleSubmit }: { [prop: string]: any; }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numberOfJudges: 5,
      numberOfDancers: 6
    }
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    handleSubmit(values);
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Competition</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="competitionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select a competition type" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fixed couples">Fixed couples</SelectItem>
                      <SelectItem value="mixed couples">Mixed couples</SelectItem>
                      <SelectItem value="solo">Solo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>For competitions with separate judging for leaders and followers please create separate solo competitions.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfJudges"
              render={({ field }) => (
                <FormItem className="my-5">
                  <FormLabel>Number of judges</FormLabel>
                  <FormControl>
                    <Input type='number' min="3" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfDancers"
              render={({ field }) => (
                <FormItem className="my-5">
                  <FormLabel>Number of couples / solo dancers</FormLabel>
                  <FormControl>
                    <Input type='number' min="2" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
