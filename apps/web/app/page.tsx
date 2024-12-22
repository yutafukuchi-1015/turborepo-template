import { Button, Menubar } from "@repo/ui";
import { client } from "@/server/src/index";
import React from "react";

export default async function Home() {
  const res = client.employees.$get();
  const employees = await (await res).json();
  return (
    <div>
      <h1 className="text-3xl font-bold ">employees list</h1>
      <Button variant="outline">aaa</Button>
      <Menubar>aaaaa</Menubar>
      {employees.results.map((employee) => (
        <div key={employee.id}>
          {employee.id} {employee.name}
        </div>
      ))}
    </div>
  );
}
