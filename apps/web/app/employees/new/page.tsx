import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Form />;
}
