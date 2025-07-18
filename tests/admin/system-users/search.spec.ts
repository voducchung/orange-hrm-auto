import { expect, test } from "fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { SESSION_FILE_PATH } from "settings/settings";

test.describe('Admin - System Users - Search', () => {
  test.use({
    storageState: SESSION_FILE_PATH,
  });

  test('Verify admin can search for users by username - exact match', async ({ viewSystemUsersPage }) => {
    test.slow();

    let usersDataFromBE: any;
    let usersFromBE: any;
    let randomUser: any;

    await test.step('Open view system users page', async () => {
      await viewSystemUsersPage.open();

      usersDataFromBE = await viewSystemUsersPage.waitForDataLoaded();
      usersFromBE = usersDataFromBE.users;
      randomUser = faker.helpers.shuffle(usersFromBE)[0];
    });

    await test.step('Enter exact username', async () => {
      await viewSystemUsersPage.inputUsername(randomUser.username);
    });

    await test.step('Click Search button', async () => {
      await viewSystemUsersPage.clickSearchButton();

      usersDataFromBE = await viewSystemUsersPage.waitForDataLoaded();
      usersFromBE = usersDataFromBE.users;
    });

    await test.step('Verify only matched user should be displayed', async () => {
      const usersFromFE = await viewSystemUsersPage.getUsersFromUI();

      expect(usersFromBE).toEqual(usersFromFE);
    });
  })
})
