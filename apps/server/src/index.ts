import { Hono } from "hono";
import { hc } from "hono/client";
import { AnyZodObject, z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

const schema = z.object({
  id: z.number(),
  name: z.string(),
});

const routes = app.get("/v1/users", async (c) => {
  return c.json({ message: `test` });
});

export type AppType = typeof routes;
export const client = hc<AppType>("http://localhost:8080/");

const port = 8080;

export default {
  port,
  fetch: app.fetch,
};
