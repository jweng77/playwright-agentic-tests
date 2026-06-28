# Playwright Agentic Tests

Automated test suite for [sauce-demo.myshopify.com](https://sauce-demo.myshopify.com/) using Playwright for functional testing and k6 for load testing.

## Live Report

📊 **[View Allure Report](https://jweng77.github.io/playwright-agentic-tests/)** — updated automatically after every CI run, including screenshots, videos, and historical trends.

## CI Status

![CI](https://github.com/jweng77/playwright-agentic-tests/actions/workflows/playwright.yml/badge.svg)

## Test Coverage

| Suite | File | Tests |
|---|---|---|
| Page Load & Performance | `tests/page-load.spec.js` | 5 |
| Navigation | `tests/navigation.spec.js` | 7 |
| Product Catalog | `tests/catalog.spec.js` | 7 |
| Product Detail | `tests/product-detail.spec.js` | 18 |
| Shopping Cart | `tests/cart.spec.js` | 7 |
| Checkout Journey | `tests/checkout.spec.js` | 3 |
| Search | `tests/search.spec.js` | 5 |
| Authentication | `tests/auth.spec.js` | 12 |
| Blog | `tests/blog.spec.js` | 5 |
| About Us & Footer | `tests/about.spec.js` | 6 |
| **Total** | | **77 tests** |

## Stack

- **[Playwright](https://playwright.dev/)** — functional end-to-end tests running in Chromium
- **[k6](https://k6.io/)** — load test with 5 virtual users for 30 seconds
- **[Allure](https://allurereport.org/)** — rich HTML reporting with screenshots, videos, and trend history
- **GitHub Actions** — CI pipeline; k6 runs only after all functional tests pass
- **GitHub Pages** — hosts the live Allure report

## Project Structure

```
├── tests/
│   ├── global.setup.js       # Suite start timer
│   ├── global.teardown.js    # Suite duration log
│   ├── page-load.spec.js
│   ├── navigation.spec.js
│   ├── catalog.spec.js
│   ├── product-detail.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── search.spec.js
│   ├── auth.spec.js
│   ├── blog.spec.js
│   └── about.spec.js
├── k6/
│   └── homepage-load.js      # k6 load test
├── .github/workflows/
│   └── playwright.yml        # CI pipeline
└── playwright.config.js
```

## Running Locally

**Install dependencies:**
```bash
npm install
npx playwright install chromium
```

**Run all tests:**
```bash
npx playwright test
```

**Run a specific suite:**
```bash
npx playwright test tests/cart.spec.js
```

**View Allure report locally:**
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

**Run k6 load test:**
```bash
k6 run k6/homepage-load.js
```

## CI Pipeline

```
push to main
    │
    ▼
Playwright Tests (4 parallel workers)
    │  ✓ all 77 functional tests pass
    ▼
k6 Load Test (5 VUs × 30s)
    │
    ▼
Allure Report → GitHub Pages
```

The Allure report captures:
- ✅ Screenshot of every test (pass and fail)
- 🎥 Video recording of every test
- 🔍 Playwright trace for debugging
- 📈 Historical trend across all runs
