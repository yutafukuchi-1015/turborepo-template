import { drizzle } from "drizzle-orm/node-postgres";
import { departments, employees } from "@repo/db/src/schema";

const main = async () => {
  const db = drizzle("postgres://postgres:postgres@localhost:5432/postgres");

  await db.insert(departments).values({
    label: "Departments1",
    version: 1,
    createdAt: "2025-01-07 06:00:10.704763",
    updatedAt: null,
    deletedAt: null,
  });

  await db.insert(employees).values({
    name: "Employee1",
    department: null,
    version: 1,
    createdAt: "2025-01-07 06:00:10.704763",
    updatedAt: null,
    deletedAt: null,
  });
};

main();
