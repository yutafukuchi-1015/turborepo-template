"use server";
import { client } from "#api/client";
import { insertEmployeeSchema } from "@repo/db/src/schema/employees/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodIssue } from "zod";

export type ActionState = {
  errors: ZodIssue[] | undefined;
  formData: FormData | undefined;
};

export const createEmployee = async (
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
  const data = parse.data;
  try {
    await client.employees.$post({ json: { ...data } });
    revalidatePath("/employees");
  } catch (error) {
    throw new Error("Failed to create employee");
  }

  redirect("/employees");
};
