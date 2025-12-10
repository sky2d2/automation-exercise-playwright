import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { generateReview } from '../../utils/dataGenerator';

/**
 * Test suite: Add Product Review
 */
test.describe('Add Product Review', () => {
  let productsPage: ProductsPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
  });

  test('TC21: Add review on product', async ({ page }) => {
    // Navigate to home page and verify carousel
    await page.goto('/');
    await expect(page.locator('.carousel').first(), 'Home page carousel should be visible').toBeVisible();

    // Navigate to products page
    await productsPage.gotoProductsPage();
    await productsPage.assertAllProductsVisible();

    // Open first product detail
    await page.locator('a:has-text("View Product")').first().click();
    await expect(page.locator('text=Write Your Review'), 'Review section should be visible').toBeVisible();

    // Generate review data dynamically
    const reviewData = generateReview();

    // Fill review form and submit
    await productDetailPage.addReview(
      reviewData.name,
      reviewData.email,
      reviewData.review
    );

    // Verify success message
    await productDetailPage.assertReviewSuccess();

    console.log(`✅ Review submitted by: ${reviewData.name}`);
  });
});
