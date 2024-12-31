import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";
import { useDepartments } from "@/web/api/departments/api";
import { useSingleEmployee } from "@/web/api/employees/api";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const singleEmployee = await useSingleEmployee({ id });
  const departments = await useDepartments();

  return <Form singleEmployee={singleEmployee} departments={departments} />;
}
