const { test, expect } = require("@playwright/test");

test("first PW test case PAGE", async ({ page }) => {
  const userName = page.locator('#userEmail')
  const signIn = page.locator("[value='Login']")
  const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/client/")
    await userName.fill("anshika@gmail.com")
    await page.locator('#userPassword').fill("Iamking@000")
    await signIn.click()
    await page.waitForLoadState('networkidle')
    const tiltes = await page.locator(".card-body b").allTextContents();
    console.log(tiltes)
  });
