import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  console.log('Base URL:', process.env.URL);
  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Test Login | Practice Test Automation');
});

test('Test case 1: Positive LogIn test', async ({ page }) => {
  await page.goto('');
  console.log('Base URL:', process.env.URL);
  console.log('Base username:', process.env.usrname);
  console.log('Base password:', process.env.password);
  // Enter correct username and correct password
  await page.locator("//input[@id='username']").fill(process.env.usrname);
  await page.locator("//input[@id='password']").fill(process.env.password);
  await page.locator("//button[@id='submit']").click();
  // Verify new page URL contains practicetestautomation.com/logged-in-successfully/
  await expect(page).toHaveURL(process.env.URL + '/logged-in-successfully/');

  //Verify new page contains expected text ('Congratulations' or 'successfully logged in')
  await expect(page.getByText("Congratulations student. You successfully logged in!")).toBeVisible();
});

test('Test case 2: Negative username test', async ({ page }) => {

  await page.goto('');
  console.log('Base URL:', process.env.URL);
  console.log('Incorrect username:', process.env.incorrectUser);
  console.log('Correct password:', process.env.password);
  // Enter incorrect username and correct password
  await page.locator("//input[@id='username']").fill(process.env.incorrectUser);
  await page.locator("//input[@id='password']").fill(process.env.password);
  await page.locator("//button[@id='submit']").click();
  // Verify error message is displayed
  await expect(page.locator('b').filter({ hasText: 'Your username is invalid!' })).toBeVisible();

});

test('Test case 3: Negative password test', async ({ page }) => {

  await page.goto('');
  console.log('Base URL:', process.env.URL);
  console.log('Correct username:', process.env.usrname);
  console.log('Incorrect password:', process.env.incorrectPassword);
  // Enter correct username and incorrect password
  await page.locator("//input[@id='username']").fill(process.env.usrname);
  await page.locator("//input[@id='password']").fill(process.env.incorrectPassword);
  await page.locator("//button[@id='submit']").click();
  // Verify error message is displayed
  await expect(page.locator('b').filter({ hasText: 'Your password is invalid!' })).toBeVisible();

});
