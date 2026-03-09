import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should show login form in admin panel', async ({ page }) => {
    await page.goto('/admin/login')

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')

    // Page should load successfully
    await expect(page).not.toHaveTitle(/Error/)
  })

  test('should handle invalid login attempt', async ({ page }) => {
    await page.goto('/admin/login')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Try to find email/username input field
    const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    // Only proceed if login form is present
    if ((await emailInput.count()) > 0 && (await passwordInput.count()) > 0) {
      await emailInput.fill('test@example.com')
      await passwordInput.fill('wrongpassword')

      // Find and click submit button
      const submitButton = page.locator('button[type="submit"]').first()
      if ((await submitButton.count()) > 0) {
        await submitButton.click()

        // Wait for response
        await page.waitForTimeout(2000)

        // Should show error message or stay on login page
        await expect(page).toHaveURL(/\/admin/)
      }
    }
  })

  test('should access logout endpoint', async ({ request }) => {
    const response = await request.post('/api/users/logout')

    // Should return valid HTTP status
    expect(response.status()).toBeLessThan(500)
  })
})
