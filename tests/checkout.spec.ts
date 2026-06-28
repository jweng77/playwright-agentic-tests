import { test, expect } from '@playwright/test';

test.describe('Checkout Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Add an item to cart before each checkout test
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForURL(/cart/);
  });

  test('cart page shows checkout button', async ({ page }) => {
    const checkout = page.getByRole('button', { name: /check out/i })
      .or(page.getByRole('link', { name: /check out/i }));
    await expect(checkout.first()).toBeVisible();
  });

  test('checkout button navigates to Shopify checkout', async ({ page }) => {
    const checkout = page.getByRole('button', { name: /check out/i })
      .or(page.getByRole('link', { name: /check out/i }));
    await checkout.first().click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toMatch(/checkout|shopify/);
  });

  test('cart displays correct product name', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Grey jacket');
  });

  test('cart displays correct price', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('£55.00');
  });

  test('cart displays subtotal', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/subtotal|total/);
  });
});
