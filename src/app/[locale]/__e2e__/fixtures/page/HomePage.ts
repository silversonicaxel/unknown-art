import type { Locator } from '@playwright/test'
import { defaultLocale } from 'src/helpers/config/i18n'
import type { I18nLocale } from 'src/types/i18n'
import { BasePage } from 'tests/fixtures'


export class HomePage extends BasePage {
  async goto(locale: I18nLocale = defaultLocale): Promise<void> {
    await this.page.goto(`/${locale}`)
  }

  getElement(): Locator {
    return this.page.locator('main')
  }
}
