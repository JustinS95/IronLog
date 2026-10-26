// IL-E0-01 (#18): the built site shows the IronLog header and the three notices, verbatim.

import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function expectHeaderAndNotices(page: Page) {
  await expect(page.getByRole('banner')).toContainText('IronLog');

  const notices = page.getByRole('contentinfo', { name: 'Credits and notices' });
  const pvme = notices.locator('[data-notice="pvme"]');
  const wiki = notices.locator('[data-notice="wiki"]');
  const jagex = notices.locator('[data-notice="jagex"]');

  // The page opens on Melee, so the PVME notice credits Melee's upgrade order (IL-E1-01 AC 12).
  await expect(pvme).toHaveText(
    "Upgrade order from PVME's Melee upgrade order, used under CC BY-NC-SA 4.0. Non-commercial.",
  );
  await expect(pvme.getByRole('link', { name: 'CC BY-NC-SA 4.0' })).toHaveAttribute(
    'href',
    'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  );
  await expect(pvme.getByRole('link', { name: "PVME's Melee upgrade order" })).toHaveAttribute(
    'href',
    'https://github.com/pvme/pvme-guides/blob/7a1f15f/upgrading-info/upgrade-order/melee.txt',
  );

  await expect(wiki).toHaveText(
    'Drop sources, parts and requirements from the RuneScape Wiki, used under CC BY-NC-SA 3.0.',
  );
  await expect(wiki.getByRole('link', { name: 'RuneScape Wiki' })).toHaveAttribute('href', 'https://runescape.wiki/');
  await expect(wiki.getByRole('link', { name: 'CC BY-NC-SA 3.0' })).toHaveAttribute(
    'href',
    'https://creativecommons.org/licenses/by-nc-sa/3.0/',
  );

  await expect(jagex).toHaveText(
    "Created using intellectual property belonging to Jagex Limited under the terms of Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.",
  );
  await expect(jagex.getByRole('link', { name: "Jagex's Fan Content Policy" })).toHaveAttribute(
    'href',
    'https://legal.jagex.com/docs/policies/fan-content-policy',
  );
}

test('the built site shows the header and the three notices', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('./');
  await expect(page).toHaveTitle('IronLog');
  await expectHeaderAndNotices(page);
  await expect(page.locator('[data-progress-status]')).toHaveAttribute('data-progress-status', 'empty');
  expect(errors).toEqual([]);
});

test('the site still loads when browser storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('./');
  await expectHeaderAndNotices(page);
  await expect(page.locator('[data-progress-status]')).toHaveAttribute('data-progress-status', 'unavailable');
  expect(errors).toEqual([]);
});
