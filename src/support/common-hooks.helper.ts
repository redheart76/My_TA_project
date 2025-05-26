import { Page } from 'playwright';
import { env } from 'process';

/**
 * Steps to manually login, for the first time login or when the stored state is no longer valid
 * @param page
 * @param emailAddress
 */
export const manualLoginSteps = async (page: Page, emailAddress: string): Promise<void> => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await page.getByText('login').click();
  const password: string = env.PASS || '';
  const emailField = '[data-qa=login-email]';
  const passwordField = '[data-qa=login-password]';
  const submitButton = '[data-qa-id=login-button]';
  await page.locator(emailField).fill(emailAddress);
  await page.locator(passwordField).fill(password);
  await page.locator(submitButton).click();
};
