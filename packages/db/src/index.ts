import "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(
  "postgres://postgres:postgres@localhost:5432/postgres" // FIXME use .env
);
