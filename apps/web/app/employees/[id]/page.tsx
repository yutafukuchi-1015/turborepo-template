import React from "react";
import { client } from "@/server/src/index";

export default async function EmployeesPage({
  params,
}: {
  params: { id: string };
}) {
  const res = client.employees[":id"].$get({ param: { id: params.id } });
  const employee = await (await res).json();

  return (
    <div>
      <h1>Employee Detail</h1>
      <p>{employee.id}</p>
      <p>{employee.name}</p>
    </div>
  );
}
