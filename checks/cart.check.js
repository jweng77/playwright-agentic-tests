const { test, expect } = require('@playwright/test')

test('add to cart works', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/')
  const addToCart = page.locator('button:has-text("Add to cart"), button:has-text("Add to Cart")').first()
  await addToCart.waitFor({ state: 'visible' })
  await addToCart.click()
  await expect(page.locator('[data-cart-count], .cart-count, [aria-label*="cart"]').first()).toBeVisible()
})
