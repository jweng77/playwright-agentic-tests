const { test, expect } = require('@playwright/test');

test.describe('Checkout Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Use Shopify AJAX cart API to add grey-jacket without relying on UI redirect
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 611945025, quantity: 1 }] }),
      });
    });
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
  });

  test('cart page shows checkout button', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/check out|checkout/);
  });

  test('checkout button navigates to Shopify checkout', async ({ page }) => {
    const checkout = page.getByRole('button', { name: /check out/i })
      .or(page.getByRole('link', { name: /check out/i }));
    await checkout.first().click();
    await page.waitForLoadState('load');
    expect(page.url()).toMatch(/checkout|shopify/);
  });

  test('cart displays subtotal', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/subtotal|total/);
  });
});
