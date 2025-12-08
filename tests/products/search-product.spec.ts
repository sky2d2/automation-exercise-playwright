// tests/products/search-product.spec.ts
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { testProducts } from '../../utils/testData';

test.describe('Search Product Flow', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
  });

  test('TC9: Search for products', async ({ page }) => {
    // Step 1: Navigate to products page
    await productsPage.gotoProductsPage();
    
    // Step 2: Verify All Products page is visible
    await productsPage.assertAllProductsVisible();
    
    // Step 3: Enter product name in search input
    await productsPage.searchProduct(testProducts.searchTerm);
    
    // Step 4: Verify 'SEARCHED PRODUCTS' is visible
    await productsPage.assertSearchedProductsVisible();
    
    // Step 5: Verify searched products are visible
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Search for specific product - Blue Top', async ({ page }) => {
    await productsPage.gotoProductsPage();
    await productsPage.searchProduct(testProducts.product1);
    
    // Verify the specific product is visible
    await productsPage.assertProductVisible(testProducts.product1);
  });
});
