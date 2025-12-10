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
    await page.goto('/');
    await productsPage.gotoProductsPage();

    await page.locator('a:has-text("View Product")').first().click();
    await expect(productDetailPage.productName).toBeVisible();

    const productName = await productDetailPage.productName.textContent();

    await productDetailPage.setQuantity(4);
    await productDetailPage.clickAddToCart();

    await page.locator('.modal-content a:has-text("View Cart")').click();

    await cartPage.assertCartPageVisible();
    await cartPage.assertProductInCart(productName!);

    const qty = await cartPage.getProductQuantity(productName!);
    const numericQty = parseInt(qty.replace(/[^0-9]/g, ''));

    expect(numericQty).toBe(4);
  });
});
