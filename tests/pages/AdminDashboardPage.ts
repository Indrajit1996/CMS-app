import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Admin Dashboard
 */
export class AdminDashboardPage {
  readonly page: Page
  readonly usersLink: Locator
  readonly mediaLink: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usersLink = page.locator('a[href*="/admin/collections/users"]').first()
    this.mediaLink = page.locator('a[href*="/admin/collections/media"]').first()
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")').first()
  }

  /**
   * Navigate to the admin dashboard
   */
  async goto() {
    await this.page.goto('/admin')
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Navigate to Users collection
   */
  async goToUsers() {
    if ((await this.usersLink.count()) > 0) {
      await this.usersLink.click()
      await this.page.waitForLoadState('networkidle')
    }
  }

  /**
   * Navigate to Media collection
   */
  async goToMedia() {
    if ((await this.mediaLink.count()) > 0) {
      await this.mediaLink.click()
      await this.page.waitForLoadState('networkidle')
    }
  }

  /**
   * Logout from admin
   */
  async logout() {
    if ((await this.logoutButton.count()) > 0) {
      await this.logoutButton.click()
      await this.page.waitForURL(/\/login|\//, { timeout: 5000 })
    }
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    const url = this.page.url()
    return !url.includes('/login') && url.includes('/admin')
  }
}
