import { integer, timestamp } from "drizzle-orm/pg-core";

export const commonSchema = () => {
  return {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp(),
    deleted_at: timestamp(),
    version: integer(),
  };
};
