import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { newUsers, paymentCardDetails, userDetails } from '../support/utils';
import { generateUserData } from '../support/test_data';



Given('I am on the homepage', async function (this: ICustomWorld) {
    const page = this.getPage();
    // Access the base URL directly from the environment config
    // Todo: tweak this to direct test URL when using test environment 
    const baseUrl = this.environmentConfig?.redirects?.base || 'https://automationexercise.com/';
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(baseUrl);
});


When('I click on the "Sign Up" button', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
});

When('I fill in the registration form with valid details', async function (this: ICustomWorld) {
  const page = this.getPage();
  const userData = generateUserData();
  this.userData = userData;
  await newUsers(page, `${userData.name}`, `${userData.email}`);
  await page.locator('[data-qa=signup-button]').click();
  await page.waitForLoadState('load')
  await userDetails(page, userData);
  
});

Then('I should be able to create a new account', async function (this: ICustomWorld) {
  const page = this.getPage();
  await expect(page.locator('[data-qa=account-created]')).toHaveText('Account Created!');
});


Then('I am able to contiune to use the account', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.locator('[data-qa=continue-button]').click();
  await page.locator('[class="fa fa-user"]').waitFor({ state: 'visible' });
  const userName = this.userData?.name;
  // Verify that the user is logged in
  await expect(page.locator('[class="nav navbar-nav"]')).toContainText(`Logged in as ${userName}`, { timeout: 10000 });
});

When('I add a product to the cart', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.locator('[class="btn btn-default add-to-cart"]').first().click()
  await page.getByRole('link', { name: 'View Cart' }).click();
  // Verfity the cart page is displayed
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');
});

When('I proceed to checkout', async function (this: ICustomWorld) {
  const page = this.getPage();
   await page.locator('[class="btn btn-default check_out"]').click();
   // Verify delivery address
   expect(page.locator('#address_delivery')).not.toBeNull()
   // Extract the delivery address text
  const deliveryAddress = await page.locator('#address_delivery').innerText();

  // Build the expected address string (adjust formatting as needed)
  const expectedAddress = [
    this.userData?.name,
    this.userData?.address1,
    this.userData?.city,
    this.userData?.state,
    this.userData?.zipcode,
    this.userData?.mobileNumber
  ].filter(Boolean).join('\n'); // or adjust to match the site's formatting

  // Assert the delivery address contains the expected values
  expect(deliveryAddress).toContain(this.userData?.address1);
  expect(deliveryAddress).toContain(this.userData?.city);
  expect(deliveryAddress).toContain(this.userData?.state);
  expect(deliveryAddress).toContain(this.userData?.zipcode);
  expect(deliveryAddress).toContain(this.userData?.mobileNumber);
  
   // Review the order
   expect(page.locator('.cart_description')).toContainText('Blue Top')
   expect(page.locator('.cart_total')).toHaveText('Rs. 500')
   await page.locator('.form-control').fill('My comment');
   await page.locator('[class="btn btn-default check_out"]').click();
});

When('I complete the payment details', async function (this: ICustomWorld) {
  const page = this.getPage();
  await paymentCardDetails(page);
});

When('I confirm the order', async function (this: ICustomWorld) {
  const page = this.getPage();
    await page.locator('[data-qa="pay-button"]').click();
});

// As there's a race condition between the payment confirmation and the order placed message, 
// I use the order-placed message to confirm the order for the assertions
When('I should be placed the order successfully', async function (this: ICustomWorld) {
  const page = this.getPage();
  // Assert the heading is visible
  await expect(page.locator('[data-qa="order-placed"]')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('[data-qa="order-placed"]')).toHaveText(/Order Placed!/);
  // Assert the confirmation message is visible
  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible({ timeout: 5000 });
});


When('I review the cart', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.getByRole('link', { name: ' Cart' }).click();
});

When('I delete the account', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.getByRole('link', { name: ' Delete Account' }).click();
});

Then('I am able to delete the account successfully', async function (this: ICustomWorld) {
  const page = this.getPage();
  await expect(page.locator('[data-qa=account-deleted]')).toHaveText('Account Deleted!');
  await page.locator('[data-qa=continue-button]').click();
});
