import { BasePage } from '../../../../../../tests/fixtures'


export class HomePage extends BasePage {
  async goto(): Promise<void> {
    await this.page.goto('/')
  }
}
