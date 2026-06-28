const { test, expect } = require('@playwright/test');

test.describe('Blog', () => {
  test('blog listing page loads', async ({ page }) => {
    await page.goto('/blogs/news', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
  });

  test('blog listing shows at least one post', async ({ page }) => {
    await page.goto('/blogs/news', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('first post');
  });

  test('blog post link navigates to post', async ({ page }) => {
    await page.goto('/blogs/news', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /first post/i }).first().click();
    await expect(page).toHaveURL(/blogs\/news\/.+/);
  });

  test('blog post page loads with content', async ({ page }) => {
    await page.goto('/blogs/news/12832805-first-post', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('blog post shows title', async ({ page }) => {
    await page.goto('/blogs/news/12832805-first-post', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('first post');
  });
});
