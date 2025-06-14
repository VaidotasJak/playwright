// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:40*1000,
  expect: {
    timeout: 5000,
  },
  reporter:'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  }

});

