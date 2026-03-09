import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check for the welcome message
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('should display Payload logo', async ({ page }) => {
    await page.goto('/')

    // Check that the logo image is visible
    const logo = page.locator('img[alt="Payload Logo"]')
    await expect(logo).toBeVisible()
  })

  test('should have link to admin panel', async ({ page }) => {
    await page.goto('/')

    // Check for admin panel link
    const adminLink = page.locator('a.admin')
    await expect(adminLink).toBeVisible()
    await expect(adminLink).toHaveAttribute('href', '/admin')
  })

  test('should have link to documentation', async ({ page }) => {
    await page.goto('/')

    // Check for documentation link
    const docsLink = page.locator('a.docs')
    await expect(docsLink).toBeVisible()
    await expect(docsLink).toHaveAttribute('href', 'https://payloadcms.com/docs')
  })

  test('should display file path reference', async ({ page }) => {
    await page.goto('/')

    // Check for code reference
    const codeLink = page.locator('a.codeLink code')
    await expect(codeLink).toContainText('app/(frontend)/page.tsx')
  })
})
