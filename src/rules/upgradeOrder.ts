// IL-E1-01 (#4): one combat style's upgrades in PVME's order, ready to display.
// Pure: no React, no storage, no DOM. Every label is derived from the catalogue rows, so the
// wording follows the BA catalogue (and matches the approved E1 mockup) with nothing typed in.

import type { Catalogue } from './catalogue.ts';
import type { CatalogueRow, StyleName } from './types.ts';
import { GENESIS_SEPARATOR } from './genesis.ts';

export interface UpgradeRowView {
  /** Unique within the style; stable across renders. */
  key: string;
  entryId: string;
  /** The upgrade's display name. */
  name: string;
  /** `inventory_item`: the key later stories use for marks, sources and icons. */
  item: string;
  /** AC 10: e.g. "Alternative A (with Divine Rage prayer codex) · one of A / B". */
  alternativeLabel: string | null;
  /** AC 8: e.g. "Applied to Ek-ZekKil". */
  genesisLabel: string | null;
  /**
   * AC 3, 4, 9: where the row comes from in PVME. "Split from “…”" for one item of a compound
   * entry or set; "PVME: “…”" when PVME words the entry differently from the upgrade's name.
   */
  entryLabel: string | null;
  /** PVME's own note on the entry. */
  pvmeNote: string | null;
}

export interface StageView {
  number: number;
  /** PVME's own heading, e.g. "Stage 1: Mid-game upgrades (High ROI)". */
  name: string;
  rows: UpgradeRowView[];
}

export interface UpgradeOrderView {
  style: StyleName;
  /** AC 2: PVME's stages in order, each with its rows in PVME order. */
  stages: StageView[];
  /** AC 11: shown separately, outside PVME's stage order. */
  freeUpgrades: UpgradeRowView[];
  /** Number of rows in PVME order (excludes Free Upgrades). */
  pvmeCount: number;
  freeCount: number;
}

/** PVME's note on "one of" rows. The alternative label already says it, so it isn't repeated. */
const ALTERNATIVE_NOTE = 'alternative choice';

const quoted = (text: string) => `“${text}”`;

function rowView(row: CatalogueRow, styleRows: readonly CatalogueRow[]): UpgradeRowView {
  const sameEntry = styleRows.filter((r) => r.entryId === row.entryId);

  let alternativeLabel: string | null = null;
  if (row.alternative) {
    const { group, option } = row.alternative;
    const groupRows = styleRows.filter((r) => r.alternative?.group === group);
    const options = [...new Set(groupRows.map((r) => r.alternative!.option))].sort();
    const partners = groupRows.filter((r) => r !== row && r.alternative!.option === option).map((r) => r.upgrade);
    alternativeLabel =
      `Alternative ${option}` +
      (partners.length > 0 ? ` (with ${partners.join(', ')})` : '') +
      ` · one of ${options.join(' / ')}`;
  }

  let genesisLabel: string | null = null;
  if (row.genesisWeapon !== null) {
    const weaponName = row.upgrade.slice(row.upgrade.indexOf(GENESIS_SEPARATOR) + GENESIS_SEPARATOR.length);
    genesisLabel = `Applied to ${weaponName}`;
  }

  let entryLabel: string | null = null;
  if (!row.alternative && sameEntry.length > 1) {
    entryLabel = `Split from ${quoted(row.pvmeEntryText)}`;
  } else if (row.pvmeEntryText !== '' && row.pvmeEntryText.toLowerCase() !== row.upgrade.toLowerCase()) {
    entryLabel = `PVME: ${quoted(row.pvmeEntryText)}`;
  }

  const pvmeNote = row.alternative && row.pvmeNotes === ALTERNATIVE_NOTE ? null : row.pvmeNotes;

  return {
    key: `${row.section}|${row.entryId}|${row.upgrade}`,
    entryId: row.entryId,
    name: row.upgrade,
    item: row.item,
    alternativeLabel,
    genesisLabel,
    entryLabel,
    pvmeNote,
  };
}

/** AC 1: exactly the style's rows from the catalogue, grouped and labelled for display. */
export function upgradeOrder(catalogue: Catalogue, style: StyleName): UpgradeOrderView {
  const styleCatalogue = catalogue.style(style);
  const styleRows = [...catalogue.pvmeRows(style), ...styleCatalogue.freeUpgrades];
  const stages = styleCatalogue.stages.map((stage) => ({
    number: stage.number,
    name: stage.name,
    rows: stage.rows.map((r) => rowView(r, styleRows)),
  }));
  const freeUpgrades = styleCatalogue.freeUpgrades.map((r) => rowView(r, styleRows));
  return {
    style,
    stages,
    freeUpgrades,
    pvmeCount: stages.reduce((n, s) => n + s.rows.length, 0),
    freeCount: freeUpgrades.length,
  };
}
