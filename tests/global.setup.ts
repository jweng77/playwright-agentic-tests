import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log(`\n🚀 Test suite started at ${new Date().toISOString()}`);
  (global as any).__suiteStart = Date.now();
}

export default globalSetup;
