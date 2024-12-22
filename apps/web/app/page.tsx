import React from "react";
import { client } from "@/server/src/index";
import { Button, Menubar } from "@repo/ui";
import { EmployeesTable } from "./_components/employees-table";

export default async function Home() {
  const res = client.employees.$get();
  const employees = await (await res).json();
  return (
    <div>
      <h1 className="text-3xl font-bold ">employees list</h1>
      <EmployeesTable employees={employees} />
    </div>
  );
}
