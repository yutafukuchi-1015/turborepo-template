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
  return <Form employee={employee} />;
}
