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

This framework automates 8 comprehensive e-commerce scenarios based on official test cases:

### 1. User Registration (Test Case 1)
- Navigate to signup page
- Enter user details and account information
- Fill complete registration form with personal and address details
- Verify account creation success
- Validate logged-in state

### 2. User Login/Logout (Test Case 2)
- Login with valid credentials
- Verify successful authentication
- Test logout functionality
- Negative testing with invalid credentials

### 3. Search Product (Test Case 9)
- Navigate to products page
- Use search functionality
- Verify search results display
- Validate searched product details

### 4. Add Products to Cart (Test Case 12)
- Browse product catalog
- Add multiple products to cart
- Verify cart updates
- Check product details in cart (name, price, quantity)

### 5. Verify Product Quantity (Test Case 13)
- Increase product quantity before adding to cart
- Add to cart with custom quantity
- Verify correct quantity in cart
- Validate price calculation

### 6. Complete Checkout Flow (Test Case 14)
- Register new user during checkout
- Add products to cart
- Proceed through checkout steps
- Enter payment and delivery details
- Confirm order placement

### 7. Add Product Review (Test Case 21)
- Navigate to product detail page
- Write product review
- Submit review with name and email
- Verify success message

### 8. Download Invoice (Test Case 24)
- Complete purchase order
- Download invoice after order
- Verify downloaded file
- Validate file name and content

## Technologies & Tools

- **Playwright** v1.49+ - Modern cross-browser automation
- **TypeScript** v5.x - Type-safe test development
- **Node.js** v18+ - JavaScript runtime
- **Page Object Model (POM)** - Scalable test architecture
- **GitHub Actions** - Continuous Integration
- **Faker.js** - Dynamic test data generation

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git**






