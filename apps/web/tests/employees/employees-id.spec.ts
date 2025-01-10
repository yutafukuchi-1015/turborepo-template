import { test, expect } from "@playwright/test";

test("/employees/[id] Submit", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/employees-id-page--primary"
  );
  await page.getByRole("tab", { name: /Actions ([0-9999999])/ }).click();

  await page
    .locator('iframe[title="storybook-preview-iframe"]')
    .contentFrame()
    .getByRole("button", { name: "Submit" })
    .click();

  await expect(page.locator("#panel-tab-content")).toContainText(
    '▶next/cache::revalidatePath: (1) ["/employees"]'
  );
  await expect(page.locator("#panel-tab-content")).toContainText(
    '▶next/navigation::redirect: (1) ["/employees"]'
  );
});

test("/employees/[id] Validation error", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/employees-id-page--primary"
  );
  await page.getByRole("tab", { name: /Actions ([0-9999999])/ }).click();

  await page
    .locator('iframe[title="storybook-preview-iframe"]')
    .contentFrame()
    .getByLabel("Name")
    .click();
  await page
    .locator('iframe[title="storybook-preview-iframe"]')
    .contentFrame()
    .getByLabel("Name")
    .fill("");

  await page
    .locator('iframe[title="storybook-preview-iframe"]')
    .contentFrame()
    .getByRole("button", { name: "Submit" })
    .click();

  await expect(
    page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame()
      .getByRole("paragraph")
  ).toContainText("String must contain at least 1 character(s)");
});
