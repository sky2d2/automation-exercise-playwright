// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('a[href="/"]').first();
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.loggedInAsText = page.locator('text=Logged in as');
  }

  async goto(path: string = '/'): Promise<void> {
    const baseURL = 'https://www.automationexercise.com';
    const url = path.startsWith('http') ? path : `${baseURL}${path}`;
    await this.page.goto(url);
  }

  async navigateToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async navigateToCart(): Promise<void> {
  // Close any open modals first
  await this.page.keyboard.press('Escape');
  await this.page.waitForTimeout(500);
  // Use force click to bypass any overlays
  await this.cartLink.first().click({ force: true });
  }


  async navigateToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async isLoggedIn(username: string): Promise<boolean> {
    return await this.page.locator(`text=Logged in as ${username}`).isVisible();
  }
}
