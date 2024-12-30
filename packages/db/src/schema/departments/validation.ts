import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { departments } from "./departments";
import { z } from "zod";

export const insertDepartmentsSchema = createInsertSchema(departments);
export const selectDepartmentsSchema = createSelectSchema(departments);

export type InsertDepartments = z.infer<typeof insertDepartmentsSchema>;
export type Departments = z.infer<typeof selectDepartmentsSchema>;
