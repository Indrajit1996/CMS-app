import { test, expect } from '@playwright/test'

test.describe('Collections', () => {
  test.describe('Users Collection', () => {
    test('should access users collection endpoint', async ({ request }) => {
      // Test the API endpoint for users collection
      const response = await request.get('/api/users')

      // Should return 200 or 401 (if authentication required)
      expect([200, 401, 403]).toContain(response.status())
    })
  })

  test.describe('Media Collection', () => {
    test('should access media collection endpoint', async ({ request }) => {
      // Test the API endpoint for media collection
      const response = await request.get('/api/media')

      // Should return 200 or 401 (if authentication required)
      expect([200, 401, 403]).toContain(response.status())
    })
  })

  test.describe('GraphQL API', () => {
    test('should have GraphQL endpoint available', async ({ request }) => {
      // Test GraphQL endpoint availability
      const response = await request.post('/api/graphql', {
        data: {
          query: '{ __schema { queryType { name } } }',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Should return 200, 400, or 401
      expect([200, 400, 401, 403]).toContain(response.status())
    })
  })
})
