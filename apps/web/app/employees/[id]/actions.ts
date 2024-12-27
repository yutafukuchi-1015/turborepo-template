"use server";
import { client } from "@/server/src";
import { ZodIssue } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertEmployeesSchema } from "@repo/db/src/schema/employees/validation";

export const updateEmployee = async (
  id: number,
  prevState: { errors: ZodIssue[] | undefined },
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

  try {
    await client.employees[":id"].$put({
      json: parse.data,
      param: { id: String(id) },
    });
    revalidatePath("/employees");
    return { errors: undefined };
  } catch (error) {
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await client.employees[":id"].$delete({ param: { id: String(id) } });
    revalidatePath("/employees");
    redirect("/employees");
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
};
