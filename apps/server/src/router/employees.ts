import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
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
      ...result[0]!, //FIXME nullの場合が想定できてない. try/catch?
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      // insertEmployeesSchema),
      z.object({
        name: z.string(),
      })
    ),
    async (c) => {
      const body = await c.req.valid("json");
      await db.insert(employeesTable).values(body);
      return c.status(200);
    }
  )
  .put(
    "/:id",
    zValidator(
      "json",
      // insertEmployeesSchema),
      z.object({
        name: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const body = await c.req.valid("json");
      const res = await db
        .update(employeesTable)
        .set(body)
        .where(eq(employeesTable.id, Number(id)));
      return c.json(res);
    }
  );
