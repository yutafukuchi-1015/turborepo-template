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
  const res = await testClient(app).employees.$get();
  await tx.insert(employees).values(seedData);
  return res.json();
};

// FIXME
// impl automaticaly rollback
const rollbackTransaction = async (
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  prev: { results: Employees[] }
) => {
  await tx.delete(employees);
  await tx.insert(employees).values(
    prev.results.map(({ id, ...args }) => {
      return { ...args };
    })
  );
};

test("GET /employees", async () => {
  await db.transaction(async (tx) => {
    const prev = await makeInitDb(tx);

    const res = await testClient(app).employees.$get();
    const json = await res.json();

    expect(res.status).toBe(200);

    rollbackTransaction(tx, prev);
  });
});

test("POST /employees", async () => {
  await db.transaction(async (tx) => {
    const prev = await makeInitDb(tx);

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
    expect(json.department).toBe(mockData.json.department);

    rollbackTransaction(tx, prev);
  });
});

test("PUT /employees", async () => {
  await db.transaction(async (tx) => {
    const prev = await makeInitDb(tx);

    const prevData = {
      json: {
        name: "employees-post-test-prev",
        department: 1,
      },
    };
    const expectedData = {
      json: {
        name: "employees-post-test-expected",
        department: 1,
      },
    };

    const postedMockData = await testClient(app).employees.$post(prevData);
    const deserializedPostedMockData = await postedMockData.json();
    console.log("deserializedPostedMockData", deserializedPostedMockData);
    const res = await testClient(app).employees[":id"].$put({
      json: expectedData.json,
      param: { id: String(deserializedPostedMockData.id) },
    });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.name).toBe(expectedData.json.name);
    expect(json.department).toBe(expectedData.json.department);

    rollbackTransaction(tx, prev);
  });
});

test("DELETE /employees", async () => {
  await db.transaction(async (tx) => {
    const prev = await makeInitDb(tx);
    const mockData = {
      json: {
        name: "employees-post-test",
        department: 1,
      },
    };
    const postedMockData = await testClient(app).employees.$post(mockData);
    const deserializedPostedMockData = await postedMockData.json();
    const res = await testClient(app).employees[":id"].$delete({
      param: { id: String(deserializedPostedMockData.id) },
    });
    const json = await res.json();

    expect(res.status).toBe(200);

    rollbackTransaction(tx, prev);
  });
});
