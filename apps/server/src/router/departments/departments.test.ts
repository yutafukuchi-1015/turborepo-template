import { expect, test } from "bun:test";
import { testClient } from "hono/testing";

import { app } from "../../index";

test("/departments GET", async () => {
  const res = await testClient(app).departments.$get();
  const json = await res.json();

  expect(res.status).toBe(200);
});
