import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function JudgeInput({ judgeNumber, handleSubmit }: { [prop: string]: any; }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Judge {judgeNumber}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="my-5">
                    <Label>First Name</Label>
                    <Input type='text' />
                </div>
                <div className="my-5">
                    <Label>Last Name</Label>
                    <Input type='text' />
                </div>
                <div className='flex justify-between'>
                    <Button onClick={handleSubmit}>Add to competition</Button>
                    <Button variant='secondary'>Random</Button>
                </div>
            </CardContent>
        </Card>
    );
}
