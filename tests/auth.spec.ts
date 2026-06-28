import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/account/login');
    });

    test('login page loads', async ({ page }) => {
      await expect(page.locator('body')).toBeVisible();
    });

    test('email field is present', async ({ page }) => {
      await expect(page.locator('input[type="email"], input[name="customer[email]"]')).toBeVisible();
    });

    test('password field is present', async ({ page }) => {
      await expect(page.locator('input[type="password"], input[name="customer[password]"]')).toBeVisible();
    });

    test('submit button is present', async ({ page }) => {
      const submit = page.getByRole('button', { name: /sign in|log in|submit/i })
        .or(page.locator('input[type="submit"]'));
      await expect(submit.first()).toBeVisible();
    });

    test('forgot password link is visible', async ({ page }) => {
      const forgot = page.getByRole('link', { name: /forgot|reset/i });
      await expect(forgot).toBeVisible();
    });

    test('create account link is visible', async ({ page }) => {
      const create = page.getByRole('link', { name: /create account/i });
      await expect(create).toBeVisible();
    });

    test('login with invalid credentials shows error', async ({ page }) => {
      await page.locator('input[type="email"], input[name="customer[email]"]').fill('invalid@test.com');
      await page.locator('input[type="password"], input[name="customer[password]"]').fill('wrongpassword');
      await page.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForLoadState('networkidle');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/incorrect|invalid|error|wrong/);
    });

    test('login with empty fields shows validation', async ({ page }) => {
      await page.locator('input[type="submit"], button[type="submit"]').first().click();
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/required|error|enter|invalid/);
    });

    test('forgot password link shows reset form', async ({ page }) => {
      await page.getByRole('link', { name: /forgot|reset/i }).click();
      const emailField = page.locator('input[type="email"]');
      await expect(emailField).toBeVisible();
    });
  });

  test.describe('Register Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/account/register');
    });

    test('register page loads', async ({ page }) => {
      await expect(page.locator('body')).toBeVisible();
    });

    test('first name field is present', async ({ page }) => {
      await expect(page.locator('input[name="customer[first_name]"], input[id*="first"]')).toBeVisible();
    });

    test('last name field is present', async ({ page }) => {
      await expect(page.locator('input[name="customer[last_name]"], input[id*="last"]')).toBeVisible();
    });

    test('email field is present', async ({ page }) => {
      await expect(page.locator('input[type="email"], input[name="customer[email]"]')).toBeVisible();
    });

    test('password field is present', async ({ page }) => {
      await expect(page.locator('input[type="password"], input[name="customer[password]"]')).toBeVisible();
    });

    test('register with existing email shows error', async ({ page }) => {
      await page.locator('input[name="customer[first_name]"]').fill('Test');
      await page.locator('input[name="customer[last_name]"]').fill('User');
      await page.locator('input[type="email"]').fill('test@example.com');
      await page.locator('input[type="password"]').fill('Password123');
      await page.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForLoadState('networkidle');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).toMatch(/already|error|taken|exists/);
    });
  });
});
