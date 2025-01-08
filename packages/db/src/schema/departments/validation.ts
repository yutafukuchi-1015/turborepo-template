import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { departments } from "./departments";
import { z } from "zod";

export const insertDepartmentSchema = createInsertSchema(departments);
export const selectDepartmentSchema = createSelectSchema(departments);

export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = z.infer<typeof selectDepartmentSchema>;
