import { integer, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const commonColumns = () => {
  return {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    version: integer().default(1),
  };
};

const commonSchema = z.object({
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  deletedAt: z.string().nullish(),
});

export const commonInsertSchema = z
  .object({
    id: z.number().nullish(),
    version: z.number().nullish(),
  })
  .merge(commonSchema);

export const commonUpdateSchema = z
  .object({
    id: z.number(),
    version: z.number(),
  })
  .merge(commonSchema);
