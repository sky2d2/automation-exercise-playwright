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
    // Step 1: Enter name and email, click Signup
    await signupLoginPage.signup(userData.name, userData.email);
    
    // Step 2: Verify 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    
    // Step 3: Fill account details
    await accountPage.fillAccountInformation(userData);
    
    // Step 4: Fill address information
    await accountPage.fillAddressInformation(userData);
    
    // Step 5: Click 'Create Account'
    await accountPage.submitAccountCreation();
    
    // Step 6: Verify 'ACCOUNT CREATED!' message
    await accountPage.assertAccountCreated();
    
    // Step 7: Click Continue
    await accountPage.clickContinue();
    
    // Step 8: Verify logged in as username
    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();
    
    // Step 9: Clean up - Delete account
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();
    await accountPage.clickContinue();
  });
});
