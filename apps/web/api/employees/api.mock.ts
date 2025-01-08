import { fn, Mock } from "@storybook/test";
import * as actual from "./api";
import { Employee } from "@repo/db/src/schema";

export * from "./api";

// when use mock api, check apps/web/api/employees/api.ts and comment-in code
export const getEmployees: Mock<() => Promise<{ results: Employee[] }>> = fn(
  actual.getEmployees
).mockName("getEmployees");
