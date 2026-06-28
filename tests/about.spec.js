const { test, expect } = require('@playwright/test');

test.describe('About Us & Footer', () => {
  test('about us page loads', async ({ page }) => {
    await page.goto('/pages/about-us', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('about us page has content', async ({ page }) => {
    await page.goto('/pages/about-us', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('sauce');
  });

  test('footer is visible on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer, [id*="footer"], [class*="footer"]');
    await expect(footer.first()).toBeVisible();
  });

  test('footer shows accepted payment methods', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Payment icons are images — check alt text or page source instead of inner text
    const html = await page.content();
    expect(html.toLowerCase()).toMatch(/visa|mastercard|amex|american.express|payment/);
  });

  test('social media links are present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const social = page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]');
    await expect(social.first()).toBeVisible();
  });

  test('footer has copyright notice', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/©|copyright|shopify/);
  });
});
