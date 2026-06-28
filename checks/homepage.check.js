const { test, expect } = require('@playwright/test')

test('homepage loads', async ({ page }) => {
  const response = await page.goto('https://sauce-demo.myshopify.com/')
  expect(response.status()).toBeLessThan(400)
  await expect(page).toHaveTitle(/Sauce Demo/)
  await expect(page.locator('h1, h2').first()).toBeVisible()
})
