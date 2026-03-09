import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Admin Login Page
 * This provides a reusable abstraction for the login page
 */
export class AdminLoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[type="email"], input[name="email"]').first()
    this.passwordInput = page.locator('input[type="password"]').first()
    this.submitButton = page.locator('button[type="submit"]').first()
    this.errorMessage = page.locator('.error, [role="alert"]').first()
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/admin/login')
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Perform login action
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  /**
   * Check if error message is displayed
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible()
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || ''
  }

  /**
   * Wait for successful login redirect
   */
  async waitForLoginSuccess() {
    await this.page.waitForURL(/\/admin(?!\/login)/, { timeout: 10000 })
  }
}
