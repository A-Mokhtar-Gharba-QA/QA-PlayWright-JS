class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.getCartItemByName = (name) =>
      page.locator('.cart_item').filter({ hasText: name });
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async isItemInCart(itemName) {
    return await this.getCartItemByName(itemName).isVisible();
  }

  async removeItemFromCart(itemName) {
    await this.getCartItemByName(itemName)
      .locator('button:has-text("Remove")')
      .click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
