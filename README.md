# Automation Exercise - Playwright TypeScript Framework

**Course:** CMP-1979 - Playwright Automation  
**Team Members:**
- Lalitha Mirthipati - A00299457
- Aditya Bhandari - A00287516

## Project Summary

This project is a comprehensive automated testing framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern. The framework automates critical e-commerce user flows on Automation Exercise, a full-featured online shopping platform designed specifically for QA automation practice.

## Application Under Test

**Website:** Automation Exercise  
**URL:** https://www.automationexercise.com  
**Purpose:** Full-fledged e-commerce website for automation practice

Automation Exercise is a complete online shopping platform with real-world e-commerce features including user registration, product catalog, shopping cart, checkout process, payment integration, and user reviews. The site provides 26 documented test cases and 11 API endpoints specifically designed for automation engineers at all skill levels.

## Automated User Flows

This framework automates 8 comprehensive e-commerce scenarios:

**User Registration** (Test Case 1: tests/auth/register-user.spec.ts)
- Automates the full signup flow: enter personal and address details, submit registration and verify account creation. Confirms the user lands in the authenticated state after registration.

**Login and Logout** (Test Case 2: tests/auth/login-logout.spec.ts)
- Verifies login with valid credentials and that logout returns the application to an unauthenticated state. Includes a check for invalid credentials handling.

**Search Product** (Test Case 9: tests/products/search-product.spec.ts)
- Exercises the product search input and validates search results and product metadata. Ensures search returns matching items and product links work correctly.

**Add Products to Cart** (Test Case 12: tests/cart/add-to-cart.spec.ts)
- Adds one or more products from the catalog to the cart and asserts cart contents, item names and prices. Verifies the cart UI updates correctly after add operations.

**Verify Product Quantity** (Test Case 13: tests/cart/verify-quantity.spec.ts)
- Increases product quantity before adding to cart and checks that the cart records correct quantities and price calculation. Validates quantity controls and subtotal math.

**Complete Checkout Flow** (Test Case 14: tests/checkout/complete-order.spec.ts)
- Covers registration, add-to-cart, checkout steps, entering payment details and order confirmation. Confirms order placement success and verifies the post-order state.

**Add Product Review** (Test Case 21: tests/products/product-review.spec.ts)
- Navigates to a product details page, submits a review with name and email and verifies the success confirmation. Tests review form validations and submission.

**Download Invoice** (Test Case 24: tests/checkout/download-invoice.spec.ts)
- Completes a purchase, triggers invoice download from confirmation, and validates the downloaded file. Saves invoice to the local downloads folder.

## Technologies & Tools

- **Playwright** v1.49+ - Modern cross-browser automation
- **TypeScript** v5.x - Type-safe test development
- **Node.js** v18+ - JavaScript runtime
- **Faker.js** - Dynamic test data generation

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git**

## How to Run Tests

### 1. Install dependencies

Run this once to install all required packages:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

### 2. Run all tests (headless mode)

```bash
npx playwright test
```

### 3. Run all tests with visible browser (headed mode)

```bash
npx playwright test --headed
```

### 4. Run tests in debug mode

Open Playwright Inspector to step through tests:

```bash
npx playwright test --debug
```

### 5. Run a specific test file

Run individual user flows using exact file paths:

**User Registration** (Test Case 1):
```bash
npx playwright test tests/auth/register-user.spec.ts --headed
```

**Login and Logout** (Test Case 2):
```bash
npx playwright test tests/auth/login-logout.spec.ts --headed
```

**Search Product** (Test Case 9):
```bash
npx playwright test tests/products/search-product.spec.ts --headed
```

**Add Products to Cart** (Test Case 12):
```bash
npx playwright test tests/cart/add-to-cart.spec.ts --headed
```

**Verify Product Quantity** (Test Case 13):
```bash
npx playwright test tests/cart/verify-quantity.spec.ts --headed
```

**Complete Checkout Flow** (Test Case 14):
```bash
npx playwright test tests/checkout/complete-order.spec.ts --headed
```

**Add Product Review** (Test Case 21):
```bash
npx playwright test tests/products/product-review.spec.ts --headed
```

**Download Invoice** (Test Case 24):
```bash
npx playwright test tests/checkout/download-invoice.spec.ts --headed
```

### 6. View test report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

### 7. Run specific browser only

Test only on Chromium:
```bash
npx playwright test --project=chromium
```

Test only on Firefox:
```bash
npx playwright test --project=firefox
```

Test only on WebKit:
```bash
npx playwright test --project=webkit
```

## Project Structure

```
automation-exercise-playwright/
├── pages/                      # Page Object Model classes
│   ├── BasePage.ts
│   ├── SignupLoginPage.ts
│   ├── AccountPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   └── OrderConfirmationPage.ts
├── tests/                      # Test specifications
│   ├── auth/
│   │   ├── register-user.spec.ts
│   │   └── login-logout.spec.ts
│   ├── products/
│   │   ├── search-product.spec.ts
│   │   └── product-review.spec.ts
│   └── checkout/
│       ├── add-to-cart.spec.ts
│       ├── complete-order.spec.ts
│       └── download-invoice.spec.ts
├── utils/                      # Utilities and test data
│   ├── dataGenerator.ts
│   └── testData.ts
├── fixtures/                   # Test fixtures and files
├── downloads/                  # Downloaded files (invoices, etc.)
├── playwright.config.ts        # Playwright configuration
└── package.json                # Dependencies and scripts
```

## Notes

- Tests automatically create new users where possible to avoid conflicts.
- User accounts are cleaned up after tests complete.
- Do not hard-code credentials; use environment variables if needed.
- For CI/CD, ensure Playwright browsers are installed: `npx playwright install`

---

**Last Updated:** December 2025  
**Framework Version:** Playwright 1.49+






