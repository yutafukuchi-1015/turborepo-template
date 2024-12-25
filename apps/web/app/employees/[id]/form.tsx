"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { Employees } from "@repo/db/src/schema/employees/validation";
import { updateEmployee, deleteEmployee } from "./actions";

export const Form = ({ employee }: { employee: Employees }) => {
  const [state, formAction] = useActionState<
    { name: string; id: number },
    FormData
  >((state, formData) => updateEmployee(employee.id, state, formData), {
    id: employee.id,
    name: employee.name,
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Employee Detail</h1>
        <Button onClick={() => deleteEmployee(employee.id)}>Delete</Button>
      </div>

      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
