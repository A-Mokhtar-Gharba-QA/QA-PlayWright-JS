const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { loginAsStandardUser } = require('../utils/testSetup');

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('@regression Add item and verify it appears in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.goToCart();

    expect(await cartPage.isItemInCart(itemName)).toBe(true);
  });

  test('@regression Add and remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.goToCart();

    expect(await cartPage.isItemInCart(itemName)).toBe(true);

    await cartPage.removeItemFromCart(itemName);
    expect(await cartPage.isItemInCart(itemName)).toBe(true); // "true" in order to fail the test
  });
});
