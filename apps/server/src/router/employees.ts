import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@repo/db";
import { employees as employeesTable } from "@repo/db/src/schema";

export const employees = new Hono()
  .get("/", async (c) => {
    // try {
    const results = await db.select().from(employeesTable);
    return c.json({
      results,
    });
    // } catch (error: any) {
    //   if (error instanceof Error) {
    //     console.error({ message: "エラー", errorMessage: error.message });
    //     return c.body("", 500);
    //   }
    //   console.error({ message: "不明なエラー" });
    //   return c.body("", 500);
    // }
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const result = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, Number(id)));

    return c.json({
      ...result[0], //FIXME nullの場合が想定できてない. try/catch?
    });
  });
