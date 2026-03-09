# E2E Testing with Playwright

This directory contains end-to-end tests for the CMS application using Playwright.

## Test Structure

```
tests/
├── e2e/                    # E2E test files
│   ├── homepage.spec.ts    # Homepage tests
│   ├── admin-panel.spec.ts # Admin panel tests
│   ├── collections.spec.ts # API collection tests
│   └── auth.spec.ts        # Authentication tests
├── utils/                  # Test utilities
│   └── test-helpers.ts     # Helper functions for tests
└── README.md              # This file
```

## Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# View test report
npm run test:e2e:report

# Generate test code using Codegen
npm run test:e2e:codegen
```

### Advanced Commands

```bash
# Run specific test file
npx playwright test tests/e2e/homepage.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests matching a pattern
npx playwright test --grep "should load"

# Run tests in parallel
npx playwright test --workers=4
```

## Test Configuration

The Playwright configuration is in [playwright.config.ts](../playwright.config.ts).

Key settings:
- **Base URL**: `http://localhost:3000`
- **Test directory**: `./tests/e2e`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Auto-start dev server**: Tests will automatically start the dev server if not running
- **Screenshots**: Captured on failure
- **Traces**: Captured on first retry

## Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test'

test('should display homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

### Using Test Helpers

```typescript
import { test } from '@playwright/test'
import { login, waitForPayload } from '../utils/test-helpers'

test('should login successfully', async ({ page }) => {
  await login(page, 'admin@example.com', 'password')
  await waitForPayload(page)
})
```

## Test Categories

### Homepage Tests (`homepage.spec.ts`)
- Page loads successfully
- Logo and branding displayed
- Links to admin panel and docs work
- File path reference shown

### Admin Panel Tests (`admin-panel.spec.ts`)
- Admin panel navigation
- Login page display
- Payload branding verification

### Collections Tests (`collections.spec.ts`)
- Users collection API endpoint
- Media collection API endpoint
- GraphQL API availability

### Authentication Tests (`auth.spec.ts`)
- Login form display
- Invalid login handling
- Logout functionality

## CI/CD Integration

To run tests in CI:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run test:e2e
```

## Debugging

### Debug Mode
Use debug mode to step through tests:
```bash
npm run test:e2e:debug
```

### UI Mode
Use UI mode for interactive debugging:
```bash
npm run test:e2e:ui
```

### View Trace
If a test fails, view the trace:
```bash
npx playwright show-trace trace.zip
```

### Screenshots
Failed test screenshots are saved to `test-results/`

## Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Wait for elements** before interacting
3. **Use page object models** for complex flows
4. **Keep tests independent** - don't rely on test order
5. **Clean up test data** after tests
6. **Use fixtures** for common setup/teardown
7. **Mock external services** when possible

## Troubleshooting

### Tests timeout
- Increase timeout in playwright.config.ts
- Check if dev server is running
- Verify database connection

### Elements not found
- Check selectors are correct
- Add explicit waits
- Verify page has loaded

### Flaky tests
- Add proper wait conditions
- Avoid time-based waits
- Use Playwright's auto-waiting features

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Best Practices](https://playwright.dev/docs/best-practices)
