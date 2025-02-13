"use server";
import { client } from "#api/client";
import { z, ZodIssue } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertEmployeeSchema } from "@repo/db/src/schema/employees/validation";
import { departments } from "@repo/db/src/schema";

export type ActionState = {
  errors: ZodIssue[] | undefined;
  formData: FormData | undefined;
};

export const updateEmployee = async (
  id: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const schema = insertEmployeeSchema;

  const parse = schema.safeParse({
    name: formData.get("name"),
    department: formData.get("department"),
  });

  if (!parse.success) {
    return { errors: parse.error.errors as ZodIssue[], formData };
  }

  try {
    await client.employees[":id"].$put({
      json: parse.data,
      param: { id: String(id) },
    });
    revalidatePath("/employees");
  } catch (error) {
    throw new Error("Failed to update employee");
  }
  redirect("/employees");
  return { errors: [] as ZodIssue[], formData }; // for storybook
};

export const deleteEmployee = async (id: number) => {
  try {
    await client.employees[":id"].$delete({ param: { id: String(id) } });
    revalidatePath("/employees");
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
  redirect("/employees");
};
