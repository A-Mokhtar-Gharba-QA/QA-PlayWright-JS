const { test, expect } = require('@playwright/test');
const { NavPage } = require('../pages/nav.page');
const { loginAsStandardUser } = require('../utils/testSetup');

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('@sanity @logout Logout returns user to login page', async ({ page }) => {
    const navPage = new NavPage(page);

    await navPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
