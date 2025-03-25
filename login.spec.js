
const { test, expect } = require('@playwright/test');
import { chromium } from 'playwright';

test('login', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-5-title-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

// Assertion: Expects the text content to be "$49.99
  const locator = await page.locator('[data-test="inventory-item-price"]');
  const textContent = await locator.innerText();
  expect(textContent).toBe('$49.99');




});



