import { BasePage } from 'src/tests/playwright/fixtures'


export class HomePage extends BasePage {
  async goto(): Promise<void> {
    await this.page.goto('/')
  }
}
