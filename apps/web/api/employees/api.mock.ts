import { fn } from "@storybook/test";
import * as actual from "./api";

export * from "./api";

// when use mock api, check apps/web/api/employees/api.ts and comment-in code
export const useEmployees = fn(actual.useEmployees).mockName("useEmployees");
