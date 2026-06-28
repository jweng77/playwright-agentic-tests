const { test, expect } = require('@playwright/test')

test('product catalog loads', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/collections/all')
  await expect(page.locator('.product-card, .product-item, article').first()).toBeVisible()
})
