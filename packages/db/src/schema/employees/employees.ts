import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const employeesTable = sqliteTable("employees_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
