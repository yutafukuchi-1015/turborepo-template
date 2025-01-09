import React from "react";
import { Form } from "./form";
import { getDepartments } from "@/web/api/departments/api";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const departments = await getDepartments();

  return <Form departments={departments} />;
}
