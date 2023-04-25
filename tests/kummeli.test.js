import {expect } from '@playwright/test';
const { test } = require('../fixtures');
import AxeBuilder from '@axe-core/playwright';

test('Kummeli test', async ({ page }, testInfo) => {
  await page.goto('https://areena.yle.fi/1-3339547');

  await axe(page, testInfo);

  await page.getByRole('button', { name: 'Kausi 3' }).click();
  await page.getByRole('link', { name: '5. Kummeli' }).click();

  await axe(page, testInfo);

  //await page.getByRole('heading', { name: 'K3, J5: Kummeli' }).click();
  await expect(page.getByRole('heading', { name: 'K3, J5: Kummeli' })).toHaveText('K3, J5: Kummeli');

  //await page.getByText('julkaistu ti 10.1.2006').click();
  await expect(page.getByText('julkaistu ti 10.1.2006')).toHaveText('julkaistu ti 10.1.2006');
});

async function axe(page, testInfo) {

    try {
      const accessibilityScanResults = await new AxeBuilder({ page })
          .options({saveResult: true, resultPath: 'reports/axe-results.html' })
          .analyze();
      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults.violations, null, 2),
        contentType: 'application/json'
      });
      
    } catch(e) {
      console.error(e.message);
    }

}