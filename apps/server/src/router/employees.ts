import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { ZodType, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@repo/db";
import { employees as employeesTable } from "@repo/db/src/schema";
import {
  insertEmployeesSchema,
  selectEmployeesSchema,
  Employees
} from "@repo/db/src/schema/employees/validation";

export const employees = new Hono()
  .get("/", async (c) => {
    const _employees = await db.select().from(employeesTable);

    // if it occured error, catch error by app.onError as ZodError
    const data = z.array<ZodType<Employees>>(selectEmployeesSchema as any).parse(_employees); // FIXME any

    return c.json({ results: data }, 200);
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const _employees = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, Number(id)));
    const _employee = _employees[0];

    if (!_employee) {
      throw new HTTPException(403, { message: "Forbidden" });
    }

    // if it occured error, catch error by app.onError as ZodError
    const data = selectEmployeesSchema.parse(_employee);

    return c.json({ ...data }, 200);
  })
  .post("/", zValidator("json", insertEmployeesSchema as any), async (c) => {
    const body = await c.req.valid("json");
    const _newEmployees = (
      await db.insert(employeesTable).values(body).returning()
    )[0];

    // if it occured error, catch error by app.onError as ZodError
    const data = selectEmployeesSchema.parse(_newEmployees);

    return c.json(data, 200);
  })
  .put("/:id", zValidator("json", insertEmployeesSchema as any), async (c) => {
    const { id } = c.req.param();
    const body = await c.req.valid("json");
    const _newEmployees = (
      await db
        .update(employeesTable)
        .set(body)
        .where(eq(employeesTable.id, Number(id)))
        .returning()
    )[0];

    // if it occured error, catch error by app.onError as ZodError
    const data = selectEmployeesSchema.parse(_newEmployees);
    return c.json(data, 200);
  })
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    await db.delete(employeesTable).where(eq(employeesTable.id, Number(id)));
    return c.json({ success: true }, 200);
  });
