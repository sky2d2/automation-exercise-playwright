// tests/cart/add-to-cart.spec.ts
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Add Products to Cart Flow', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('TC12: Add multiple products to cart and verify details', async ({ page }) => {
    // 1-3: Launch site and navigate to products
    await productsPage.gotoProductsPage();

    // Capture first product name and price
    const firstProduct = page.locator('.features_items .col-sm-4').nth(0);
    const firstName = (await firstProduct.locator('.productinfo p').textContent())?.trim() || '';

    // 4-6: Add first product to cart and use Continue Shopping
    await productsPage.hoverAndAddToCart(0);
    // Wait for modal and click Continue Shopping
    await page.locator('.modal-content').waitFor({ state: 'visible', timeout: 3000 });
    await page.locator('button:has-text("Continue Shopping")').click({ force: true });
    await page.waitForTimeout(500);

    // Capture second product name and price
    const secondProduct = page.locator('.features_items .col-sm-4').nth(1);
    const secondName = (await secondProduct.locator('.productinfo p').textContent())?.trim() || '';

    // 7-8: Add second product and click View Cart in modal
    await productsPage.hoverAndAddToCart(1);
    await page.waitForTimeout(1000);
    await productsPage.clickViewCartInModal();

    // 9: Verify both products are added to cart
    await cartPage.assertCartPageVisible();
    await cartPage.assertProductInCart(firstName);
    await cartPage.assertProductInCart(secondName);

    // 10: Verify prices, quantity and totals for both products
    const qty1 = await cartPage.getProductQuantity(firstName);
    const price1 = await cartPage.getProductPrice(firstName);
    const total1 = await cartPage.getProductTotal(firstName);

    const qty2 = await cartPage.getProductQuantity(secondName);
    const price2 = await cartPage.getProductPrice(secondName);
    const total2 = await cartPage.getProductTotal(secondName);

    const nPrice1 = parseFloat(price1.replace(/[^0-9.]/g, '')) || 0;
    const nPrice2 = parseFloat(price2.replace(/[^0-9.]/g, '')) || 0;
    const nTotal1 = parseFloat(total1.replace(/[^0-9.]/g, '')) || 0;
    const nTotal2 = parseFloat(total2.replace(/[^0-9.]/g, '')) || 0;
    const nQty1 = parseInt(qty1.replace(/[^0-9]/g, '')) || 1;
    const nQty2 = parseInt(qty2.replace(/[^0-9]/g, '')) || 1;

    expect(nTotal1).toBeCloseTo(nPrice1 * nQty1, 2);
    expect(nTotal2).toBeCloseTo(nPrice2 * nQty2, 2);
  });
});
