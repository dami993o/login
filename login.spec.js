const { test, expect } = require('@playwright/test');
import { chromium } from 'playwright';
  
  test('Login and Add Highest-Priced Item to Cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

//  change all prices to numbers
const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
const priceList = prices.map(price => parseFloat(price.replace('$', '').trim()));

//  Get the highest price
const highestPrice = Math.max(...priceList);

//  Finds the position of the highest price in the list
const highestPriceItemIndex = priceList.indexOf(highestPrice);

// locate the "Add to Cart" button for the highest-priced item
const inventoryItems = await page.locator('.inventory_item').all(); // Get all inventory items

// Find the matching "Add to Cart" button within the item with the highest price
await inventoryItems[highestPriceItemIndex].locator('[data-test^="add-to-cart-"]').click();

// Verify the item's price in the cart matches the highest price
const cartItemPrice = await inventoryItems[highestPriceItemIndex].locator('.inventory_item_price').textContent();
const cartPrice = parseFloat(cartItemPrice.replace('$', '').trim());

// Assert that the cart contains the highest-priced item
expect(cartPrice).toBe(highestPrice);

console.log(cartPrice)





    

 
});





