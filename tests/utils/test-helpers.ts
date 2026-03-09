import { Page } from '@playwright/test'

/**
 * Helper function to create a test user
 */
export async function createTestUser(page: Page, email: string, password: string) {
  await page.goto('/admin')

  // Navigate to user creation if available
  // This is a placeholder - adjust based on your Payload admin UI
  const createButton = page.locator('text=Create New')
  if ((await createButton.count()) > 0) {
    await createButton.click()
  }
}

/**
 * Helper function to login
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('/admin/login')

  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')

  // Wait for navigation after login
  await page.waitForURL(/\/admin/, { timeout: 10000 })
}

/**
 * Helper function to logout
 */
export async function logout(page: Page) {
  await page.goto('/admin/logout')
}

/**
 * Helper to check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  await page.goto('/admin')

  // If redirected to login, not authenticated
  const url = page.url()
  return !url.includes('/login')
}

/**
 * Wait for Payload to be ready
 */
export async function waitForPayload(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1000) // Additional buffer for Payload initialization
}
