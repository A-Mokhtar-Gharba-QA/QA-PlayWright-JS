const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { CheckoutPage } = require('../pages/checkout.page');
const { loginAsStandardUser } = require('../utils/testSetup');

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('@smoke @checkout Complete a checkout with valid info', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.goToCart();

    expect(await cartPage.isItemInCart(itemName)).toBe(true);

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();

    const successMsg = await checkoutPage.getSuccessMessage();
    expect(successMsg).toContain('Thank you for your order!');
  });
});
