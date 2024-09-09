import { expect } from '@playwright/test'

import { testAppPage as test } from './__e2e__/fixtures'


test.beforeEach(async ({ appPage }) => {
  await appPage.goto()
})

test.describe('src / app / [locale] > app', () => {
  test('check header existance', async ({ appPage }) => {
    expect(appPage.header.getElement()).toBeDefined()
    expect(appPage.header.getElement()).toBeInViewport()

    expect(appPage.header.getLogo()).toBeDefined()
    expect(appPage.header.getLogo()).toBeInViewport()
  })

  test('check navigation menu', async ({ appPage }) => {
    expect(appPage.navigation.getElement()).toBeInViewport()

    expect(appPage.navigation.getMenu('')).toBeDefined()
    expect(appPage.navigation.getMenu('places')).toBeDefined()
  })

  test('check locales menu', async ({ appPage }) => {
    expect(appPage.locales.getElement()).toBeInViewport()

    expect(appPage.locales.getLanguage('en')).toBeDefined()
    expect(appPage.locales.getLanguage('it')).toBeDefined()
  })
})
