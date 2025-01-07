// Import necessary modules
import { expect, test, afterAll } from "bun:test";

import { testClient } from "hono/testing";
import { app } from "../../index";
import { db } from "@repo/db";
import {
  departments,
  Employees,
  employees,
  InsertEmployees,
} from "@repo/db/src/schema";

// Seed data
const seedData: InsertEmployees[] = [
  { name: "Employee 1", department: 1 },
  { name: "Employee 2", department: 1 },
  // Add more seed data as needed
];

const makeInitDb = async (
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0]
) => {
  await tx.delete(employees).execute();
  await tx.insert(employees).values(seedData).execute();
};

// GET /employees test
test("GET /employees", async () => {
  await db.transaction(async (tx) => {
    makeInitDb(tx);

    const res = await testClient(app).employees.$get();
    const json = await res.json();

    expect(res.status).toBe(200);
  });
});

// POST /employees test
test("POST /employees", async () => {
  await db.transaction(async (tx) => {
    makeInitDb(tx);

    const mockData = {
      json: {
        name: "employees-post-test",
        department: 1,
      },
    };

    const res = await testClient(app).employees.$post(mockData);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.name).toBe(mockData.json.name);
    expect(json.department).toBe(1);
  });
});
