// tests/auth/login-logout.spec.ts
import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { generateUser } from '../../utils/dataGenerator';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Login and Logout Flow', () => {
  let signupLoginPage: SignupLoginPage;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    signupLoginPage = new SignupLoginPage(page);
    accountPage = new AccountPage(page);
  });

  test('TC2: Login with valid credentials and logout', async ({ page }) => {
    const userData = generateUser();

    // --- Register new user ---
    await signupLoginPage.gotoLoginPage();
    await signupLoginPage.signup(userData.name, userData.email);
    await page.locator('text=Enter Account Information').waitFor({ state: 'visible', timeout: 15000 });

    await accountPage.fillAccountInformation(userData);
    await accountPage.fillAddressInformation(userData);
    await accountPage.submitAccountCreation();
    await accountPage.assertAccountCreated();
    await accountPage.clickContinue();

    // --- Logout ---
    await signupLoginPage.logout();
    await expect(page).toHaveURL(/.*login/);

    // --- Login back ---
    await signupLoginPage.login(userData.email, userData.password);
    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();

    // --- Cleanup ---
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();
    await accountPage.clickContinue();
  });

  test('TC3: Login with invalid credentials', async ({ page }) => {
    await signupLoginPage.gotoLoginPage();
    await signupLoginPage.login('invalid@test.com', 'wrongpassword');

    await page.locator('text=Your email or password is incorrect!').waitFor({ state: 'visible', timeout: 10000 });
    await signupLoginPage.assertLoginFailed();
  });
});
