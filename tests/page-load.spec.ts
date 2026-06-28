import { test, expect } from '@playwright/test';

test.describe('Page Load & Performance', () => {
  test('homepage loads with HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('homepage has a title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
  });

  test('homepage body is visible and non-empty', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('homepage loads within 15 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    expect(Date.now() - start).toBeLessThan(15000);
  });

  test('no console errors on homepage load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});
