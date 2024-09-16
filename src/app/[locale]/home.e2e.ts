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
      .toHaveText('unknown art è il mondo dove puoi entrare in contatto con persone, amanti, pensatori, menti o artisti, di tutto il nostro bellissimo mondo.')

    await homePage.goto('zh')
    await expect(homePage.getElement().getByRole('heading', { level: 1 })).toHaveText('unknown art')
    await expect(homePage.getElement().getByRole('paragraph').nth(0))
      .toHaveText('欢迎，亲爱的读者！')
    await expect(homePage.getElement().getByRole('paragraph').nth(1))
      .toHaveText('unknown art 是一个让你了解全球艺术性和独立书店的地方。')
    await expect(homePage.getElement().getByRole('paragraph').nth(2))
      .toHaveText('unknown art 是一个可以让你与全世界的个体，爱人，思想者，智者或艺术家相连的平台，连接这个美丽世界的每一个角落。')

    await homePage.goto('en')
    await expect(homePage.getElement().getByRole('heading', { level: 1 })).toHaveText('unknown art')
    await expect(homePage.getElement().getByRole('paragraph').nth(0))
      .toHaveText('welcome dear reader!')
    await expect(homePage.getElement().getByRole('paragraph').nth(1))
      .toHaveText('unknown art is the club that will introduce you to arty and independent bookshops, all over the world.')
    await expect(homePage.getElement().getByRole('paragraph').nth(2))
      .toHaveText('unknown art is where you can connect with individuals, lovers, thinkers, minds or artists, all over this beautiful world.')
  })
  /* eslint-enable max-len */
})
