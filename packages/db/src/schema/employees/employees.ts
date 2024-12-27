import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const employees = pgTable("employees", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  department: integer(),
});
