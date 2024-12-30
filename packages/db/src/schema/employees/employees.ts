import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { commonSchema } from "../utils";

export const employees = pgTable("employees", {
  ...commonSchema(),
  name: varchar({ length: 255 }).notNull(),
  department: integer(),
});
