import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { BASE_URL } from "settings/settings";

export class ViewSystemUsersPage extends BasePage {
  private usernameInput: Locator;
  private roleSelect: Locator;
  private employeeNameInput: Locator;
  private statusSelect: Locator;
  private searchButton: Locator;
  private recordsFoundText: Locator;
  private userRow: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.getByRole('textbox').nth(1);
    this.roleSelect = this.page.locator('.oxd-select-text').nth(0);
    this.employeeNameInput = this.page.getByRole('textbox', { name: 'Type for hints' });
    this.statusSelect = this.page.locator('.oxd-select-text').nth(1);
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
    this.recordsFoundText = this.page.locator('.orangehrm-horizontal-padding');
    this.userRow = this.page.getByRole('row');
  }

  async inputUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async selectRole(role: string) {
    await this.roleSelect.click();
    await this.roleSelect.getByRole('option', { name: role }).click();
  }

  async inputEmployeeName(employeeName: string) {
    await this.employeeNameInput.fill(employeeName);
  }

  async selectStatus(status: string) {
    await this.statusSelect.click();
    await this.statusSelect.getByRole('option', { name: status }).click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async getRecordsFoundText() {
    return await this.recordsFoundText.innerText();
  }

  async getRecordsCount() {
    return (await this.page.getByRole('row').all()).length;
  }

  async getUsersFromUI() {
    const userRows = await this.userRow.all();
    const users = [];
    for (let i = 1; i < userRows.length; i++) { // start from 1 as the first row is the header row but not data row
      users.push({
        username: await userRows[i].getByRole('cell').nth(1).innerText(),
        role: await userRows[i].getByRole('cell').nth(2).innerText(),
        employeeName: await userRows[i].getByRole('cell').nth(3).innerText(),
        status: await userRows[i].getByRole('cell').nth(4).innerText(),
      });
    }

    return users;
  }

  async waitForDataLoaded() {
    const getUserRequest = await this.page.waitForRequest(req => req.url().includes('/api/v2/admin/users'));
    const getUserResponse = await getUserRequest.response();
    const usersData = await getUserResponse.json();

    return {
      users: usersData.data.map(user => {
        return {
          username: user.userName,
          role: user.userRole.displayName,
          employeeName: `${user.employee.firstName} ${user.employee.lastName}`,
          status: user.status ? 'Enabled' : 'Disabled',
        }
      }),
      meta: usersData.meta,
    };
  }

  override async open() {
    await super.open('admin/viewSystemUsers');
    await this.page.waitForURL(`${BASE_URL}/admin/viewSystemUsers`);
  }
}
