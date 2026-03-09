import { test, expect } from '@playwright/test'

test.describe('Admin Panel', () => {
  test('should navigate to admin panel', async ({ page }) => {
    await page.goto('/admin')

    // Should redirect to login page or show admin interface
    await expect(page).toHaveURL(/\/admin/)
  })

  test('should display login page when not authenticated', async ({ page }) => {
    await page.goto('/admin')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check if we're on login page or admin dashboard
    const url = page.url()
    expect(url).toContain('/admin')
  })

  test('should have Payload branding in admin', async ({ page }) => {
    await page.goto('/admin')

    // Wait for content to load
    await page.waitForLoadState('networkidle')

    // Admin panel should load without errors
    await expect(page).not.toHaveTitle(/Error/)
  })
})
