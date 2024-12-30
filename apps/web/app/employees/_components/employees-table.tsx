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
import { Employees, Departments } from "@repo/db/src/schema/index";

export const EmployeesTable = ({
  employees,
  departments,
}: {
  employees: { results: Employees[] };
  departments: Departments[];
}) => {
  const getLabelById = (id: number) =>
    departments.find((department) => department.id === id)?.label;

  return (
    <Table>
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
            <TableCell>{getLabelById(employee.department)}</TableCell>
            <TableCell>
              <Link href={`/employees/${employee.id}`}>
                <Button>Detail</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
