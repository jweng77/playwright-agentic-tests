const { test, expect } = require('@playwright/test');

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/collections/all', { waitUntil: 'domcontentloaded' });
  });

  test('catalog page loads successfully', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
  });

  test('products are displayed', async ({ page }) => {
    const products = page.locator('.product, [class*="product"], .grid-item, li.grid__item').first();
    await expect(products).toBeVisible();
  });

  test('all expected products are listed', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Grey jacket');
    expect(bodyText).toContain('Noir jacket');
    expect(bodyText).toContain('Striped top');
    expect(bodyText).toContain('Black heels');
    expect(bodyText).toContain('Bronze sandals');
  });

  test('products display prices', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/£\d+/);
  });

  test('sold out products are labelled', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('sold out');
  });

  test('clicking a product navigates to product detail page', async ({ page }) => {
    await page.getByRole('link', { name: /grey jacket/i }).first().click();
    await expect(page).toHaveURL(/grey-jacket/);
  });

  test('product images are visible', async ({ page }) => {
    const images = page.locator('.product img, [class*="product"] img, .grid__item img');
    await expect(images.first()).toBeVisible();
  });
});
