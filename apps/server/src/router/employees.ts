import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@repo/db";
import { employees as employeesTable } from "@repo/db/src/schema";

export const employees = new Hono()
  .get("/", async (c) => {
    const results = await db.select().from(employeesTable);
    return c.json({ results });
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const result = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, Number(id)));

    if (!result[0]) {
      return c.json({ error: "Employee not found" }, 404);
    }

    return c.json({ result: result[0] });
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
      const res = await db.insert(employeesTable).values(body);
      return c.json(res);
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
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    await db.delete(employeesTable).where(eq(employeesTable.id, Number(id)));
    return c.json({ success: true });
  });
