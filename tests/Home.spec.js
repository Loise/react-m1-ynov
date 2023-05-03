import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React App/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the get started link.
  await page.getByRole('link', { name: "S'inscrire" }).click();

  // Expects the URL to contain signin.
  await expect(page).toHaveURL(/.*signIn/);
});