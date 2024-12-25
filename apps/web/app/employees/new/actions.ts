"use server";
import { client } from "@/server/src";
import { insertEmployeesSchema } from "@repo/db/src/schema/employees/validation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createEmployee = async (
  prevState: {
    errors:
      | z.ZodError<{
          name: string;
        }>
      | undefined;
  },
  formData: FormData
) => {
  const schema = z.object({
    name: z.string().min(1),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
  });
  if (!parse.success) {
    return { errors: parse.error };
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
