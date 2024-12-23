import React from "react";
import {
  Button,
  Table,
  TableBody,
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
      {/* <TableCaption>Employee List</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.results.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>test</TableCell>
            <TableCell>
              <Link href={"/"}>
                <Button>view</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
