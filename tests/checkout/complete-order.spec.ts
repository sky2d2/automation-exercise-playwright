// tests/checkout/complete-order.spec.ts
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

test.describe('Complete Checkout Flow', () => {
  let signupLoginPage: SignupLoginPage;
  let accountPage: AccountPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let paymentPage: PaymentPage;
  let orderConfirmationPage: OrderConfirmationPage;

  test.beforeEach(async ({ page }) => {
    signupLoginPage = new SignupLoginPage(page);
    accountPage = new AccountPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
  });

  test('TC14: Complete order flow with new user', async ({ page }) => {
    // 1. Create new user account
    const userData = generateUser();
    await signupLoginPage.goto('/login');
    await signupLoginPage.signup(userData.name, userData.email);
    await accountPage.fillAccountInformation(userData);
    await accountPage.fillAddressInformation(userData);
    await accountPage.submitAccountCreation();
    await accountPage.assertAccountCreated();
    await accountPage.clickContinue();

    // 2. Verify logged in
    await expect(page.locator(`text=Logged in as ${userData.name}`)).toBeVisible();

    // 3. Add product to cart
    await productsPage.gotoProductsPage();
    await productsPage.hoverAndAddToCart(0);
    await page.waitForTimeout(1000);
    
    // 4. Click View Cart in modal
    await productsPage.clickViewCartInModal();

    // 5. Verify cart and proceed to checkout
    await cartPage.assertCartPageVisible();
    await cartPage.proceedToCheckout();

    // 6. Verify checkout page and address
    await checkoutPage.assertCheckoutPageVisible();
    await checkoutPage.verifyDeliveryAddress(
      `${userData.firstName} ${userData.lastName}`,
      userData.address1
    );

    // 7. Add comment and place order
    await checkoutPage.addComment('Please deliver between 9 AM - 5 PM');
    await checkoutPage.clickPlaceOrder();

    // 8. Complete payment
    await paymentPage.completePayment({
      nameOnCard: testCardDetails.nameOnCard,
      cardNumber: testCardDetails.cardNumber,
      cvc: testCardDetails.cvc,
      expiryMonth: testCardDetails.expiryMonth,
      expiryYear: testCardDetails.expiryYear,
    });

    // 9. Verify order success
    await page.waitForTimeout(2000);
    await orderConfirmationPage.assertOrderPlaced();

    console.log('✅ Order placed successfully!');

    // 10. Cleanup - Delete account
    await accountPage.deleteAccount();
    await accountPage.assertAccountDeleted();
    await accountPage.clickContinue();
  });
});