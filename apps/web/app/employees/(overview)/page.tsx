import React from "react";
import { client } from "@/server/src/index";
import { EmployeesTable } from "../_components/employees-table";
import { Button } from "@repo/ui";
import Link from "next/link";
import { Employees } from "@repo/db/src/schema/employees/validation";

export default async function EmployeesPage() {
  const res = client.employees.$get(undefined, {
    fetch: () =>
      fetch(client.employees.$url(), {
        method: "GET",
        cache: "no-store",
      }),
  });
  const employees = await (await res).json();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">Employees List</h1>
        <Link href={"/employees/new"}>
          <Button>New</Button>
        </Link>
      </div>
      {/* FIXME resのcreated_atがstringだが、type EmployeesはDate型 */}
      <EmployeesTable employees={employees as { results: Employees[] }} />
    </div>
  );
}
