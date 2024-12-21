import { Hono } from "hono";

export const employees = new Hono().get("/", async (c) => {
  return c.json({
    results: [
      {
        id: 1,
        name: "test1",
      },
      {
        id: 2,
        name: "test2",
      },
    ],
  });
});
