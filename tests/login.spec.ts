import { test } from "fixtures/fixtures";
import { ADMIN_PASSWORD, ADMIN_USERNAME, BASE_URL } from "settings/settings";

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Verify user can login successfully with exact username and password', {
    tag: ['@regression']
  }, async ({ loginPage, page }) => {
    const username = ADMIN_USERNAME;
    const password = ADMIN_PASSWORD;

    await test.step('Enter username', async () => {
      await loginPage.inputUsername(username);
    });

    await test.step('Enter password', async () => {
      await loginPage.inputPassword(password);
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('User should login successfully and be redirected to Dashboard', async () => {
      await page.waitForURL(`${BASE_URL}/dashboard/index`);
    });
  })
})
