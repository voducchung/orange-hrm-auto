import { Page } from "@playwright/test";
import { BASE_URL } from "settings/settings";

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string) {
    await this.page.goto(`${BASE_URL}/${url}`);
  }

  getCurrentUrl() {
    return this.page.url();
  }
}
