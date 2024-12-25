"use server";
import { client } from "@/server/src";
import { z, ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  InsertEmployees,
  insertEmployeesSchema,
} from "@repo/db/src/schema/employees/validation";

export const updateEmployee = async (
  id: number,
  prevState: { errors: ZodError<Pick<InsertEmployees, "name">> | undefined },
  formData: FormData
): Promise<{ errors: ZodError<{ name: string }> | undefined }> => {
  const schema = insertEmployeesSchema.pick({ name: true });

  const parse = schema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    return { errors: parse.error as ZodError<Pick<InsertEmployees, "name">> };
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