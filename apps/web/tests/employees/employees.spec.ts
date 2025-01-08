import { test, expect } from "@playwright/test";

test("/employees click New button", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/employees-overview-page--primary"
  );
  await page.getByRole("tab", { name: /Actions ([0-9999999])/ }).click();
  await page
    .locator('iframe[title="storybook-preview-iframe"]')
    .contentFrame()
    .getByRole("button", { name: "New" })
    .click();

  await expect(page.locator("#panel-tab-content")).toContainText(
    '▶next/router::useRouter().prefetch: (3) ["/employees/new", "/employees/new", Object]'
  );
  await expect(page.locator("#panel-tab-content")).toContainText(
    '▶next/router::useRouter().push: (3) ["/employees/new", "/employees/new", Object]'
  );
});
