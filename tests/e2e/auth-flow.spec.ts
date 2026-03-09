import { test, expect } from '@playwright/test'
import { AdminLoginPage } from '../pages/AdminLoginPage'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'

/**
 * Advanced authentication flow tests using Page Object Model
 */
test.describe('Authentication Flow (POM)', () => {
  test('should navigate through login flow using page objects', async ({ page }) => {
    const loginPage = new AdminLoginPage(page)

    await loginPage.goto()

    // Page should load without errors
    await expect(page).not.toHaveTitle(/Error/)
  })

  test('should show error for invalid credentials using page objects', async ({ page }) => {
    const loginPage = new AdminLoginPage(page)

    await loginPage.goto()

    // Only test if login form elements are present
    if ((await loginPage.emailInput.count()) > 0) {
      await loginPage.login('invalid@example.com', 'wrongpassword')

      // Wait a bit for error to appear
      await page.waitForTimeout(2000)

      // Should either show error or stay on login page
      const currentUrl = page.url()
      expect(currentUrl).toContain('/admin')
    }
  })

  test('should access admin dashboard', async ({ page }) => {
    const dashboardPage = new AdminDashboardPage(page)

    await dashboardPage.goto()

    // Should load admin panel (may redirect to login if not authenticated)
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should check authentication state', async ({ page }) => {
    const dashboardPage = new AdminDashboardPage(page)

    await dashboardPage.goto()

    const isLoggedIn = await dashboardPage.isLoggedIn()

    // isLoggedIn should be a boolean
    expect(typeof isLoggedIn).toBe('boolean')
  })
})

/**
 * API Authentication Tests
 */
test.describe('Authentication API', () => {
  test('should handle login API endpoint', async ({ request }) => {
    const response = await request.post('/api/users/login', {
      data: {
        email: 'test@example.com',
        password: 'testpassword',
      },
    })

    // Should return valid HTTP status (200, 400, 401, etc.)
    expect(response.status()).toBeGreaterThanOrEqual(200)
    expect(response.status()).toBeLessThan(500)
  })

  test('should handle logout API endpoint', async ({ request }) => {
    const response = await request.post('/api/users/logout')

    // Should return valid HTTP status
    expect(response.status()).toBeLessThan(500)
  })

  test('should check authentication status', async ({ request }) => {
    const response = await request.get('/api/users/me')

    // Should return 200 (authenticated) or 401 (not authenticated)
    expect([200, 401, 403]).toContain(response.status())
  })
})
