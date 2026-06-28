# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page-load.spec.js >> Page Load & Performance >> no blocking console errors on homepage load
- Location: tests/page-load.spec.js:30:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  ["Failed to load resource: the server responded with a status of 503 ()"]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - search:
          - button "Submit" [ref=e6] [cursor=pointer]
          - textbox "Search" [ref=e7]
      - navigation [ref=e9]:
        - link "Search" [ref=e10] [cursor=pointer]:
          - /url: /search
        - link "About Us" [ref=e11] [cursor=pointer]:
          - /url: /pages/about-us
        - link "Log In" [ref=e12] [cursor=pointer]:
          - /url: /account/login
        - link "Sign up" [ref=e13] [cursor=pointer]:
          - /url: /account/register
      - generic [ref=e15]:
        - link "My Cart (0)" [ref=e16] [cursor=pointer]:
          - /url: "#"
        - link "Check Out" [ref=e17] [cursor=pointer]:
          - /url: /cart
    - generic [ref=e20]:
      - heading "Sauce Demo" [level=1] [ref=e22]:
        - link "Sauce Demo" [ref=e23] [cursor=pointer]:
          - /url: /
          - img "Sauce Demo" [ref=e24]
      - heading "Just a demo site showing off what Sauce can do." [level=3] [ref=e27]
  - generic [ref=e28]:
    - navigation [ref=e30]:
      - list [ref=e31]:
        - listitem [ref=e32]:
          - link "Home" [ref=e33] [cursor=pointer]:
            - /url: /
        - listitem [ref=e34]:
          - link "Catalog" [ref=e35] [cursor=pointer]:
            - /url: /collections/all
        - listitem [ref=e36]:
          - link "Blog" [ref=e37] [cursor=pointer]:
            - /url: /blogs/news
        - listitem [ref=e38]:
          - link "About Us" [ref=e39] [cursor=pointer]:
            - /url: /pages/about-us
        - listitem [ref=e40]:
          - link "Wish list" [ref=e41] [cursor=pointer]:
            - /url: "#sauce-show-wish-list"
        - listitem [ref=e42]:
          - link "Refer a friend" [ref=e43] [cursor=pointer]:
            - /url: "#sauce-show-refer-friend"
      - generic [ref=e44]:
        - link [ref=e45] [cursor=pointer]:
          - /url: http://www.facebook.com/shopify
        - link [ref=e46] [cursor=pointer]:
          - /url: http://www.twitter.com/sauce_io
        - link [ref=e47] [cursor=pointer]:
          - /url: http://www.instagram.com/shopify
        - link [ref=e48] [cursor=pointer]:
          - /url: http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/
        - link [ref=e49] [cursor=pointer]:
          - /url: /blogs/news.atom
    - generic [ref=e52]:
      - link "Grey jacket Grey jacket £55.00" [ref=e54] [cursor=pointer]:
        - /url: /collections/frontpage/products/grey-jacket
        - img "Grey jacket" [ref=e55]
        - heading "Grey jacket" [level=3] [ref=e56]
        - heading "£55.00" [level=4] [ref=e57]
      - link "Noir jacket Noir jacket £60.00" [ref=e59] [cursor=pointer]:
        - /url: /collections/frontpage/products/noir-jacket
        - img "Noir jacket" [ref=e60]
        - heading "Noir jacket" [level=3] [ref=e61]
        - heading "£60.00" [level=4] [ref=e62]
      - link "Striped top Striped top £50.00" [ref=e64] [cursor=pointer]:
        - /url: /collections/frontpage/products/striped-top
        - img "Striped top" [ref=e65]
        - heading "Striped top" [level=3] [ref=e66]
        - heading "£50.00" [level=4] [ref=e67]
    - contentinfo [ref=e68]:
      - generic [ref=e69]:
        - navigation [ref=e71]:
          - heading "Footer" [level=2] [ref=e72]
          - link "Search" [ref=e73] [cursor=pointer]:
            - /url: /search
          - link "About Us" [ref=e74] [cursor=pointer]:
            - /url: /pages/about-us
        - generic [ref=e76]:
          - heading "About Us" [level=2] [ref=e77]
          - paragraph [ref=e79]:
            - strong [ref=e80]:
              - text: This is a demo site created for
              - link "Sauce" [ref=e81] [cursor=pointer]:
                - /url: http://sauceapp.io
            - text: ", an awesome new way to make your Shopify site social. Sauce allows you to let customers to share what they purchase to their friends, and see what their friends have purchased or \"wanted\" on your store."
        - generic [ref=e83]:
          - img "We accept Amex" [ref=e84]
          - img "We accept Visa" [ref=e85]
          - img "We accept Mastercard" [ref=e86]
      - generic [ref=e87]:
        - generic [ref=e89]:
          - text: Copyright © 2026 Sauce Demo.
          - link "Shopping Cart by Shopify" [ref=e90] [cursor=pointer]:
            - /url: https://www.shopify.co.uk/tour/shopping-cart?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore
          - text: .
        - navigation [ref=e92]:
          - link "Search" [ref=e93] [cursor=pointer]:
            - /url: /search
          - link "About Us" [ref=e94] [cursor=pointer]:
            - /url: /pages/about-us
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Page Load & Performance', () => {
  4  |   test('homepage loads with HTTP 200', async ({ page }) => {
  5  |     const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  6  |     expect(response?.status()).toBeLessThan(400);
  7  |   });
  8  | 
  9  |   test('homepage has a title', async ({ page }) => {
  10 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  11 |     const title = await page.title();
  12 |     expect(title.length).toBeGreaterThan(0);
  13 |   });
  14 | 
  15 |   test('homepage body is visible and non-empty', async ({ page }) => {
  16 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  17 |     await expect(page.locator('body')).toBeVisible();
  18 |     const bodyText = await page.locator('body').innerText();
  19 |     expect(bodyText.length).toBeGreaterThan(0);
  20 |   });
  21 | 
  22 |   test('homepage loads within 15 seconds', async ({ page }) => {
  23 |     const start = Date.now();
  24 |     const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  25 |     const elapsed = Date.now() - start;
  26 |     expect(response?.status()).toBeLessThan(400);
  27 |     expect(elapsed).toBeLessThan(15000);
  28 |   });
  29 | 
  30 |   test('no blocking console errors on homepage load', async ({ page }) => {
  31 |     const errors = [];
  32 |     page.on('console', msg => {
  33 |       if (msg.type() === 'error') errors.push(msg.text());
  34 |     });
  35 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  36 |     await page.waitForLoadState('load');
  37 |     // Filter out known third-party noise
  38 |     const blockingErrors = errors.filter(e => !e.includes('favicon') && !e.includes('analytics'));
> 39 |     expect(blockingErrors).toHaveLength(0);
     |                            ^ Error: expect(received).toHaveLength(expected)
  40 |   });
  41 | });
  42 | 
```