import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://sgouqa.cdipd.in/home');

  // Close modal if present
  const closeBtn = page.getByRole('button', { name: 'Close' });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  // Login flow
  await page.getByRole('button', { name: /Login\/Register/i }).click();
  await page.getByRole('link', { name: 'Login' }).first().click();

  await page.getByRole('textbox', { name: 'E-mail' }).fill('abhilashar2823@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('123456');

  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // ✅ FIX: Wait for URL instead of networkidle
  await page.waitForURL('**/candidate-dashboard-v2');

  // ✅ Ensure dashboard is loaded
  await expect(page.getByRole('link', { name: /My Dashboard/i })).toBeVisible();

  // Click Proceed button (Semester Registration)
  const proceedBtn = page.getByRole('button', { name: /Click Here to Proceed/i });
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();

  // ✅ Wait for stream selection screen (UI-based wait)
  await expect(page.getByText(/Marketing|Finance/i)).toBeVisible();

  // Select stream
  await page.getByText('Marketing').click();

  // Select elective 1
  const electiveRow = page.getByText('Discipline Specific Elective DSE2');
  await electiveRow.locator('..').getByRole('listbox').click();
  await page.getByText(/SERVICE AND RETAIL MARKETING/i).click();

  // Select elective 2
  await page.getByRole('cell', { name: /Choose Elective/i })
    .getByRole('listbox')
    .click();
  await page.getByText(/PRINCIPLES OF MARKETING/i).click();

  // Agree & confirm
  await page.getByRole('checkbox', { name: /I agree/i }).check();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: /^confirm$/i }).click();
  await page.getByRole('button', { name: /Confirm/i }).last().click();

  // Payment flow
  await page.getByRole('button', { name: /Pay Now/i }).click();
  await page.getByRole('button', { name: 'Net Banking' }).click();

  await page.getByText('Phicom Test bank').click();
  await page.getByRole('button', { name: 'Pay Now' }).click();

  // OTP
  await page.locator('#otp').fill('123456');

  page.once('dialog', dialog => dialog.dismiss());

  await page.getByRole('button', { name: 'Verify OTP' }).click();

  // Final validation
  await expect(page.getByText('Semester Registration Status')).toBeVisible();

});