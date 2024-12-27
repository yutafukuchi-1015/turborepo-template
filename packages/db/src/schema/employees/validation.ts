import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employees } from "./employees";
import { z } from "zod";

const extendSchema = z.object({
  name: z.string().min(1).max(255),
  department: z.preprocess((v) => Number(v), z.number()),
});

export const insertEmployeesSchema =
  createInsertSchema(employees).merge(extendSchema);
export const selectEmployeesSchema =
  createSelectSchema(employees).merge(extendSchema);

export type InsertEmployees = z.infer<typeof insertEmployeesSchema>;
export type Employees = z.infer<typeof selectEmployeesSchema>;
