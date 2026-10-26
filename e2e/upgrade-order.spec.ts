// IL-E1-01 (#4): browse a combat style's upgrade order on the built site.
// Expected rows come from the generated catalogue (built from the BA CSVs), not typed in here.

import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { CatalogueData } from '../src/rules/types';

const data = JSON.parse(
  readFileSync(new URL('../src/generated/catalogue.json', import.meta.url), 'utf8'),
) as CatalogueData;

const styleData = (name: string) => data.styles.find((s) => s.style === name)!;
const stageList = (page: Page, heading: string) =>
  page.getByRole('region', { name: new RegExp(`^${escape(heading)}`) }).locator('li');
const styleButton = (page: Page, name: string) =>
  page.getByRole('group', { name: 'Combat style' }).getByRole('button', { name, exact: true });

test('each style shows exactly its catalogue rows, by PVME stage, with its own PVME credit', async ({ page }) => {
  await page.goto('./');
  await expect(styleButton(page, 'Melee')).toHaveAttribute('aria-pressed', 'true');

  for (const name of ['Melee', 'Ranged', 'Magic', 'Necromancy']) {
    const style = styleData(name);
    await styleButton(page, name).click();
    await expect(styleButton(page, name)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${name} upgrade order`);

    // AC 1, 2: every stage under PVME's heading, its rows in order.
    for (const stage of style.stages) {
      await expect(stageList(page, stage.name)).toHaveText(stage.rows.map((r) => new RegExp(escape(r.upgrade))));
    }
    // AC 11: the separate Free Upgrades section.
    await expect(stageList(page, 'Free Upgrades')).toHaveText(
      style.freeUpgrades.map((r) => new RegExp(escape(r.upgrade))),
    );
    const total = style.stages.reduce((n, s) => n + s.rows.length, 0) + style.freeUpgrades.length;
    await expect(page.locator('main li')).toHaveCount(total);

    // AC 6: Scripture of Jas is under every style.
    await expect(page.locator('main li').filter({ hasText: 'Scripture of Jas' })).toHaveCount(1);

    // AC 12: the PVME credit links this style's upgrade-order page and names the licence.
    const pvme = page.locator('[data-notice="pvme"]');
    await expect(pvme.getByRole('link', { name: `PVME's ${name} upgrade order` })).toHaveAttribute(
      'href',
      `https://github.com/pvme/pvme-guides/blob/7a1f15f/upgrading-info/upgrade-order/${name.toLowerCase()}.txt`,
    );
    await expect(pvme).toContainText('CC BY-NC-SA 4.0');
  }
});

test('rows carry the split, alternative and Genesis labels', async ({ page }) => {
  await page.goto('./');
  const row = (name: string) => page.locator('main li').filter({ has: page.getByText(name, { exact: true }) });

  // AC 3: a compound entry, split.
  await expect(row('Abyssal scourge')).toContainText('Split from “Abyssal Scourge + Dark Ice Sliver”');
  // AC 10: alternatives, labelled.
  await expect(row('Dragon claws')).toContainText('Alternative A · one of A / B');
  await expect(row('Malevolence')).toContainText('Alternative B · one of A / B');
  // AC 8, 9.
  await expect(row('Shard of Genesis Essence – Ek-ZekKil')).toContainText('Applied to Ek-ZekKil');
  await expect(row('Annihilation')).toContainText('PVME: “Essence of Finality (Annihilation)”');

  // AC 4: Tumeken's resplendence, one row per piece.
  await styleButton(page, 'Magic').click();
  await expect(page.locator('main li').filter({ hasText: "Tumeken's resplendence" })).toHaveCount(5);
});

test('a stage can be collapsed and opened again', async ({ page }) => {
  await page.goto('./');
  const stageName = styleData('Melee').stages[0]!.name;
  const toggle = page.getByRole('button', { name: new RegExp(`^${escape(stageName)}`) });
  const list = stageList(page, stageName);

  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(list.first()).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(list.first()).toBeHidden();
  await toggle.click();
  await expect(list.first()).toBeVisible();
});

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
