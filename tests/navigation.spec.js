const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('navigation links are visible', async ({ page }) => {
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Home');
    expect(bodyText).toContain('Catalog');
    expect(bodyText).toContain('Blog');
    expect(bodyText).toContain('About Us');
  });

  test('Catalog link navigates to collections page', async ({ page }) => {
    await page.getByRole('link', { name: /catalog/i }).first().click();
    await expect(page).toHaveURL(/collections/);
  });

  test('Blog link navigates to blog page', async ({ page }) => {
    await page.getByRole('link', { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/blogs/);
  });

  test('About Us link navigates to about page', async ({ page }) => {
    await page.getByRole('link', { name: /about us/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  test('Login link navigates to login page', async ({ page }) => {
    await page.getByRole('link', { name: /login|log in/i }).first().click();
    await expect(page).toHaveURL(/account\/login/);
  });

  test('Create account / sign up link navigates to register page', async ({ page }) => {
    await page.getByRole('link', { name: /create account|sign up/i }).first().click();
    await expect(page).toHaveURL(/account\/register/);
  });

  test('cart link is present in header', async ({ page }) => {
    const html = await page.content();
    expect(html).toContain('/cart');
  });
});
