import { fn, Mock } from "@storybook/test";
import * as actual from "./api";
import { Employees } from "@repo/db/src/schema";

export * from "./api";

// when use mock api, check apps/web/api/employees/api.ts and comment-in code
export const useEmployees: Mock<() => Promise<{ results: Employees[] }>> = fn(
  actual.useEmployees
).mockName("useEmployees");
