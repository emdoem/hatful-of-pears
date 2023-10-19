'use client';
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { initialState } from "@/lib/state_mgmt/competitionCreatorReducer";

type ScoreTableData = (typeof initialState.dancers) | (typeof initialState.judges);

export function ScoreTable({ data }: { data: ScoreTableData; }) {
  const tableColumns = [...Object.keys(data[0])];
  const tableTitle = () => {
    if (typeof data[0].id === 'number') return 'Dancers';
    if (typeof data[0].id === 'string') return 'Judges';
    return 'Data Table'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tableTitle()}</CardTitle>
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
