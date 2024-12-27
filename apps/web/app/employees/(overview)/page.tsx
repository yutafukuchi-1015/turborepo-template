import React from "react";
import { client } from "@/server/src/index";
import { EmployeesTable } from "../_components/employees-table";
import { Button } from "@repo/ui";
import Link from "next/link";

export default async function EmployeesPage() {
  const res = client.employees.$get();
  const employees = await (await res).json();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">Employees List</h1>
        <Link href={"/employees/new"}>
          <Button>New</Button>
        </Link>
      </div>
      <EmployeesTable employees={employees} />
    </div>
  );
}
