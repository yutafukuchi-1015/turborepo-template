import { fn, Mock } from "@storybook/test";
import * as actual from "./api";
import { Employee } from "@repo/db/src/schema";

export * from "./api";

export const getEmployees: Mock<() => Promise<{ results: Employee[] }>> = fn(
  actual.getEmployees
).mockName("getEmployees");

export const getSingleEmployee: Mock<() => Promise<Employee>> = fn(
  actual.getSingleEmployee
).mockName("getSingleEmployee");
