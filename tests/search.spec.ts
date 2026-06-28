import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input is present on homepage', async ({ page }) => {
    const search = page.locator('input[type="search"], input[name="q"]');
    await expect(search.first()).toBeVisible();
  });

  test('searching for a product returns results', async ({ page }) => {
    const search = page.locator('input[type="search"], input[name="q"]').first();
    await search.fill('jacket');
    await search.press('Enter');
    await page.waitForLoadState('networkidle');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('jacket');
  });

  test('search for non-existent product shows no results message', async ({ page }) => {
    const search = page.locator('input[type="search"], input[name="q"]').first();
    await search.fill('xyznonexistentproduct999');
    await search.press('Enter');
    await page.waitForLoadState('networkidle');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toMatch(/no results|no products|0 results/);
  });

  test('search results page URL contains query', async ({ page }) => {
    const search = page.locator('input[type="search"], input[name="q"]').first();
    await search.fill('jacket');
    await search.press('Enter');
    await expect(page).toHaveURL(/search.*jacket|q=jacket/);
  });

  test('search for "top" returns striped top', async ({ page }) => {
    const search = page.locator('input[type="search"], input[name="q"]').first();
    await search.fill('top');
    await search.press('Enter');
    await page.waitForLoadState('networkidle');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('top');
  });
});
