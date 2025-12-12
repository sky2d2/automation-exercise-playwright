import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';

/**
 * Test suite: Verify Product Quantity in Cart
 */
test.describe('Verify Product Quantity in Cart', () => {
  let productsPage: ProductsPage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('TC13: Verify product quantity in cart', async ({ page }) => {
    // 1. Navigate to home and products page
    await page.goto('/');
    await productsPage.gotoProductsPage();

    // 2. Open first product detail
    await page.locator('a:has-text("View Product")').first().click();
    await expect(productDetailPage.productName).toBeVisible();

    // 3. Get product name
    const productName = await productDetailPage.getProductName();

    // 4. Set quantity and add to cart
    const expectedQty = 4;
    await productDetailPage.setQuantity(expectedQty);
    await productDetailPage.clickAddToCart();

    // 5. Open cart modal
    await page.locator('.modal-content a:has-text("View Cart")').click();

    // 6. Validate product is in cart and quantity
    await cartPage.assertCartPageVisible();
    await cartPage.assertProductInCart(productName);
    const qty = await cartPage.getProductQuantity(productName);
    const numericQty = parseInt(qty.replace(/[^0-9]/g, ''));
    expect(numericQty).toBe(expectedQty);
  });
});
