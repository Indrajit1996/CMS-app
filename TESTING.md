# Testing Guide

This project uses [Playwright](https://playwright.dev) for end-to-end testing.

## Quick Start

### First Time Setup

```bash
# Install dependencies (already done)
npm install

# Install Playwright browsers (already done)
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm run test:e2e

# Run with UI (recommended for development)
npm run test:e2e:ui

# Run in headed mode (see the browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug
```

## Test Files

All tests are located in the `tests/` directory:

```
tests/
├── e2e/
│   ├── homepage.spec.ts      - Homepage tests
│   ├── admin-panel.spec.ts   - Admin panel tests
│   ├── collections.spec.ts   - API collection tests
│   ├── auth.spec.ts          - Authentication tests
│   └── auth-flow.spec.ts     - Advanced auth flow with POM
├── pages/
│   ├── AdminLoginPage.ts     - Login page object
│   └── AdminDashboardPage.ts - Dashboard page object
└── utils/
    └── test-helpers.ts       - Test utility functions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run all tests in headless mode |
| `npm run test:e2e:ui` | Run tests with interactive UI |
| `npm run test:e2e:headed` | Run tests with visible browser |
| `npm run test:e2e:debug` | Debug tests with Playwright Inspector |
| `npm run test:e2e:report` | View HTML test report |
| `npm run test:e2e:codegen` | Generate test code by recording actions |

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test('test description', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

### Using Page Object Model

```typescript
import { AdminLoginPage } from '../pages/AdminLoginPage'

test('login test', async ({ page }) => {
  const loginPage = new AdminLoginPage(page)
  await loginPage.goto()
  await loginPage.login('user@example.com', 'password')
})
```

### API Testing

```typescript
test('api test', async ({ request }) => {
  const response = await request.get('/api/users')
  expect(response.status()).toBe(200)
})
```

## CI/CD

Tests run automatically on:
- Push to `main`, `master`, or `develop` branches
- Pull requests to these branches

GitHub Actions workflow: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

## Test Reports

After running tests:
- HTML Report: `playwright-report/index.html`
- Test Results: `test-results/`
- Screenshots: Captured on failures
- Videos: Captured on failures (if configured)

View the report:
```bash
npm run test:e2e:report
```

## Debugging Failed Tests

1. **Run in UI mode:**
   ```bash
   npm run test:e2e:ui
   ```

2. **Run in debug mode:**
   ```bash
   npm run test:e2e:debug
   ```

3. **View traces:**
   ```bash
   npx playwright show-trace test-results/path-to-trace.zip
   ```

## Configuration

Main config: [playwright.config.ts](playwright.config.ts)

Key settings:
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Base URL**: http://localhost:3000
- **Screenshots**: On failure
- **Traces**: On first retry
- **Timeout**: 30 seconds per test

## Best Practices

1. Use data-testid for stable selectors
2. Avoid hard-coded waits (use Playwright's auto-waiting)
3. Keep tests independent
4. Use Page Object Model for complex flows
5. Clean up test data
6. Use descriptive test names

## Troubleshooting

### Tests fail locally but pass in CI

- Check Node.js version matches
- Verify environment variables
- Check database state

### Flaky tests

- Add explicit wait conditions
- Use Playwright's built-in waiting mechanisms
- Check for race conditions

### Slow tests

- Run tests in parallel: `npx playwright test --workers=4`
- Optimize selectors
- Mock external services

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)
- [Payload CMS Docs](https://payloadcms.com/docs)

## Getting Help

For questions about:
- **Playwright**: See [Playwright docs](https://playwright.dev)
- **Tests**: Check [tests/README.md](tests/README.md)
- **CMS**: See [Payload documentation](https://payloadcms.com/docs)
