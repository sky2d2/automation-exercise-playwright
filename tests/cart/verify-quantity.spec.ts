import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Verify Product Quantity in Cart', () => {
  let productsPage: ProductsPage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('TC13: Verify product quantity in cart', async ({ page }) => {
    // 1. Navigate to home + products page
    await page.goto('/');
    await productsPage.gotoProductsPage();

    // 2. Open first product
    await page.locator('a:has-text("View Product")').first().click();
    await expect(productDetailPage.productName).toBeVisible();

    // 3. Get product name using POM method
    const productName = await productDetailPage.getProductName();

    // 4. Update quantity & add to cart
    const expectedQty = 4;
    await productDetailPage.setQuantity(expectedQty);
    await productDetailPage.clickAddToCart();

    // 5. Open cart
    await page.locator('.modal-content a:has-text("View Cart")').click();

    await cartPage.assertCartPageVisible();
    await cartPage.assertProductInCart(productName);

    // 6. Validate quantity in cart
    const qty = await cartPage.getProductQuantity(productName);
    const numericQty = parseInt(qty.replace(/[^0-9]/g, ''));

    expect(numericQty).toBe(expectedQty);
  });
});
