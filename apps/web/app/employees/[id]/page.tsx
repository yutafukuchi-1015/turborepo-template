import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";
import { getDepartments } from "@/web/api/departments/api";
import { getSingleEmployee } from "@/web/api/employees/api";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const singleEmployee = await getSingleEmployee({ id });
  const departments = await getDepartments();

  return <Form singleEmployee={singleEmployee} departments={departments} />;
}
