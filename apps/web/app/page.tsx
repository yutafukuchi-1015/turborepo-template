import { client } from "../../server/src/index";
import React from "react";

export default async function Home() {
  const res = client.employees.$get();
  const employees = await (await res).json();
  return (
    <div>
      <h1 className="text-3xl font-bold ">employees list</h1>
      {employees.results.map((employee) => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
}
