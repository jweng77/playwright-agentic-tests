const { test, expect } = require('@playwright/test');

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
      await page.goto(product.url, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
    });

    test(`${product.name} - name is displayed`, async ({ page }) => {
      await page.goto(product.url, { waitUntil: 'domcontentloaded' });
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain(product.name);
    });

    test(`${product.name} - price is displayed`, async ({ page }) => {
      await page.goto(product.url, { waitUntil: 'domcontentloaded' });
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).toContain(product.price);
    });
  }

  test('product page has Add to Cart button', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    const addToCart = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCart).toBeVisible();
  });

  test('product page has quantity selector', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    const html = await page.content();
    expect(html.toLowerCase()).toMatch(/quantity|qty/);
  });

  test('product image is visible', async ({ page }) => {
    await page.goto('/collections/all/products/grey-jacket', { waitUntil: 'domcontentloaded' });
    const img = page.locator('.product-single__photo, .product__photo, [class*="product"] img').first();
    await expect(img).toBeVisible();
  });

  test('sold out product shows sold out in page source', async ({ page }) => {
    await page.goto('/collections/all/products/brown-shades', { waitUntil: 'domcontentloaded' });
    // "sold out" may appear in button class/value not visible text
    const html = await page.content();
    expect(html.toLowerCase()).toMatch(/sold.out|soldout|unavailable/);
  });
});
