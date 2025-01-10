"use client";

import React, { useActionState } from "react";
import { Button, Label } from "@repo/ui";
import { Employee } from "@repo/db/src/schema/employees/validation";
import { updateEmployee, deleteEmployee } from "./actions";
import { ZodIssue } from "zod";
import { InputWrapper } from "@/web/components/input-wrapper";
import { SelectWrapper } from "@/web/components/select-wrapper";
import { Department } from "@repo/db/src/schema";
import { createOptions } from "@/web/lib/form";

export const Form = ({
  singleEmployee,
  departments,
}: {
  singleEmployee: Employee;
  departments: Department[];
}) => {
  const [state, formAction] = useActionState<
    { errors: ZodIssue[] | undefined; formData: FormData | undefined },
    FormData
  >((state, formData) => updateEmployee(singleEmployee.id, state, formData), {
    errors: undefined,
    formData: undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Employee Detail</h1>
        <form action={() => deleteEmployee(singleEmployee.id)}>
          <Button type="submit">Delete</Button>
        </form>
      </div>

      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <InputWrapper
              name={"name"}
              formData={state.formData}
              errors={state.errors}
              defaultValue={singleEmployee.name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <SelectWrapper
              name={"department"}
              formData={state.formData}
              errors={state.errors}
              defaultValue={String(singleEmployee.department)}
              options={createOptions({ response: departments })}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
