import { expect, test } from "bun:test";
import { testClient } from "hono/testing";

import { app } from "../../index";

test("/employees GET", async () => {
  const res = await testClient(app).employees.$get();
  const json = await res.json();

  console.log("json", json);

  expect(res.status).toBe(200);
});

// FIXME, After run test, undo db.
test("/employees POST", async () => {
  const res = await testClient(app).employees.$post({
    json: {
      name: "employees-post-test",
      department: 1,
    },
  });
  const json = await res.json();

  expect(res.status).toBe(200);
});
