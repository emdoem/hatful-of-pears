import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormLabel, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form'

export function DancerInput({ 
    competitionType, 
    numberOfDancers, 
    handleSubmit 
}: { 
    competitionType: string, 
    numberOfDancers: number, 
    handleSubmit: () => void 
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Competition type: {competitionType} <br />
                    Number of dancers: {numberOfDancers}</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSubmit}>Add to competition</Button>
            </CardContent>
        </Card>
    );
}

function CoupleInput() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Couple X</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="my-5">
                    <Label>Couple Id</Label>
                    <Input type='number' />
                </div>
                <div className="my-5">
                    <Label>Leader</Label>
                    <Input type='text' />
                </div>
                <div className="my-5">
                    <Label>Follower</Label>
                    <Input type='text' />
                </div>
                <div className='flex justify-between'>
                    <Button>Add to competition</Button>
                    <Button variant='secondary'>Random</Button>
                </div>
            </CardContent>
        </Card>
    );
}
