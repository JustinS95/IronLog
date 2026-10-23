// The typed catalogue the stories build on. Pure: no React, no storage, no DOM.
// The data comes from src/generated/catalogue.json, which `npm run data` builds from the BA CSVs.

import generated from '../generated/catalogue.json';
import type { CatalogueData, CatalogueRow, Item, Source, StyleCatalogue, StyleName } from './types.ts';
import { CATALOGUE_FORMAT_VERSION, STYLE_NAMES } from './types.ts';

/** One choice in a "one of" group. An option made of several upgrades needs all of them (D67). */
export interface AlternativeOption {
  option: string;
  rows: CatalogueRow[];
}

/** A "one of" group within one style (D38). */
export interface AlternativeGroup {
  style: StyleName;
  group: string;
  options: AlternativeOption[];
}

export interface Catalogue {
  readonly data: CatalogueData;
  /** The four styles in the order Melee, Ranged, Magic, Necromancy. */
  readonly styles: readonly StyleCatalogue[];
  readonly items: readonly Item[];
  readonly sources: readonly Source[];
  /** Every row: each style's PVME order rows (stage by stage) followed by its Free Upgrades. */
  readonly rows: readonly CatalogueRow[];
  style(name: StyleName): StyleCatalogue;
  /** A style's rows in PVME order, without its Free Upgrades. */
  pvmeRows(name: StyleName): CatalogueRow[];
  item(name: string): Item | undefined;
  source(name: string): Source | undefined;
  alternativeGroups(name: StyleName): AlternativeGroup[];
  /** Every Shard of Genesis Essence row, each linked to its weapon's `inventory_item`. */
  genesisRows(): CatalogueRow[];
}

export function createCatalogue(data: CatalogueData): Catalogue {
  if (data.formatVersion !== CATALOGUE_FORMAT_VERSION) {
    throw new Error(
      `Catalogue data format ${String(data.formatVersion)} isn't supported (expected ${CATALOGUE_FORMAT_VERSION}). Run "npm run data".`,
    );
  }
  const byStyle = new Map(data.styles.map((s) => [s.style, s]));
  for (const name of STYLE_NAMES) {
    if (!byStyle.has(name)) throw new Error(`Catalogue data has no ${name} style. Run "npm run data".`);
  }
  const itemsByName = new Map(data.items.map((i) => [i.name, i]));
  const sourcesByName = new Map(data.sources.map((s) => [s.name, s]));
  const style = (name: StyleName) => byStyle.get(name)!;
  const pvmeRows = (name: StyleName) => style(name).stages.flatMap((s) => s.rows);
  const rows = STYLE_NAMES.flatMap((name) => [...pvmeRows(name), ...style(name).freeUpgrades]);

  return {
    data,
    styles: STYLE_NAMES.map(style),
    items: data.items,
    sources: data.sources,
    rows,
    style,
    pvmeRows,
    item: (name) => itemsByName.get(name),
    source: (name) => sourcesByName.get(name),
    alternativeGroups(name) {
      const groups: AlternativeGroup[] = [];
      for (const row of rows) {
        if (row.style !== name || !row.alternative) continue;
        let group = groups.find((g) => g.group === row.alternative!.group);
        if (!group) {
          group = { style: name, group: row.alternative.group, options: [] };
          groups.push(group);
        }
        let option = group.options.find((o) => o.option === row.alternative!.option);
        if (!option) {
          option = { option: row.alternative.option, rows: [] };
          group.options.push(option);
        }
        option.rows.push(row);
      }
      return groups;
    },
    genesisRows: () => rows.filter((r) => r.genesisWeapon !== null),
  };
}

/** The catalogue built from the BA CSVs. */
export const catalogue: Catalogue = createCatalogue(generated as unknown as CatalogueData);
