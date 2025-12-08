import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  readonly newUserNameInput: Locator;
  readonly newUserEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.newUserNameInput = page.locator('[data-qa="signup-name"]');
    this.newUserEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('text=Your email or password is incorrect!');
    this.signupErrorMessage = page.locator('text=Email Address already exist!');
  }

  async gotoLoginPage(): Promise<void> {
    await this.goto('/login');  
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.newUserNameInput.fill(name);
    await this.newUserEmailInput.fill(email);
    await this.signupButton.click();
  }

  async assertLoginSuccess(username: string): Promise<void> {
    await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible();
  }

  async assertLoginFailed(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async assertSignupFailed(): Promise<void> {
    await expect(this.signupErrorMessage).toBeVisible();
  }
}
