import React from "react";
import { EmployeesTable } from "../_components/employees-table";
import { Button } from "@repo/ui";
import Link from "next/link";
import { getEmployees } from "#api/employees/api";
import { getDepartments } from "#api/departments/api";

export default async function EmployeesPage() {
  const employees = await getEmployees();
  const departments = await getDepartments();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">Employees List</h1>
        <Link href={"/employees/new"}>
          <Button>New</Button>
        </Link>
      </div>
      <EmployeesTable employees={employees} departments={departments} />
    </div>
  );
}
