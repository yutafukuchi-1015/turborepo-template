import React from "react";
import { client } from "@/server/src/index";
import { EmployeesTable } from "./_components/employees-table";

export default async function EmployeesPage() {
  const res = client.employees.$get();
  const employees = await (await res).json();
  return (
    <div>
      <h1>Employees List</h1>
      <EmployeesTable employees={employees} />
    </div>
  );
}
