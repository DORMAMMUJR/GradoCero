import { expect, test } from '@playwright/test';

test('redirects unauthenticated users away from admin', async ({ page }) => {
  await page.goto('/admin');

  await expect(page).toHaveURL(/\/auth\/signin\?callbackUrl=(%2F|\/)admin/);
  await expect(
    page.getByRole('heading', { name: 'Grado Cero' }),
  ).toBeVisible();
});

test('renders the responsive catalog shell', async ({ page }) => {
  await page.goto('/inicio');

  await expect(
    page.getByRole('heading', {
      name: /Higiene profesional para operaciones/,
    }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /Abrir carrito/ })).toBeVisible();
});
