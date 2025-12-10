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
import * as fs from 'fs';

/**
 * Test suite: Download Invoice after Purchase
 */
test.describe('Download Invoice after Purchase', () => {
  test('TC24: Download invoice after purchase confirmation', async ({ page }) => {
    // Initialize page objects
    const signupPage = new SignupLoginPage(page);
    const accountPage = new AccountPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const confirmationPage = new OrderConfirmationPage(page);

    // Generate a new user
    const user = generateUser();

    // 1. Create account
    await signupPage.goto('/login');
    await signupPage.signup(user.name, user.email);
    await accountPage.fillAccountInformation(user);
    await accountPage.fillAddressInformation(user);
    await accountPage.submitAccountCreation();
    await accountPage.assertAccountCreated();
    await accountPage.clickContinue();

    // 2. Add product to cart
    await productsPage.gotoProductsPage();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickViewCartInModal();

    // 3. Proceed to checkout
    await cartPage.proceedToCheckout();

    // 4. Place order
    await checkoutPage.addComment('Please deliver soon');
    await checkoutPage.clickPlaceOrder();

    // 5. Complete payment
    await paymentPage.completePayment(testCardDetails);

    // 6. Verify order placed
    await confirmationPage.assertOrderPlaced();
    await page.waitForTimeout(1000);

    // 7. Verify Download Invoice button is visible
    const isVisible = await confirmationPage.isDownloadInvoiceVisible();
    expect(isVisible).toBeTruthy();

    // 8. Download invoice
    const download = await confirmationPage.downloadInvoice();

    // 9. Validate downloaded file
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    const filename = download.suggestedFilename();
    console.log(`📄 Downloaded file: ${filename}`);
    expect(filename).toContain('invoice');

    // 10. Save invoice to local downloads folder
    const downloadsDir = path.join('downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const savePath = path.join(downloadsDir, filename);
    await download.saveAs(savePath);
    console.log(`💾 Saved to: ${savePath}`);

    // 11. Verify file exists on disk
    expect(fs.existsSync(savePath)).toBeTruthy();

    // 12. Cleanup - delete account
    await confirmationPage.clickContinue();
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();

    console.log('✅ Test completed successfully!');
  });
});
