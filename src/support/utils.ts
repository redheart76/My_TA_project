import { ICustomWorld } from './custom-world';
import { Page } from 'playwright';
import { env } from 'process';
import { generateUserData } from './test_data';
import { faker } from '@faker-js/faker';

export const newUsers = async (page: Page, userName: string, email: string): Promise<void> => {
  const nameField = '[data-qa=signup-name]';
  const emailField = '[data-qa=signup-email]';
  await page.locator(nameField).fill(userName);
  await page.locator(emailField).fill(email);
};

// Define UserDataType if not imported from elsewhere
export type UserDataType = {
  firstName: string;
  lastName: string;
  address1: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export const userDetails = async (page: Page, user: UserDataType): Promise<void> => {
  const password: string = env.PASS || '';
  const passwordField = '[data-qa=password]';
  const dayDropdown = '[data-qa=days]';
  const monthDropdown = '[data-qa=months]';
  const yearDropdown = '[data-qa=years]';
  const firstNameField = '[data-qa=first_name]';
  const lastNameField = '[data-qa=last_name]';
  const addressField = '[data-qa=address]';
  const stateField = '[data-qa=state]';
  const cityField = '[data-qa=city]';
  const zipCodeField = '[data-qa=zipcode]';
  const mobileField = '[data-qa=mobile_number]';
// Pass user data to the function
  await page.locator('#id_gender1').check();
  await page.locator(passwordField).fill(password);
  await page.locator(dayDropdown).selectOption({ label: '1' });
  await page.locator(monthDropdown).selectOption({ label: 'January' });
  await page.locator(yearDropdown).selectOption({ label: '1990' });
  await page.locator(firstNameField).fill(user.firstName);
  await page.locator(lastNameField).fill(user.lastName);
  await page.locator(addressField).fill(user.address1);
  await page.locator(stateField).fill(user.state);
  await page.locator(cityField).fill(user.city);
  await page.locator(zipCodeField).fill(user.zipcode);
  await page.locator(mobileField).fill(user.mobileNumber);
  await page.getByText('Create Account').click();
};

export const paymentCardDetails = async (page: Page): Promise<void> => {
  const namedField = '[data-qa=name-on-card]';
  const numberField = '[data-qa=card-number]';
  const cvcField = '[data-qa=cvc]';
  const monthField = '[data-qa=expiry-month]';
  const yearField = '[data-qa=expiry-year]';
  // Generate fake card name
  const cardName = faker.person.fullName();
  // In the real world, the card number and the CVC need to be stored in the env file for the security reasons
  const cardNumber: string = env.CARDNUMBER || '';
  const cvc: string = env.CVC || '';
  const expiryMonth = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const expiryYear = faker.number.int({ min: 2025, max: 2030 }).toString();

  await page.locator(namedField).fill(cardName);
  await page.locator(numberField).fill(cardNumber);
  await page.locator(cvcField).fill(cvc);
  await page.locator(monthField).fill(expiryMonth);
  await page.locator(yearField).fill(expiryYear);
};
