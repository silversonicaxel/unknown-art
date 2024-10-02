import { expect } from '@playwright/test'

import { testHomePage as test } from './__e2e__/fixtures'


test.beforeEach(async ({ homePage }) => {
  await homePage.goto()
})

test.describe('src / app / [locale] > home', () => {
  test('check header existance', async ({ homePage }) => {
    expect(homePage.header.getElement()).toBeDefined()
    await expect(homePage.header.getElement()).toBeInViewport()

    expect(homePage.header.getLogo()).toBeDefined()
    await expect(homePage.header.getLogo()).toBeInViewport()
  })

  test('check navigation menu', async ({ homePage }) => {
    await expect(homePage.navigation.getElement()).toBeInViewport()

    expect(homePage.navigation.getMenu('')).toBeDefined()
    expect(homePage.navigation.getMenu('bookshops')).toBeDefined()
  })

  test('check locales menu', async ({ homePage }) => {
    await expect(homePage.locales.getElement()).toBeInViewport()

    expect(homePage.locales.getLanguage('en')).toBeDefined()
    expect(homePage.locales.getLanguage('it')).toBeDefined()
    expect(homePage.locales.getLanguage('zh')).toBeDefined()
  })

  /* eslint-disable max-len */
  test('all locale pages content', async ({ homePage }) => {
    await homePage.goto('it')
    await expect(homePage.getElement().getByRole('heading', { level: 1 })).toHaveText('unknown art')
    await expect(homePage.getElement().getByRole('paragraph').nth(0))
      .toHaveText('benvenuto caro lettore!')
    await expect(homePage.getElement().getByRole('paragraph').nth(1))
      .toHaveText('unknown art è il club che ti farà conoscere librerie artistiche ed indipendenti, in tutto il mondo.')
    await expect(homePage.getElement().getByRole('paragraph').nth(2))
      .toHaveText('unknown art è il mondo dove puoi, forse, entrare in contatto con persone, amanti, pensatori, menti o artisti, di tutto il nostro bellissimo mondo.')

    await homePage.goto('zh')
    await expect(homePage.getElement().getByRole('heading', { level: 1 })).toHaveText('unknown art')
    await expect(homePage.getElement().getByRole('paragraph').nth(0))
      .toHaveText('欢迎，亲爱的读者！')
    await expect(homePage.getElement().getByRole('paragraph').nth(1))
      .toHaveText('unknown art 是一个会让你了解全球艺术和独立书店的俱乐部。')
    await expect(homePage.getElement().getByRole('paragraph').nth(2))
      .toHaveText('unknown art 是一个你或许可以与来自我们美丽世界的各类人、爱好者、思想者、头脑或艺术家建立联系的世界。')

    await homePage.goto('en')
    await expect(homePage.getElement().getByRole('heading', { level: 1 })).toHaveText('unknown art')
    await expect(homePage.getElement().getByRole('paragraph').nth(0))
      .toHaveText('welcome dear reader!')
    await expect(homePage.getElement().getByRole('paragraph').nth(1))
      .toHaveText('unknown art is the club that will introduce you to arty and independent bookshops, all over the world.')
    await expect(homePage.getElement().getByRole('paragraph').nth(2))
      .toHaveText('unknown art is where you can, hopefully, connect with individuals, lovers, thinkers, minds or artists, all over the beautiful world.')
  })
  /* eslint-enable max-len */
})
