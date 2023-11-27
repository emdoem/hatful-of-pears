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
import { Button } from "./ui/button";
import { useState } from "react";

type ScoreTableData = (typeof initialState.dancers) | (typeof initialState.judges);

export function ScoreTable({ 
  data,
  className,
  tableTitle
}: { 
  data: ScoreTableData,
  className?: string,
  tableTitle?: string
}) {
  const tableColumns = [...Object.keys(data[0])];
  const title = () => {
    if (tableTitle) return tableTitle;
    return 'Data Table'
  }

  return (
    <Card className={className}>
      <CardHeader className="flex-row justify-between">
        <CardTitle>{title()}</CardTitle>
        <Button variant='outline'>Edit</Button>
      </CardHeader>
      <CardContent>
        <Table className="my-3">
          <TableHeader>
            <TableRow>
              {tableColumns.map((property) => (
                <TableCell key={property}>{property}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((element: any) => (
              <TableRow key={element.id}>
                {tableColumns.map((property) => (
                  <TableCell key={property}>{element[property]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

    </Card>
  );
}