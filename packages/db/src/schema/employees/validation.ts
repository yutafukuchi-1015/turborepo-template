import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employees } from "./employees";
import { z } from "zod";
import { commonInsertSchema, commonUpdateSchema } from "../utils";

const extendSchema = z.object({
  name: z.string().min(1).max(255),
  department: z.preprocess((v) => Number(v), z.number()),
});

export const insertEmployeeSchema = commonInsertSchema.merge(extendSchema);
export const selectEmployeeSchema = commonUpdateSchema.merge(extendSchema);

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = z.infer<typeof selectEmployeeSchema>;
