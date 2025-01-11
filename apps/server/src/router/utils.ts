import { sql } from "drizzle-orm/sql/sql";

export const increment = (column: any, value = 1) => {
  return sql`${column} + ${value}`;
};
