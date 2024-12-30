"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { createEmployee } from "./actions";
import { ZodIssue } from "zod";
import { hasError, errorMessage, createDefaultValue } from "@/web/lib/form";

export const Form = () => {
  const [state, formAction] = useActionState<
    {
      errors: ZodIssue[] | undefined;
      formData: FormData | undefined;
    },
    FormData
  >((state, formData) => createEmployee(state, formData), {
    errors: undefined,
    formData: undefined,
  });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">New Employee</h1>
      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={createDefaultValue({
                formData: state.formData,
                key: "name",
                defaultValue: undefined,
              })}
              error={hasError({
                errors: state.errors,
                key: "name",
              })}
            />
            {state.errors !== undefined && (
              <p className="text-red-500 text-sm font-medium">
                {errorMessage({
                  errors: state.errors,
                  key: "name",
                })}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" type="number" />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
