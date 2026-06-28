import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo is visible', async ({ page }) => {
    await expect(page.locator('#logo, .logo, [class*="logo"]').first()).toBeVisible();
  });

  test('navigation links are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /catalog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about us/i })).toBeVisible();
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

  test('Create account link navigates to register page', async ({ page }) => {
    await page.getByRole('link', { name: /create account/i }).first().click();
    await expect(page).toHaveURL(/account\/register/);
  });

  test('cart icon is visible in header', async ({ page }) => {
    await expect(page.locator('[href*="/cart"], #cartCount, .cart').first()).toBeVisible();
  });
});
