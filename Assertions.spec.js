const { test, expect } = require('@playwright/test');

test('Assertions Test', async ({page})=>{
  await page.goto('https://demo.nopcommerce.com/register');

  await expect(page).toHaveURL('https://demo.nopcommerce.com/register');

  //const logoElement=await  page.locator('.header-logo')
 // await expect(logoElement).toBeVisible()
  
  const searchBox=await page.locator('small-searchterms')
  await expect(searchBox).toBeEnabled()
    
} );