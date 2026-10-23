// Types for the catalogue data file the build step writes (src/generated/catalogue.json).
// Every value in that file comes from the BA CSVs in ba/; nothing here is hand-entered data.

export const STYLE_NAMES = ['Melee', 'Ranged', 'Magic', 'Necromancy'] as const;
export type StyleName = (typeof STYLE_NAMES)[number];

export const SECTION_PVME = 'PVME order';
export const SECTION_FREE = 'Free Upgrades';
export type Section = typeof SECTION_PVME | typeof SECTION_FREE;

/** Bumped when the shape of the generated data file changes. */
export const CATALOGUE_FORMAT_VERSION = 1;

/** One row of ironlog_catalogue_v1.csv: one upgrade instance in one style. */
export interface CatalogueRow {
  style: StyleName;
  section: Section;
  /** PVME stage number; null for Free Upgrades. */
  stage: number | null;
  /** PVME's own stage heading; null for Free Upgrades. */
  stageName: string | null;
  entryId: string;
  /** Position within the stage; null when the CSV leaves it blank (Free Upgrades). */
  entryOrder: number | null;
  pvmeEntryText: string;
  /** What the player sees and tracks. */
  upgrade: string;
  /** `inventory_item`: the key for sources, parts and saved progress. */
  item: string;
  /** Set when the row is one choice in a "one of" group (D38). Rows sharing an option go together. */
  alternative: { group: string; option: string } | null;
  pvmeNotes: string | null;
  neededInStyle: number;
  /** For a Shard of Genesis Essence row: the `inventory_item` of the weapon it is applied to. */
  genesisWeapon: string | null;
}

export interface Stage {
  number: number;
  name: string;
  rows: CatalogueRow[];
}

export interface StyleCatalogue {
  style: StyleName;
  /** Stages in PVME order, each with its rows in PVME order. */
  stages: Stage[];
  /** Shown separately, outside PVME's order (D42). */
  freeUpgrades: CatalogueRow[];
}

/** A tracked part (collection-log part, D32/D39) of an upgrade. */
export interface Part {
  name: string;
  quantity: number;
  sources: string[];
}

export interface Item {
  /** `inventory_item` */
  name: string;
  wikiUrl: string;
  accessRequirements: string | null;
  /** Sources that drop the upgrade itself. */
  sources: string[];
  /** Tracked parts, each with its own sources. */
  parts: Part[];
}

export interface Source {
  name: string;
  type: string;
  hardMode: boolean;
}

export interface CatalogueData {
  formatVersion: typeof CATALOGUE_FORMAT_VERSION;
  /** In the order Melee, Ranged, Magic, Necromancy. */
  styles: StyleCatalogue[];
  /** Every catalogue item, in first-appearance order. */
  items: Item[];
  /** Every source, as listed in ironlog_sources_v1.csv. */
  sources: Source[];
}
