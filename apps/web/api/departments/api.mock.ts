import { fn, Mock } from "@storybook/test";
import * as actual from "./api";
import { Departments } from "@repo/db/src/schema";

export * from "./api";

// when use mock api, check apps/web/api/employees/api.ts and comment-in code
export const useDepartments: Mock<() => Promise<Departments[]>> = fn(
  actual.useDepartments
).mockName("useDepartments");
