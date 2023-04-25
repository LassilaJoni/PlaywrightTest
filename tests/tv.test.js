import {expect, beforeAll, beforeEach, afterAll, afterEach, Browser, BrowserContext } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { timeout } from '../playwright.config';
const { test } = require('../fixtures');

const baseUrl = 'https://areena.yle.fi/tv';

test.describe('Yle Areena Tests', () => {
  let browser;

  test('Error for providing email in wrong format', async ({page}) => {
    await page.goto(baseUrl);
    try {
      await page.waitForSelector('[role="button"][name="Hyväksy kaikki"]', { timeout: 3000 });

      // Click the button if found
      const acceptButton = await page.$('[role="button"][name="Hyväksy kaikki"]');
      if (acceptButton) {
        await acceptButton.click();
        await page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log('Cookie consent button not found, proceeding without clicking it.');
    }
    await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByRole('button', { name: 'Luo Yle Tunnus' }).click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByLabel('Sähköposti').click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByLabel('Sähköposti').fill('joni@jeee');
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByText('Luo Yle TunnusOnko sinulla jo Yle Tunnus? Kirjaudu sisäänKirjautuneena saat henk').click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByText('Tarkista sähköpostiosoitteen muoto.');
  });

  test('Accessibility test' , async ({page}) => {
    await page.goto(baseUrl);
    await injectAxe(page);
    const axePlaywrightConfig = {
      saveResult: true,
      resultPath: 'reports/axe-results.html',
    };
  
    try {
      const results = await checkA11y(page, null, axePlaywrightConfig);
      console.log(`Found ${results.violations.length} accessibility violation(s).`);
      for (const violation of results.violations) {
        console.log(`Violation found: ${violation.help}`);
      }
    } catch (e) {
      console.error(`Accessibility check failed: ${e.message}`);
    }
  });
});
