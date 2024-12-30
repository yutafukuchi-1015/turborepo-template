import { integer, timestamp } from "drizzle-orm/pg-core";

export const commonSchema = () => {
  return {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    version: integer(),
  };
};
