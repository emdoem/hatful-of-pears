'use client';
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// need to check the type for data used
export function ScoreTable({ data }: { [prop: string]: any; }) {
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
