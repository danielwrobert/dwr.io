import { test, expect } from "@playwright/test";

test("home → post → back to home", async ({ page }) => {
  // Home page loads with correct title
  await page.goto("/");
  await expect(page).toHaveTitle(/Daniel W\. Robert/);

  // A known post is listed on the home page
  const postLink = page
    .getByRole("article")
    .filter({ hasText: /Intro to the Web Storage API/i })
    .getByRole("link", { name: /Intro to the Web Storage API/i });
  await expect(postLink).toBeVisible();

  // Navigate into the post
  await postLink.click();
  await expect(page).toHaveURL(/\/intro-to-the-web-storage-api/);
  await expect(page).toHaveTitle(/Web Storage API/);

  // Back to all notes returns to home
  await page.getByRole("link", { name: /back to all notes/i }).click();
  await expect(page).toHaveURL("/");
});
