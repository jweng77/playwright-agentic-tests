import { test, expect } from '@playwright/test';

test.describe('About Us & Footer', () => {
  test('about us page loads', async ({ page }) => {
    await page.goto('/pages/about-us');
    await expect(page.locator('body')).toBeVisible();
  });

  test('about us page has content', async ({ page }) => {
    await page.goto('/pages/about-us');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('sauce');
  });

  test('footer is visible on homepage', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer, [id*="footer"], [class*="footer"]');
    await expect(footer.first()).toBeVisible();
  });

  test('footer shows accepted payment methods', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/visa|mastercard|amex|american express/);
  });

  test('social media links are present', async ({ page }) => {
    await page.goto('/');
    const social = page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]');
    await expect(social.first()).toBeVisible();
  });

  test('footer has copyright notice', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/©|copyright|shopify/);
  });
});
