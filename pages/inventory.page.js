class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inventoryItem = (itemName) =>
      page.locator(`.inventory_item:has-text("${itemName}")`);
    this.addToCartButton = (itemName) =>
      this.inventoryItem(itemName).locator('button:has-text("Add to cart")');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart(itemName) {
    await this.addToCartButton(itemName).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}

module.exports = { InventoryPage };
