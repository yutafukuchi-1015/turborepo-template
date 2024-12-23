import React from "react";
import { client } from "@/server/src/index";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await client.employees[":id"].$get({
    param: { id: id },
  });
  const employee = await res.json();

  return (
    <div>
      <h1>Employee Detail</h1>
      <div className="flex">
        <p>id</p>
        <p>{employee.id}</p>
      </div>
      <p>{employee.name}</p>
    </div>
  );
}
