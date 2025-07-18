import { test as base } from '@playwright/test';
import { ViewSystemUsersPage } from "pages/admin/view-system-users.page";
import { LoginPage } from "pages/login.page"

type PagesFixture = {
  loginPage: LoginPage;
  viewSystemUsersPage: ViewSystemUsersPage;
}

export const test = base.extend<PagesFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  viewSystemUsersPage: async ({ page }, use) => {
    const viewSystemUsersPage = new ViewSystemUsersPage(page);
    await use(viewSystemUsersPage);
  },
});

export { expect } from '@playwright/test';
