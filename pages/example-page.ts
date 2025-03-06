import { chromium, expect, Page } from "@playwright/test";

export class Example {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async functionOne() {
        await this.page.goto('https://playwright.dev/');

        // Click the get started link.
        await this.page.getByRole('link', { name: 'Get started' }).click();

        // Expects page to have a heading with the name of Installation.
        await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    }

    async newPage() {
        // Launch the browser
        const browser = await chromium.launch({ headless: false });

        // Create a new browser context
        const context = await browser.newContext();

        // Create the first page (tab)
        const page1 = await context.newPage();
        await page1.goto("https://www.perplexity.ai/");

        // Create a new page (tab) in the same context
        const page2 = await context.newPage();
        await page2.goto("https://www.google.com/");
        await expect(page2.getByText("ijokj"));

    }
}