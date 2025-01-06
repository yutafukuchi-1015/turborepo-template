import React from "react";
import { EmployeesTable } from "../_components/employees-table";
import { Button } from "@repo/ui";
import Link from "next/link";
import { useEmployees } from "#api/employees/api";
import { useDepartments } from "@/web/api/departments/api";

export default async function EmployeesPage() {
  const employees = await useEmployees();
  const departments = await useDepartments();

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
