import type { Preview } from "@storybook/react";
import "../globals.css";
import { redirect } from "@storybook/nextjs/navigation.mock";

class TestRedirect extends Error {
  readonly url: string;
  constructor(url: string) {
    super();
    this.url = url;
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  beforeEach: () => {
    redirect.mockImplementation(() => {
      console.log("redirect.mockImplementation");
    });
  },
};

export default preview;
