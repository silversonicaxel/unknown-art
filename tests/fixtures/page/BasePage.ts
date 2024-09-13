import type { Locator, Page } from 'playwright/test'


export class BasePage {
  constructor(
    public readonly page: Page,
    public readonly header: Header = new Header(page),
    public readonly navigation: Navigation = new Navigation(page),
    public readonly locales: Locales = new Locales(page),
  ) {}
}

class Header {
  constructor(
    private readonly page: Page,
  ) {}

  getElement(): Locator {
    return this.page.locator('header')
  }

  getLogo(): Locator {
    return this.getElement().getByRole('navigation', { name: /main logo/i })
  }
}

class Navigation {
  constructor(
    private readonly page: Page,
  ) {}

  getElement(): Locator {
    return this.page.getByRole('menubar', { name: /menu/i })
  }

  getMenu(href: string) {
    return this.getElement().locator(`a[href*="/${href}"]`)
  }
}

class Locales {
  constructor(
    private readonly page: Page,
  ) {}

  getElement(): Locator {
    return this.page.getByRole('menubar', { name: /language navigation/i })
  }

  getLanguage(language: string) {
    return this.getElement().locator(`a[href*="/${language}"]`)
  }
}
