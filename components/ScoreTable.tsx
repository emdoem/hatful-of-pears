'use client';
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ScoreTable({ data }: { data: {}[]; }) {
  const tableColumns = [...Object.keys(data[0])];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="my-3">
          <TableHeader>
            <TableRow>
              {tableColumns.map((property) => (
                <TableCell>{property}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((dancer: any) => (
              <TableRow>
                {tableColumns.map((property) => (
                  <TableHead>{dancer[property]}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

    </Card>
  );
}
