import test from '@playwright/test'

import { AppPage } from '../page/AppPage'


export const testAppPage = test.extend<{ appPage: AppPage }>({
  async appPage({ page }, use) {
    const appPage = new AppPage(page)
    await use(appPage)
  }
})
