import { expect, test } from "@playwright/test";

test("energy is not the whole bill", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "WattBill" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alessandro Alghisi");
  await expect(page.getByTestId("energy-share")).toContainText("57%");
});
