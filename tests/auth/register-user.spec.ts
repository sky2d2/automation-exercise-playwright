// tests/auth/register-user.spec.ts
import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { generateUser } from '../../utils/dataGenerator';

test.describe('User Registration Flow', () => {
  let signupLoginPage: SignupLoginPage;
  let accountPage: AccountPage;
  let userData: ReturnType<typeof generateUser>;

  test.beforeEach(async ({ page }) => {
    signupLoginPage = new SignupLoginPage(page);
    accountPage = new AccountPage(page);
    userData = generateUser();
    await signupLoginPage.gotoLoginPage();
  });

  test('TC1: Register new user successfully', async ({ page }) => {
    await signupLoginPage.signup(userData.name, userData.email);
    await expect(page.locator('text=Enter Account Information')).toBeVisible();

    await accountPage.fillAccountInformation(userData);
    await accountPage.fillAddressInformation(userData);
    await accountPage.submitAccountCreation();
    await accountPage.assertAccountCreated();
    await accountPage.clickContinue();

    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();

    // Cleanup
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();
    await accountPage.clickContinue();
  });
});
