import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { departments } from "./departments";
import { z } from "zod";
import { commonInsertSchema, commonUpdateSchema } from "../utils";

const extendSchema = z.object({
  label: z.string().min(1).max(255),
});

export const insertDepartmentSchema = commonInsertSchema.merge(extendSchema);
export const selectDepartmentSchema = commonUpdateSchema.merge(extendSchema);

export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = z.infer<typeof selectDepartmentSchema>;
