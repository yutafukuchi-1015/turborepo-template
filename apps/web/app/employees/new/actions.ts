"use server";
import { client } from "@/server/src";
import { insertEmployeesSchema } from "@repo/db/src/schema/employees/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodIssue } from "zod";

export const createEmployee = async (
  prevState: {
    errors: ZodIssue[] | undefined;
  },
  formData: FormData
): Promise<{ errors: ZodIssue[] | undefined }> => {
  const schema = insertEmployeesSchema;
  const parse = schema.safeParse({
    name: formData.get("name"),
    department: formData.get("department"),
  });
  if (!parse.success) {
    return { errors: parse.error.errors as ZodIssue[] };
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
