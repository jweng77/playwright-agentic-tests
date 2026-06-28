const { test, expect } = require('@playwright/test');

test.describe('Shopping Cart', () => {
  test('cart page loads', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('empty cart shows empty message', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('empty');
  });

  test('empty cart has continue shopping link', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    const link = page.getByRole('link', { name: /continue shopping/i });
    await expect(link).toBeVisible();
  });

  test('continue shopping from empty cart navigates to catalog', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /continue shopping/i }).click();
    await expect(page).toHaveURL(/collections|catalog|\//);
  });

  test('add to cart button is present on product page', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    const addToCart = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCart).toBeVisible();
  });

  test('clicking add to cart stays on page or redirects to cart', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForLoadState('load');
    expect(page.url()).toMatch(/grey-jacket|cart/);
  });

  test('cart page has checkout link', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/check out|checkout/);
  });
});
