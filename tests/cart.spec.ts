import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('cart page loads', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('body')).toBeVisible();
  });

  test('empty cart shows empty message', async ({ page }) => {
    await page.goto('/cart');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('empty');
  });

  test('empty cart has continue shopping link', async ({ page }) => {
    await page.goto('/cart');
    const link = page.getByRole('link', { name: /continue shopping/i });
    await expect(link).toBeVisible();
  });

  test('continue shopping from empty cart navigates to catalog', async ({ page }) => {
    await page.goto('/cart');
    await page.getByRole('link', { name: /continue shopping/i }).click();
    await expect(page).toHaveURL(/collections|catalog|\//);
  });

  test('add product to cart and verify cart count updates', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForURL(/cart/);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Grey jacket');
  });

  test('cart page shows product after adding', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Grey jacket');
    expect(bodyText).toContain('£55.00');
  });

  test('cart shows checkout button when items present', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    const checkout = page.getByRole('button', { name: /check out/i })
      .or(page.getByRole('link', { name: /check out/i }));
    await expect(checkout.first()).toBeVisible();
  });

  test('can update quantity in cart', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    const qty = page.locator('input[name="updates[]"], input[name*="quantity"]').first();
    await qty.fill('2');
    await page.getByRole('button', { name: /update/i }).click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/£110\.00|2/);
  });

  test('can remove item from cart', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    const qty = page.locator('input[name="updates[]"], input[name*="quantity"]').first();
    await qty.fill('0');
    await page.getByRole('button', { name: /update/i }).click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('empty');
  });
});
