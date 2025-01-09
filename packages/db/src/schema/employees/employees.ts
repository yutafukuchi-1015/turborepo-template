import { foreignKey, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../utils";
import { departments } from "../index";
import { relations } from "drizzle-orm";

export const employees = pgTable(
  "EMPLOYEES",
  {
    ...commonColumns(),
    name: varchar({ length: 255 }).notNull(),
    department: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.department],
      foreignColumns: [departments.id],
      name: "fk_department_id",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const employeesRelations = relations(employees, ({ one }) => ({
  department: one(departments, {
    fields: [employees.department],
    references: [departments.id],
  }),
}));
