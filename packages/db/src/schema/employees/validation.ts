import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employees } from "./employees";
import { z } from "zod";

export const insertEmployeesSchema = createInsertSchema(employees);
export const selectEmployeesSchema = createSelectSchema(employees);

export type InsertEmployees = z.infer<typeof insertEmployeesSchema>;
export type Employees = z.infer<typeof selectEmployeesSchema>;
