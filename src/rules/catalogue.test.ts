// Row counts and order of the typed catalogue, checked against the BA catalogue (Issue #18, item 4).

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseCsvTable } from '../pipeline/csv.ts';
import { catalogue } from './catalogue.ts';
import { STYLE_NAMES } from './types.ts';

// The raw catalogue, read independently of the build step, to compare order against.
const csvRows = parseCsvTable(
  readFileSync(new URL('../../ba/catalogue/ironlog_catalogue_v1.csv', import.meta.url), 'utf8'),
  'catalogue',
  [],
).records;

describe('catalogue row counts', () => {
  it('has 136 rows in all', () => {
    expect(catalogue.rows).toHaveLength(136);
    expect(csvRows).toHaveLength(136);
  });

  it.each([
    ['Melee', 39, 1],
    ['Ranged', 34, 2],
    ['Magic', 39, 2],
    ['Necromancy', 17, 2],
  ] as const)('%s has %i rows in PVME order plus %i Free Upgrade(s)', (style, pvme, free) => {
    expect(catalogue.pvmeRows(style)).toHaveLength(pvme);
    expect(catalogue.style(style).freeUpgrades).toHaveLength(free);
  });

  it('has 111 tracked items and 76 sources', () => {
    expect(catalogue.items).toHaveLength(111);
    expect(catalogue.sources).toHaveLength(76);
  });
});

describe('catalogue order', () => {
  it.each(STYLE_NAMES)('%s rows are in PVME order, as in the catalogue CSV', (style) => {
    const expected = csvRows
      .filter((r) => r.style === style && r.section === 'PVME order')
      .map((r) => `${r.entry_id} ${r.upgrade}`);
    expect(catalogue.pvmeRows(style).map((r) => `${r.entryId} ${r.upgrade}`)).toEqual(expected);
  });

  it.each(STYLE_NAMES)('%s has stages 1, 2, 3 with PVME headings', (style) => {
    const stages = catalogue.style(style).stages;
    expect(stages.map((s) => s.number)).toEqual([1, 2, 3]);
    for (const s of stages) expect(s.name).toMatch(new RegExp(`^Stage ${s.number}: `));
  });

  it.each(STYLE_NAMES)('%s Free Upgrades match the catalogue CSV', (style) => {
    const expected = csvRows.filter((r) => r.style === style && r.section === 'Free Upgrades').map((r) => r.upgrade);
    expect(catalogue.style(style).freeUpgrades.map((r) => r.upgrade)).toEqual(expected);
  });
});

describe('typed catalogue', () => {
  it('gives every row an item with a wiki link and at least one source', () => {
    for (const row of catalogue.rows) {
      const item = catalogue.item(row.item);
      expect(item, row.item).toBeDefined();
      expect(item!.wikiUrl).toMatch(/^https:\/\//);
      expect(item!.sources.length + item!.parts.length, row.item).toBeGreaterThan(0);
    }
  });

  it('resolves every source name used by an item or part', () => {
    for (const item of catalogue.items) {
      for (const name of [...item.sources, ...item.parts.flatMap((p) => p.sources)]) {
        expect(catalogue.source(name), `${item.name}: ${name}`).toBeDefined();
      }
    }
  });

  it('links every Genesis row to a weapon that is itself a catalogue upgrade', () => {
    const genesis = catalogue.genesisRows();
    expect(genesis.length).toBeGreaterThan(0);
    for (const row of genesis) {
      expect(catalogue.rows.some((r) => r.item === row.genesisWeapon && r.style === row.style)).toBe(true);
    }
  });

  it('exposes "one of" groups with at least two options each', () => {
    const groups = STYLE_NAMES.flatMap((s) => catalogue.alternativeGroups(s));
    expect(groups.length).toBeGreaterThan(0);
    for (const g of groups) expect(g.options.length).toBeGreaterThanOrEqual(2);
  });
});
