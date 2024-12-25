"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import {
  Employees,
  InsertEmployees,
} from "@repo/db/src/schema/employees/validation";
import { createEmployee } from "./actions";
import { z, ZodError } from "zod";

export const Form = () => {
  //FIXME error handling using state
  const [state, formAction] = useActionState<
    {
      errors: ZodError<Pick<InsertEmployees, "name">> | undefined;
    },
    FormData
  >((state, formData) => createEmployee(state, formData), {
    errors: undefined,
  });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">New Employee</h1>
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