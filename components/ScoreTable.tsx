'use client';
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export function ScoreTable({ data }: { data: {}[]; }) {
  const tableColumns = [...Object.keys(data[0])];
  return (
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
  );
}
