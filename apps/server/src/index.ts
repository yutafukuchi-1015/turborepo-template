import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello Bun!" });
});

const port = 8080;
console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
