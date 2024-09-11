import { expect } from '@playwright/test'

import { testHomePage as test } from './__e2e__/fixtures'


test.beforeEach(async ({ homePage }) => {
  await homePage.goto()
})

test.describe('src / app / [locale] > home', () => {
  test('check header existance', async ({ homePage }) => {
    expect(homePage.header.getElement()).toBeDefined()
    expect(homePage.header.getElement()).toBeInViewport()

    expect(homePage.header.getLogo()).toBeDefined()
    expect(homePage.header.getLogo()).toBeInViewport()
  })

  test('check navigation menu', async ({ homePage }) => {
    expect(homePage.navigation.getElement()).toBeInViewport()

    expect(homePage.navigation.getMenu('')).toBeDefined()
    expect(homePage.navigation.getMenu('places')).toBeDefined()
  })

  test('check locales menu', async ({ homePage }) => {
    expect(homePage.locales.getElement()).toBeInViewport()

    expect(homePage.locales.getLanguage('en')).toBeDefined()
    expect(homePage.locales.getLanguage('it')).toBeDefined()
  })
})