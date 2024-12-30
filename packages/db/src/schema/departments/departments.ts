import { pgTable, text } from "drizzle-orm/pg-core";
import { commonSchema } from "../utils";
import { employees } from "../employees/employees";
import { relations } from "drizzle-orm";

export const departments = pgTable("DEPARTMENTS", {
  ...commonSchema(),
  label: text().notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  employees: many(employees),
}));
