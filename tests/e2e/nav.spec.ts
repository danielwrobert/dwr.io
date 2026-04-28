import { test, expect } from "@playwright/test";

test("home → notebook → post → notebook", async ({ page }) => {
  // Home page loads with correct title
  await page.goto("/");
  await expect(page).toHaveTitle(/Daniel W\. Robert/);

  // Click the Notebook nav link
  await page.getByRole("navigation").getByRole("link", { name: "Notebook" }).click();
  await expect(page).toHaveURL("/notebook");

  // A known post is listed
  const postLink = page
    .getByRole("article")
    .filter({ hasText: /Intro to the Web Storage API/i })
    .getByRole("link", { name: /Intro to the Web Storage API/i });
  await expect(postLink).toBeVisible();

  // Navigate into the post
  await postLink.click();
  await expect(page).toHaveURL(/\/intro-to-the-web-storage-api/);
  await expect(page).toHaveTitle(/Web Storage API/);

  // Back to all notes
  await page.getByRole("link", { name: /back to all notes/i }).click();
  await expect(page).toHaveURL("/notebook");
});
