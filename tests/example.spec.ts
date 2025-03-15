import { test, expect } from '@playwright/test';
import { sendEmail } from '../utils/smtp.ts';
import { checkEmail } from '../utils/imap.ts';
import { verifyEmail } from '../utils/imap-code.ts';

// Playwright test to automate the flow
test('Send and Check Email in Playwright', async ({ page }) => {
  
  // await sendEmail();

  // const result = await checkEmail();
  // console.log(result)

  const verify = await verifyEmail();
  console.log(verify);
  
});