import React from "react";
import { client } from "@/server/src/index";
import { EmployeesTable } from "../_components/employees-table";
import { Button } from "@repo/ui";
import Link from "next/link";
import { Employees, Departments } from "@repo/db/src/schema/index";

export default async function EmployeesPage() {
  const employeesRes = client.employees.$get(undefined, {
    fetch: () =>
      fetch(client.employees.$url(), {
        method: "GET",
        cache: "no-store",
      }),
  });
  const employees = await (await employeesRes).json();

  const departmentsRes = client.departments.$get(undefined, {
    fetch: () =>
      fetch(client.departments.$url(), {
        method: "GET",
        cache: "no-store",
      }),
  });
  const departments = await (await departmentsRes).json();

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
