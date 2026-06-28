const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/account/login', { waitUntil: 'domcontentloaded' });
    });

    test('login page loads', async ({ page }) => {
      await expect(page.locator('body')).toBeVisible();
    });

    test('email field is present', async ({ page }) => {
      await expect(page.locator('input[type="email"]').first()).toBeVisible();
    });

    test('password field is present', async ({ page }) => {
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
    });

    test('submit button is present', async ({ page }) => {
      await expect(page.locator('input[type="submit"], button[type="submit"]').first()).toBeVisible();
    });

    test('forgot password link is visible', async ({ page }) => {
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/forgot|reset/);
    });

    test('create account / sign up link is visible', async ({ page }) => {
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/create account|sign up/);
    });

    test('login with invalid credentials stays on login page', async ({ page }) => {
      // Fill and submit the login form - Shopify may show inline error or stay on page
      await page.locator('input[type="email"]').first().fill('invalid@test.com');
      await page.locator('input[type="password"]').first().fill('wrongpassword');
      await page.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForLoadState('load');
      // Should either stay on login page or show an error - not redirect to account
      expect(page.url()).not.toMatch(/account\/addresses|account\/orders/);
    });

    test('forgot password link shows reset form', async ({ page }) => {
      const forgotLink = page.locator('a[href*="recover"], a').filter({ hasText: /forgot/i });
      await forgotLink.first().click();
      await page.waitForLoadState('load');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/reset|recover|email/);
    });
  });

  test.describe('Register Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/account/register', { waitUntil: 'domcontentloaded' });
    });

    test('register page loads', async ({ page }) => {
      await expect(page.locator('body')).toBeVisible();
    });

    test('first name field is present', async ({ page }) => {
      await expect(page.locator('input[name="customer[first_name]"]').first()).toBeVisible();
    });

    test('last name field is present', async ({ page }) => {
      await expect(page.locator('input[name="customer[last_name]"]').first()).toBeVisible();
    });

    test('email field is present', async ({ page }) => {
      await expect(page.locator('input[type="email"]').first()).toBeVisible();
    });

    test('password field is present', async ({ page }) => {
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
    });
  });
});
