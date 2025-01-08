import { fn, Mock } from "@storybook/test";
import * as actual from "./api";
import { Department } from "@repo/db/src/schema";

export * from "./api";

// when use mock api, check apps/web/api/employees/api.ts and comment-in code
export const getDepartments: Mock<() => Promise<Department[]>> = fn(
  actual.getDepartments
).mockName("getDepartments");
