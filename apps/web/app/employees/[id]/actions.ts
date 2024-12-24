"use server";
import { client } from "@/server/src";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const updateEmployee = async (
  id: number,
  prevState: { name: string; id: number } | undefined,
  formData: FormData
) => {
  const schema = z.object({
    name: z.string(),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
  });
  if (!parse.success) {
    return;
  }
  const data = parse.data;
  try {
    await client.employees[":id"].$put({
      json: { name: data.name },
      param: { id: String(id) },
    });
    revalidatePath("/employees");
    return { id: id, name: data.name };
  } catch (error) {
    return;
  }
};
