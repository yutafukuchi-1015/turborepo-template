"use client";

import React, { useActionState } from "react";
import { Button, Label } from "@repo/ui";
import { createEmployee } from "./actions";
import { ZodIssue } from "zod";
import { InputWrapper } from "@/web/components/input-wrapper";
import { SelectWrapper } from "@/web/components/select-wrapper";
import { Departments } from "@repo/db/src/schema";

export const Form = ({ departments }: { departments: Departments[] }) => {
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
            <SelectWrapper
              name={"department"}
              formData={state.formData}
              errors={state.errors}
              //FIXME make options creator fn
              options={departments.map((department) => {
                return {
                  label: department.label,
                  value: String(department.id),
                };
              })}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
