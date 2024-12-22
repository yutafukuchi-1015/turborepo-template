import { Hono } from "hono";
import { db } from "@repo/db";
import { employees as employeesTable } from "@repo/db/src/schema";

export const employees = new Hono().get("/", async (c) => {
  // try {
  const results = await db.select().from(employeesTable);
  return c.json({
    results, // FIXME serverにあるlocal.dbがpackage/db/local.dbとダブっているので削除
  });
  // } catch (error: any) {
  //   if (error instanceof Error) {
  //     console.error({ message: "エラー", errorMessage: error.message });
  //     return c.body("", 500);
  //   }
  //   console.error({ message: "不明なエラー" });
  //   return c.body("", 500);
  // }
});
