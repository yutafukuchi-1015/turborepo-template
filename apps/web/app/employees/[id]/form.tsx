"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { Employees } from "@repo/db/src/schema/employees/validation";
import { updateEmployee } from "./actions";

export const Form = ({ employee }: { employee: Employees }) => {
  const [state, formAction] = useActionState(
    updateEmployee.bind(null, employee.id),
    {
      id: employee.id,
      name: employee.name,
    }
  );
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Employee Detail </h1>
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
