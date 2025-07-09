class NavPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout() {
    await this.menuButton.click();
    await this.page.waitForTimeout(500); // slight pause for animation
    await this.logoutLink.click();
  }
}

module.exports = { NavPage };
