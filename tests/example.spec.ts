import { test, expect } from '@playwright/test';
import { Example } from '../pages/example-page';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('get started link', async ({ page }) => {
  const example = new Example(page);
  await example.functionOne();
  await example.newPage();
});
