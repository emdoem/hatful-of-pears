'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';

export function InitializeCompetition({ onSubmit }: { [prop: string]: any; }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Competition</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Competition type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Please select a competition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed couples">Fixed couples</SelectItem>
            <SelectItem value="mixed couples">Mixed couples</SelectItem>
            <SelectItem value="solo">Solo</SelectItem>
          </SelectContent>
        </Select>
        <div className="my-5">
          <Label>Number of judges</Label>
          <Input type='number' />
        </div>
        <div className="my-5">
          <Label>Number of couples / solo dancers</Label>
          <Input type='number' />
        </div>

        <Button onClick={onSubmit}>Create</Button>
      </CardContent>
    </Card>
  );
}
