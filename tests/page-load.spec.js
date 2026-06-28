const { test, expect } = require('@playwright/test');

test.describe('Page Load & Performance', () => {
  test('homepage loads with HTTP 200', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);
  });

  test('homepage has a title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('homepage body is visible and non-empty', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('homepage loads within 15 seconds', async ({ page }) => {
    const start = Date.now();
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(response?.status()).toBeLessThan(400);
    expect(elapsed).toBeLessThan(15000);
  });

  test('no blocking console errors on homepage load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    // Filter out known third-party noise
    const blockingErrors = errors.filter(e => !e.includes('favicon') && !e.includes('analytics'));
    expect(blockingErrors).toHaveLength(0);
  });
});
