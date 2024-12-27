"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { Employees } from "@repo/db/src/schema/employees/validation";
import { updateEmployee, deleteEmployee } from "./actions";
import { ZodIssue } from "zod";

export const Form = ({ employee }: { employee: Employees }) => {
  const [state, formAction] = useActionState<
    { errors: ZodIssue[] | undefined },
    FormData
  >((state, formData) => updateEmployee(employee.id, state, formData), {
    errors: undefined,
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
            <Input id="name" name="name" defaultValue={employee.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              type="number"
              defaultValue={employee.department}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
