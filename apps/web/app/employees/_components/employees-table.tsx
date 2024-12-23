import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import Link from "next/link";

export const EmployeesTable = ({
  employees,
}: {
  employees: { results: { id: number; name: string }[] };
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Detail</TableHead>
          <TableHead>Open Detail in new tab</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.results.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>test</TableCell>
            <TableCell>
              <Link href={`/employees/${employee.id}`}>
                <Button>view</Button>
              </Link>
            </TableCell>
            <TableCell>
              <Link target="_blank" href={`/employees/${employee.id}`}>
                <Button>view</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
