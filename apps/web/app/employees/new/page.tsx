import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";
import { useDepartments } from "@/web/api/departments/api";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const departments = await useDepartments();

  return <Form departments={departments} />;
}
