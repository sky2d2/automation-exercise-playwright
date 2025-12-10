import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { AccountPage } from '../../pages/AccountPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';
import { generateUser } from '../../utils/dataGenerator';
import { testCardDetails } from '../../utils/testData';
import * as path from 'path';

test.describe('Download Invoice after Purchase', () => {
  test('TC24: Download invoice after purchase confirmation', async ({ page }) => {
    const signupPage = new SignupLoginPage(page);
    const accountPage = new AccountPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const confirmationPage = new OrderConfirmationPage(page);

    const user = generateUser();

    await signupPage.goto('/login');
    await signupPage.signup(user.name, user.email);
    await accountPage.fillAccountInformation(user);
    await accountPage.fillAddressInformation(user);
    await accountPage.submitAccountCreation();
    await accountPage.assertAccountCreated();
    await accountPage.clickContinue();

    await productsPage.gotoProductsPage();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickViewCartInModal();

    await cartPage.proceedToCheckout();

    await checkoutPage.addComment('Please deliver soon');
    await checkoutPage.clickPlaceOrder();

    await paymentPage.completePayment(testCardDetails);

    await confirmationPage.assertOrderPlaced();

    const downloadPromise = page.waitForEvent('download');
    await page.locator('a:has-text("Download Invoice")').click();
    const download = await downloadPromise;

    const filename = download.suggestedFilename();
    expect(filename).toContain('invoice');

    const savePath = path.join('downloads', filename);
    const fs = require('fs');
    if (!fs.existsSync('downloads')) fs.mkdirSync('downloads');
    await download.saveAs(savePath);

    await confirmationPage.clickContinue();
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();
  });
});
