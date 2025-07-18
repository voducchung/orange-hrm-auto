import { test as setup } from "fixtures/fixtures";
import { ADMIN_PASSWORD, ADMIN_USERNAME, SESSION_FILE_PATH } from "settings/settings";

setup('Login in advance', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
  await page.context().storageState({ path: SESSION_FILE_PATH });
});
