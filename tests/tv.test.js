const { test, expect } = require('@playwright/test');

test('YLE TV main page loads', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv');
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Yle Areena – Enemmän kuin ehdit katsoa ja kuunnella | TV | Areena | yle.fi');
});

test('Error for providing email in wrong format', async ({ page}) => {
    await page.goto('https://areena.yle.fi/tv');

    await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByRole('button', { name: 'Luo Yle Tunnus' }).click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByLabel('Sähköposti').click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByLabel('Sähköposti').fill('joni@jeee');
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByText('Luo Yle TunnusOnko sinulla jo Yle Tunnus? Kirjaudu sisäänKirjautuneena saat henk').click();
    await page.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe').getByText('Tarkista sähköpostiosoitteen muoto.').click();
  });
