import { test, expect } from '@playwright/test';

const PRODUCTS = [
  { name: 'Grey jacket', url: '/collections/all/products/grey-jacket', price: '£55.00' },
  { name: 'Noir jacket', url: '/collections/all/products/noir-jacket', price: '£60.00' },
  { name: 'Striped top', url: '/collections/all/products/striped-top', price: '£50.00' },
  { name: 'Bronze sandals', url: '/collections/all/products/bronze-sandals', price: '£39.99' },
  { name: 'Black heels', url: '/collections/all/products/flower-print-jeans', price: '£45.00' },
];

test.describe('Product Detail Page', () => {
  for (const product of PRODUCTS) {
    test(`${product.name} - page loads`, async ({ page }) => {
      await page.goto(product.url);
      await expect(page.locator('body')).toBeVisible();
    });

    test(`${product.name} - name is displayed`, async ({ page }) => {
      await page.goto(product.url);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain(product.name);
    });

    test(`${product.name} - price is displayed`, async ({ page }) => {
      await page.goto(product.url);
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain(product.price);
    });
  }

  test('product page has Add to Cart button', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    const addToCart = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCart).toBeVisible();
  });

  test('product page has quantity selector', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    const qty = page.locator('input[name="quantity"], [id*="quantity"]');
    await expect(qty).toBeVisible();
  });

  test('product image is visible', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket');
    const img = page.locator('.product-single__photo, .product__photo, [class*="product"] img').first();
    await expect(img).toBeVisible();
  });

  test('sold out product does not show Add to Cart', async ({ page }) => {
    await page.goto('/collections/all/products/brown-shades');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('sold out');
    const addToCart = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCart).not.toBeVisible();
  });
});
