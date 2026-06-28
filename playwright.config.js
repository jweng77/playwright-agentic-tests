// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: './tests/global.setup.js',
  globalTeardown: './tests/global.teardown.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    ['list', { printSteps: true }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
  ],
  use: {
    baseURL: 'https://sauce-demo.myshopify.com/',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    navigationTimeout: 15000,
    actionTimeout: 10000,
    waitForNavigation: 'domcontentloaded',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
