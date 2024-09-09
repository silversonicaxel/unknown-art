import { BasePage } from 'src/tests/playwright/fixtures'


export class AppPage extends BasePage {
  async goto(): Promise<void> {
    await this.page.goto('/')
  }
}
