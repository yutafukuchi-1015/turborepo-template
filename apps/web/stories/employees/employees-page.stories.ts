import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import EmployeesPage from "@/web/app/employees/(overview)/page";
import { useEmployees } from "#api/employees/api.mock";
import { useDepartments } from "#api/departments/api.mock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "employees/(overview)/page",
  component: EmployeesPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof EmployeesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
  beforeEach: async () => {
    useEmployees.mockResolvedValue(
      new Promise((resolve, _) => {
        resolve({
          results: [
            {
              name: "mock1",
              department: 1,
              id: 1,
              createdAt: null,
              updatedAt: null,
              deletedAt: null,
              version: null,
            },
          ],
        });
      }) as any
    );

    useDepartments.mockResolvedValue(
      new Promise((resolve, _) => {
        resolve([{ id: 1, label: "departments1" }]);
      }) as any
    );
  },
};
