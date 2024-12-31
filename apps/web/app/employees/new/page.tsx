import React from "react";
import { client } from "@/server/src/index";
import { Form } from "./form";

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const departmentsRes = client.departments.$get(undefined, {
    fetch: () =>
      fetch(client.departments.$url(), {
        method: "GET",
        cache: "no-store",
      }),
  });
  const departments = await (await departmentsRes).json();

  return <Form departments={departments} />;
}
