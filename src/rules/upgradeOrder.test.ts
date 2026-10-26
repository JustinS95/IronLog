// IL-E1-01 (#4): each acceptance criterion's example, checked against the real catalogue.

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseCsvTable } from '../pipeline/csv.ts';
import { catalogue } from './catalogue.ts';
import { STYLE_NAMES } from './types.ts';
import type { StyleName } from './types.ts';
import { upgradeOrder } from './upgradeOrder.ts';
import type { UpgradeOrderView, UpgradeRowView } from './upgradeOrder.ts';

const readCsv = (path: string) =>
  parseCsvTable(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'), path, []).records;
const csvRows = readCsv('ba/catalogue/ironlog_catalogue_v1.csv');
const pvmeEntries = readCsv('ba/discovery/data/pvme_entries.csv');

const views = Object.fromEntries(STYLE_NAMES.map((s) => [s, upgradeOrder(catalogue, s)])) as Record<
  StyleName,
  UpgradeOrderView
>;
const pvmeRowsOf = (v: UpgradeOrderView) => v.stages.flatMap((s) => s.rows);
const allRowsOf = (v: UpgradeOrderView) => [...pvmeRowsOf(v), ...v.freeUpgrades];
const named = (v: UpgradeOrderView, name: string) => allRowsOf(v).filter((r) => r.name === name);
const one = (v: UpgradeOrderView, name: string): UpgradeRowView => {
  const rows = named(v, name);
  expect(rows, name).toHaveLength(1);
  return rows[0]!;
};

describe('AC 1: exactly the style\'s rows from the approved catalogue', () => {
  it.each([
    ['Melee', 39, 1],
    ['Ranged', 34, 2],
    ['Magic', 39, 2],
    ['Necromancy', 17, 2],
  ] as const)('%s shows %i upgrades in PVME order plus %i Free Upgrade(s)', (style, pvme, free) => {
    expect(views[style].pvmeCount).toBe(pvme);
    expect(views[style].freeCount).toBe(free);
    expect(pvmeRowsOf(views[style])).toHaveLength(pvme);
    expect(views[style].freeUpgrades).toHaveLength(free);
  });

  it.each(STYLE_NAMES)('%s rows match the catalogue CSV one for one, in order', (style) => {
    const expected = csvRows.filter((r) => r.style === style).map((r) => `${r.entry_id} ${r.upgrade}`);
    const shown = [...pvmeRowsOf(views[style]), ...views[style].freeUpgrades].map((r) => `${r.entryId} ${r.name}`);
    expect(shown).toEqual(expected);
  });

  it('gives every row a unique key within its style', () => {
    for (const style of STYLE_NAMES) {
      const keys = allRowsOf(views[style]).map((r) => r.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});

describe('AC 2: PVME stage headings, PVME order within each stage', () => {
  it.each(STYLE_NAMES)('%s has stages 1-3 under PVME\'s own headings', (style) => {
    const expected = [...new Set(csvRows.filter((r) => r.style === style && r.stage !== '').map((r) => r.stage_name))];
    expect(views[style].stages.map((s) => s.name)).toEqual(expected);
    expect(views[style].stages.map((s) => s.number)).toEqual([1, 2, 3]);
  });

  it('puts Melee Stage 1 rows in PVME\'s entry order', () => {
    const ids = views.Melee.stages[0]!.rows.map((r) => r.entryId);
    expect(ids).toEqual([...ids].sort());
    expect(ids[0]).toBe('M1-01');
  });
});

describe('AC 3: a compound entry shows each item as its own upgrade', () => {
  it('splits "Abyssal Scourge + Dark Ice Sliver" into two upgrades at M1-03', () => {
    const rows = pvmeRowsOf(views.Melee).filter((r) => r.entryId === 'M1-03');
    expect(rows.map((r) => r.name)).toEqual(['Abyssal scourge', 'Dark ice sliver']);
    for (const r of rows) expect(r.entryLabel).toBe('Split from “Abyssal Scourge + Dark Ice Sliver”');
  });
});

describe('AC 4: an armour set shows one upgrade per piece', () => {
  it('shows Tumeken\'s resplendence as five upgrades', () => {
    const rows = pvmeRowsOf(views.Magic).filter((r) => r.name.includes("Tumeken's resplendence"));
    expect(rows).toHaveLength(5);
    expect(new Set(rows.map((r) => r.entryId))).toEqual(new Set(['G2-07']));
    for (const r of rows) expect(r.entryLabel).toBe('Split from “Tumeken\'s resplendence set”');
  });
});

describe('AC 5: excluded items don\'t appear', () => {
  it.each(['Planted Feet', 'Decimation', 'Obliteration', "Asylum Surgeon's Ring"])('%s appears in no style', (name) => {
    for (const style of STYLE_NAMES) {
      expect(allRowsOf(views[style]).some((r) => r.name.toLowerCase().includes(name.toLowerCase()))).toBe(false);
    }
  });

  it('shows no PVME entry whose items are all excluded', () => {
    const catalogueEntries = new Set(csvRows.map((r) => r.entry_id));
    const excludedEntries = pvmeEntries.map((e) => e.entry_id!).filter((id) => !catalogueEntries.has(id));
    expect(excludedEntries.length).toBeGreaterThan(0);
    const shownEntries = new Set(STYLE_NAMES.flatMap((s) => allRowsOf(views[s]).map((r) => r.entryId)));
    for (const id of excludedEntries) expect(shownEntries.has(id), id).toBe(false);
  });
});

describe('AC 6: an upgrade on several styles\' lists appears in each', () => {
  it('shows Scripture of Jas under all four styles', () => {
    for (const style of STYLE_NAMES) expect(named(views[style], 'Scripture of Jas'), style).toHaveLength(1);
  });
});

describe('AC 8: each Shard of Genesis Essence entry is an upgrade to its weapon', () => {
  it('names the Melee shard with Ek-ZekKil', () => {
    expect(one(views.Melee, 'Shard of Genesis Essence – Ek-ZekKil').genesisLabel).toBe('Applied to Ek-ZekKil');
  });

  it('gives Necromancy one shard each for the Omni guard and the Soulbound lantern', () => {
    const shards = allRowsOf(views.Necromancy).filter((r) => r.genesisLabel !== null);
    expect(shards.map((r) => r.name)).toEqual([
      'Shard of Genesis Essence – Omni guard',
      'Shard of Genesis Essence – Soulbound lantern',
    ]);
    expect(shards.map((r) => r.genesisLabel)).toEqual(['Applied to Omni guard', 'Applied to Soulbound lantern']);
  });

  it('labels only Genesis rows', () => {
    for (const style of STYLE_NAMES) {
      for (const r of allRowsOf(views[style])) {
        expect(r.genesisLabel !== null).toBe(r.name.startsWith('Shard of Genesis Essence'));
      }
    }
  });
});

describe('AC 9: the Melee Essence of Finality (Annihilation) entry is the Annihilation upgrade', () => {
  it('shows Annihilation at M2-07, credited to PVME\'s entry', () => {
    const row = one(views.Melee, 'Annihilation');
    expect(row.entryId).toBe('M2-07');
    expect(row.entryLabel).toBe('PVME: “Essence of Finality (Annihilation)”');
  });
});

describe('AC 10: every option of a choice appears at the entry\'s position, labelled', () => {
  it('labels Dragon claws / Varanus\' mercy as alternatives A and B', () => {
    expect(one(views.Melee, 'Dragon claws').alternativeLabel).toBe('Alternative A · one of A / B');
    expect(one(views.Melee, "Varanus' mercy").alternativeLabel).toBe('Alternative B · one of A / B');
  });

  it('labels Eclipsed Soul + Divine Rage together as A, and Malevolence as B', () => {
    expect(one(views.Melee, 'Eclipsed Soul prayer codex').alternativeLabel).toBe(
      'Alternative A (with Divine Rage prayer codex) · one of A / B',
    );
    expect(one(views.Melee, 'Divine Rage prayer codex').alternativeLabel).toBe(
      'Alternative A (with Eclipsed Soul prayer codex) · one of A / B',
    );
    expect(one(views.Melee, 'Malevolence').alternativeLabel).toBe('Alternative B · one of A / B');
  });

  it('keeps the options together at the entry\'s position', () => {
    const ids = pvmeRowsOf(views.Melee).map((r) => r.entryId);
    const first = ids.indexOf('M3-03');
    expect(ids.slice(first, first + 3)).toEqual(['M3-03', 'M3-03', 'M3-03']);
  });

  it('doesn\'t repeat PVME\'s "alternative choice" note on alternative rows', () => {
    expect(one(views.Melee, 'Dragon claws').pvmeNote).toBeNull();
  });

  it('labels no row as an alternative unless the catalogue says so', () => {
    const altCount = csvRows.filter((r) => r.alternative_group !== '').length;
    const labelled = STYLE_NAMES.flatMap((s) => allRowsOf(views[s])).filter((r) => r.alternativeLabel !== null);
    expect(labelled).toHaveLength(altCount);
  });
});

describe('AC 11: a separate Free Upgrades section per style', () => {
  const amulet = "Amulet of the forsaken (for Berserker's Fury)";
  it.each([
    ['Melee', [amulet]],
    ['Ranged', [amulet, 'Igneous Kal-Xil']],
    ['Magic', [amulet, 'Igneous Kal-Mej']],
    ['Necromancy', [amulet, 'Igneous Kal-Mor']],
  ] as const)('%s Free Upgrades: %j', (style, names) => {
    expect(views[style].freeUpgrades.map((r) => r.name)).toEqual(names);
  });

  it('keeps Igneous Kal-Ket in Melee Stage 1, not in Free Upgrades', () => {
    expect(views.Melee.stages[0]!.rows.some((r) => r.name === 'Igneous Kal-Ket')).toBe(true);
    expect(views.Melee.freeUpgrades.some((r) => r.name === 'Igneous Kal-Ket')).toBe(false);
  });

  it('keeps Free Upgrades out of the stages', () => {
    for (const style of STYLE_NAMES) {
      for (const r of pvmeRowsOf(views[style])) expect(r.entryId.startsWith('FU-'), r.name).toBe(false);
    }
  });
});

describe('row labels', () => {
  it('credits an entry PVME words differently, but not one that only differs in capitals', () => {
    expect(one(views.Melee, 'Cinderbane gloves').entryLabel).toBe('PVME: “Cinderbanes”');
    expect(one(views.Melee, "Laniakea's spear").entryLabel).toBeNull();
  });

  it('shows PVME\'s own note', () => {
    expect(one(views.Melee, 'Igneous Kal-Ket').pvmeNote).toBe('listed as free');
  });
});
