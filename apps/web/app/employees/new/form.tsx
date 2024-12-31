"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { createEmployee } from "./actions";
import { ZodIssue } from "zod";
import { hasError, errorMessage, createDefaultValue } from "@/web/lib/form";
import { InputWrapper } from "@/web/components/input-wrapper";

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
            <InputWrapper
              name={"name"}
              formData={state.formData}
              errors={state.errors}
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <InputWrapper
              name={"department"}
              formData={state.formData}
              errors={state.errors}
              type="number"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
