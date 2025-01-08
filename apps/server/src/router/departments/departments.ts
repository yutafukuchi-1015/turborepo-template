import { Hono } from "hono";
import { ZodType, z } from "zod";
import { db } from "@repo/db";
import { departments as departmentsTable } from "@repo/db/src/schema";
import {
  Department,
  selectDepartmentSchema,
} from "@repo/db/src/schema/departments/validation";

export const departments = new Hono().get("/", async (c) => {
  const _departments = await db.select().from(departmentsTable);

  const data = z
    .array<ZodType<Department>>(selectDepartmentSchema as any) // FIXME any
    .parse(_departments);

  return c.json(data, 200);
});
