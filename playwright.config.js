const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',        // take screenshot if test fails
    video: 'retain-on-failure',           // record video only on failure
    trace: 'retain-on-failure',           // capture trace for step-by-step
  },
});
