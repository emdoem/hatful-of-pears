import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// this needs to be restructured - to populate leaders & followers separately?
export function DancerInput({ coupleNumber, onSubmit }: { [prop: string]: any; }) {
    // need to work out better typing for props
    return (
        <Card>
            <CardHeader>
                <CardTitle>Couple {coupleNumber}</CardTitle>
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
                    <Button onClick={onSubmit}>Add to competition</Button>
                    <Button variant='secondary'>Random</Button>
                </div>
            </CardContent>
        </Card>
    );
}
