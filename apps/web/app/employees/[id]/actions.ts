"use server";
import { client } from "@/server/src";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateEmployee = async (
  id: number,
  prevState: { errors: string[] },
  formData: FormData
): Promise<{ errors: string[] }> => {
  const schema = z.object({
    name: z.string().min(1),
  });

  const parse = schema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    throw new Error("Invalid input");
  }

  try {
    await client.employees[":id"].$put({
      json: parse.data,
      param: { id: String(id) },
    });
    revalidatePath("/employees");
    return { errors: [] };
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
