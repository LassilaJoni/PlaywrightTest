import { test, expect } from '@playwright/test';

test('Kummeli test', async ({ page }) => {
  await page.goto('https://areena.yle.fi/1-3339547');
  await page.getByRole('button', { name: 'Kausi 3' }).click();
  await page.getByRole('link', { name: '5. Kummeli' }).click();

  //await page.getByRole('heading', { name: 'K3, J5: Kummeli' }).click();
  await expect(page.getByRole('heading', { name: 'K3, J5: Kummeli' })).toHaveText('K3, J5: Kummeli');

  //await page.getByText('julkaistu ti 10.1.2006').click();
  await expect(page.getByText('julkaistu ti 10.1.2006')).toHaveText('julkaistu ti 10.1.2006');
});