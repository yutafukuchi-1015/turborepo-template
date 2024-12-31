"use client";

import React, { useActionState } from "react";
import { Button, Input, Label } from "@repo/ui";
import { Employees } from "@repo/db/src/schema/employees/validation";
import { updateEmployee, deleteEmployee } from "./actions";
import { ZodIssue } from "zod";
import { hasError, errorMessage, createDefaultValue } from "@/web/lib/form";
import { InputWrapper } from "@/web/components/input-wrapper";
import { SelectWrapper } from "@/web/components/select-wrapper";
import { Departments } from "@repo/db/src/schema";

export const Form = ({
  employee,
  departments,
}: {
  employee: Employees;
  departments: Departments[];
}) => {
  const [state, formAction] = useActionState<
    { errors: ZodIssue[] | undefined; formData: FormData | undefined },
    FormData
  >((state, formData) => updateEmployee(employee.id, state, formData), {
    errors: undefined,
    formData: undefined,
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
            <InputWrapper
              name={"name"}
              formData={state.formData}
              errors={state.errors}
              defaultValue={employee.name}
            />
          </div>
          <div className="space-y-2">
            {/* FIXME 0でもFE validationは通っているが、どこかのvalidationにかかり登録されてない */}
            <Label htmlFor="department">Department</Label>
            <SelectWrapper
              name={"department"}
              formData={state.formData}
              errors={state.errors}
              defaultValue={String(employee.department)}
              options={departments.map((department, index) => {
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
