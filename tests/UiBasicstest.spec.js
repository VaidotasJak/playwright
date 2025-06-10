const { test, expect } = require("@playwright/test");

test("first PW test case broser context declaration", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage()
  await page.goto("https://www.mrbiceps.lt/")
});

test("first PW test case PAGE", async ({ page }) => {
  const userName = page.locator('#username')
  const signIn = page.locator('#signInBtn')
  const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshettyacademys")
    await page.locator('#password').fill("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    console.log(await page.locator(".card-body a").nth(0).textContent());
    const allTitle = await cardTitles.allTextContents()
    console.log(allTitle)
});

test("UI controls", async ({ page }) => {
  const userName = page.locator('#username')
  const signIn = page.locator('#signInBtn')
  const cardTitles = page.locator(".card-body a")
  const dropdown = page.locator("select[class*='form-control']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await userName.fill("rahulshettyacademy")
    await page.locator('#password').fill("learning")
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    const docLink = page.locator("[href*='documents-request']")
    await expect(docLink).toHaveAttribute("class", "blinkingText")
});

test("Handle windows ", async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const docLink = page.locator("[href*='documents-request']")
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      docLink.click()
    ])

    const text = await newPage.locator('.red').textContent()
    const domain = text.split("@")
    const domainreal = domain[1].split(" ")[0]
    console.log(domainreal)
await page.locator("#username").type(domainreal)
    console.log(await page.locator('#usernames').textContent())

});

test('@Webst Client App login', async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "anshika@gmail.com";
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles); 
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
     if (await products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }

  await page.locator("[routerlink*='cart']").click();
  //await page.pause();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
     const text = await dropdown.locator("button").nth(i).textContent();
     if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
     }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");


  for (let i = 0; i < await rows.count(); ++i) {
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
     }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

test('Playwright Special locators', async ({ page }) => {
  
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", {name: 'Submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link",{name : "Shop"}).click();
  await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

  //locator(css)

});

test('@Webst Client App login v2', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
