import { Hono } from "hono";
import { hc } from "hono/client";
import { employees } from "./router/employees";

const app = new Hono().route("/employees", employees);

export type AppType = typeof app;
export const client = hc<AppType>("http://localhost:8080/"); // FIXME use .env

const port = 8080;

export default {
  port,
  fetch: app.fetch,
};
