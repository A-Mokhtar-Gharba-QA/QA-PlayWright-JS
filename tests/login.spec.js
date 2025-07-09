const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const testData = require('../data/users.json');

testData.forEach(({ scenario, username, password, expectedUrl, expectedError }) => {
  test(`Login test: ${scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    if (expectedUrl) {
      await expect(page).toHaveURL(expectedUrl);
    }

    if (expectedError) {
      const error = await loginPage.getErrorMessage();
      expect(error).toContain(expectedError);
    }
  });
});
