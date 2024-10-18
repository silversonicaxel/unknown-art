import { test } from '@playwright/test'
import { HomePage } from '../page/HomePage'


export const testHomePage = test.extend<{ homePage: HomePage }>({
  async homePage({ page }, use) {
    const homePage = new HomePage(page)
    /* eslint-disable react-hooks/rules-of-hooks */
    await use(homePage)
    /* eslint-enable */
  }
})
