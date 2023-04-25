import { expect } from '@playwright/test';
import { AxePlaywright } from '@axe-playwright';
const { test } = require('../fixtures');

test('Uutiset', async ({ page }) => {
  const context = await page.context();
  const { violations } = await new AxePlaywright(context).analyze();
  expect(violations.length).toBe(0);

  await page.goto('https://areena.yle.fi/tv/opas');
  await page.locator('span').filter({ hasText: '22.00 Kymmenen uutiset' }).getByRole('time').first().click();
  await page.locator('span').filter({ hasText: '22.00 Kymmenen uutiset' }).getByRole('time').first().click();
  await page.getByText('22.00 Kymmenen uutiset 19 min').click();
  await page.getByText('19 min').first().click();
});

test('Kanavat', async ({ page }) => {
  const context = await page.context();
  const { violations } = await new AxePlaywright(context).analyze();
  expect(violations.length).toBe(0);

  await page.goto('https://areena.yle.fi/tv/opas');
  await page.getByRole('heading', { name: 'Yle TV1' }).getByRole('link', { name: 'Yle TV1' }).click();
  await page.getByRole('heading', { name: 'Yle TV2' }).getByRole('link', { name: 'Yle TV2' }).click();
  await page.getByRole('heading', { name: 'Yle Teema Fem' }).locator('div').click();
  await page.getByRole('heading', { name: 'Yle Areena' }).locator('div').click();
  await page.getByRole('heading', { name: 'MTV3' }).locator('div').click();
  await page.getByRole('heading', { name: 'Nelonen' }).locator('div').click();
  await page.getByRole('heading', { name: 'Sub' }).locator('div').click();
  await page.getByRole('heading', { name: 'TV5' }).locator('div').click();
  await page.getByRole('heading', { name: 'Liv' }).locator('div').click();
  await page.getByRole('heading', { name: 'JIM' }).locator('div').click();
  await page.getByRole('heading', { name: 'Kutonen' }).locator('div').click();
  await page.getByRole('heading', { name: 'TLC' }).locator('div').click();
  await page.getByRole('heading', { name: 'STAR Channel' }).locator('div').click();
  await page.getByRole('heading', { name: 'Ava' }).locator('div').click();
  await page.getByRole('heading', { name: 'Hero' }).locator('div').click();
  await page.getByRole('heading', { name: 'Frii' }).locator('div').click();
  await page.getByRole('heading', { name: 'National Geographic' }).locator('div').click();
  await page.getByRole('heading', { name: 'TV Finland' }).locator('div').click();
});
