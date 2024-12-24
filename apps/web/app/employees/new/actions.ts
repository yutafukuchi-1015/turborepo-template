"use server";
import { client } from "@/server/src";
import { insertEmployeesSchema } from "@repo/db/src/schema/employees/validation";
import { revalidatePath } from "next/cache";

export const createEmployee = async (
  prevState: { name: string } | undefined,
  formData: FormData
) => {
  const schema = insertEmployeesSchema;
  const parse = schema.safeParse({
    name: formData.get("name"),
  });
  if (!parse.success) {
    return { name: "Failed" }; // FIXME
  }
  const data = parse.data;
  try {
    await client.employees.$post({ json: { name: data.name } });
    revalidatePath("/employees");
  } catch (error) {
    return { name: "Failed" }; // FIXME
  }
};
