// Import necessary modules
import { expect, test, afterAll } from "bun:test";

import { testClient } from "hono/testing";
import { app } from "../../index";
import { db } from "@repo/db";
import {
  departments,
  Employee,
  employees,
  InsertEmployee,
} from "@repo/db/src/schema";

// Seed data
const seedData: InsertEmployee[] = [
  {
    name: "Employee 1",
    department: 1,
    version: 1,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
  {
    name: "Employee 2",
    department: 1,
    version: 1,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
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
  prev: { results: Employee[] }
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
        name: "Employee 3",
        department: 1,
      } satisfies InsertEmployee,
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
        name: "Employee 3",
        department: 1,
      } satisfies InsertEmployee,
    };
    const expectedData = {
      json: {
        name: "Employee 4",
        department: 1,
      } satisfies InsertEmployee,
    };

    const postedMockData = await testClient(app).employees.$post(prevData);
    const deserializedPostedMockData = await postedMockData.json();
    const res = await testClient(app).employees[":id"].$put({
      json: expectedData.json,
      param: { id: String(deserializedPostedMockData.id) },
    });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.name).toBe(expectedData.json.name);
    expect(json.department).toBe(expectedData.json.department);
    expect(json.version).toBe(2);

    rollbackTransaction(tx, prev);
  });
});

test("DELETE /employees", async () => {
  await db.transaction(async (tx) => {
    const prev = await makeInitDb(tx);
    const mockData = {
      json: {
        name: "Employee 3",
        department: 1,
      } satisfies InsertEmployee,
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
