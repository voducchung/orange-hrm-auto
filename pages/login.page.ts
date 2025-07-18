import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { BASE_URL } from "settings/settings";

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.getByRole('textbox', { name: 'username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'password', exact: false });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async inputUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async inputPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
    await this.page.waitForURL(`${BASE_URL}/dashboard/index`);
  }

  override async open() {
    await super.open('auth/login');
    await this.page.waitForURL(`${BASE_URL}/auth/login`);
  }
}
