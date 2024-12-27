"use server";
import { client } from "@/server/src";
import {
  InsertEmployees,
  insertEmployeesSchema,
} from "@repo/db/src/schema/employees/validation";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodIssue } from "zod";

export const createEmployee = async (
  prevState: {
    errors: ZodIssue[] | undefined;
  },
  formData: FormData
): Promise<{ errors: ZodIssue[] | undefined }> => {
  const schema = insertEmployeesSchema.pick({ name: true });
  const parse = schema.safeParse({
    name: formData.get("name"),
  });
  if (!parse.success) {
    return { errors: parse.error.errors as ZodIssue[] };
  }
  const data = parse.data;
  try {
    await client.employees.$post({ json: { name: data.name } });
    revalidatePath("/employees");
    return { errors: undefined };
  } catch (error) {
    throw new Error("Failed to create employee");
  }
};
