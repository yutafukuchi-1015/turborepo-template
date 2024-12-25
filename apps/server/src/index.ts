import "dotenv/config";
import { Hono } from "hono";
import { hc } from "hono/client";
import { employees } from "./router/employees";
import { handleError } from "./error/error";

const port = Number(process.env.PORT) || 8080;
const apiUrl = process.env.API_URL || "http://localhost:8080/";

const app = new Hono().onError(handleError).route("/employees", employees);

export type AppType = typeof app;
export const client = hc<AppType>(apiUrl);

export default {
  port,
  fetch: app.fetch,
};
