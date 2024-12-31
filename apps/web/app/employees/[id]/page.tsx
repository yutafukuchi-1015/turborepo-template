import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";

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

  const departmentsRes = client.departments.$get(undefined, {
    fetch: () =>
      fetch(client.departments.$url(), {
        method: "GET",
        cache: "no-store",
      }),
  });
  const departments = await (await departmentsRes).json();

  return <Form employee={employee} departments={departments} />;
}
