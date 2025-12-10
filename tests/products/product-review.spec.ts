import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { generateReview } from '../../utils/dataGenerator';

test.describe('Add Product Review', () => {
  let productsPage: ProductsPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
  });

  test('TC21: Add review on product', async ({ page }) => {
    await page.goto('/');
    await productsPage.gotoProductsPage();

    await page.locator('a:has-text("View Product")').first().click();
    await expect(page.locator('text=Write Your Review')).toBeVisible();

    const reviewData = generateReview();

    await productDetailPage.addReview(
      reviewData.name,
      reviewData.email,
      reviewData.review
    );

    await productDetailPage.assertReviewSuccess();
  });
});
