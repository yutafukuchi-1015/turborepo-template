import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employeesTable } from "./employees";
import { z } from "zod";

export const insertEmployeesSchema = createInsertSchema(employeesTable);
export const selectEmployeesSchema = createSelectSchema(employeesTable);

export type InsertEmployees = z.infer<typeof insertEmployeesSchema>;
export type Employees = z.infer<typeof selectEmployeesSchema>;
