import React from "react";
import { Form } from "./form";
import { getDepartments } from "#api/departments/api";
import { getSingleEmployee } from "#api/employees/api";

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const singleEmployee = await getSingleEmployee({ id });
  const departments = await getDepartments();

  return <Form singleEmployee={singleEmployee} departments={departments} />;
}
