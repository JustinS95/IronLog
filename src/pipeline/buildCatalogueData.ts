// Turns the five BA data files into the one typed data file the app loads, and refuses broken data.
// Pure: takes file contents as strings and returns data (or throws). The CLI in scripts/build-data.ts
// does the file reading and writing. Checks follow "Data inputs" in ba/plans/Tech_Approach_IronLog_v1.md.

import { CsvError, parseCsvTable } from './csv.ts';
import {
  CATALOGUE_FORMAT_VERSION,
  SECTION_FREE,
  SECTION_PVME,
  STYLE_NAMES,
} from '../rules/types.ts';
import type {
  CatalogueData,
  CatalogueRow,
  Item,
  Part,
  Section,
  Source,
  Stage,
  StyleCatalogue,
  StyleName,
} from '../rules/types.ts';

/** Paths of the five inputs, relative to the repository root. */
export const DATA_FILES = {
  catalogue: 'ba/catalogue/ironlog_catalogue_v1.csv',
  sources: 'ba/catalogue/ironlog_sources_v1.csv',
  itemSources: 'ba/catalogue/ironlog_item_sources_v1.csv',
  parts: 'ba/discovery/data/parts.csv',
  inventory: 'ba/discovery/data/upgrade_inventory_review.csv',
} as const;

export type DataFileKey = keyof typeof DATA_FILES;
export type DataInputs = Record<DataFileKey, string>;

/** The `inventory_item` of the Shard of Genesis Essence rows (D16, D18). */
export const GENESIS_ITEM = 'Shard of Genesis Essence';
/** Genesis rows are named "Shard of Genesis Essence – <weapon>" in the catalogue's `upgrade` column. */
export const GENESIS_SEPARATOR = ' – ';

const REQUIRED_COLUMNS: Record<DataFileKey, readonly string[]> = {
  catalogue: [
    'style',
    'section',
    'stage',
    'stage_name',
    'entry_id',
    'entry_order',
    'pvme_entry_text',
    'upgrade',
    'inventory_item',
    'alternative_group',
    'alternative_option',
    'pvme_notes',
    'needed_in_style',
  ],
  sources: ['source', 'source_type', 'hard_mode'],
  itemSources: ['inventory_item', 'part', 'source', 'source_type'],
  parts: ['item', 'part_name', 'part_quantity_needed'],
  inventory: ['item', 'access_requirements', 'wiki_url'],
};

/** Thrown when the data breaks a rule the stories rely on. `problems` lists every problem found. */
export class DataCheckError extends Error {
  readonly problems: string[];
  constructor(problems: string[]) {
    super(
      `The BA catalogue data failed ${problems.length} check(s):\n` + problems.map((p) => `  - ${p}`).join('\n'),
    );
    this.name = 'DataCheckError';
    this.problems = problems;
  }
}

const isStyle = (s: string): s is StyleName => (STYLE_NAMES as readonly string[]).includes(s);
const isSection = (s: string): s is Section => s === SECTION_PVME || s === SECTION_FREE;
const positiveInt = (s: string): number | null => (/^[1-9]\d*$/.test(s) ? Number(s) : null);
const orNull = (s: string): string | null => (s === '' ? null : s);

function table(inputs: DataInputs, key: DataFileKey) {
  try {
    return parseCsvTable(inputs[key], DATA_FILES[key], REQUIRED_COLUMNS[key]).records;
  } catch (e) {
    if (e instanceof CsvError) throw new DataCheckError([e.message]);
    throw e;
  }
}

export function buildCatalogueData(inputs: DataInputs): CatalogueData {
  const catalogueRecords = table(inputs, 'catalogue');
  const sourceRecords = table(inputs, 'sources');
  const itemSourceRecords = table(inputs, 'itemSources');
  const partRecords = table(inputs, 'parts');
  const inventoryRecords = table(inputs, 'inventory');

  const problems: string[] = [];
  const cat = DATA_FILES.catalogue;

  // ---- Sources -----------------------------------------------------------------------------
  const sources: Source[] = [];
  const sourceByName = new Map<string, Source>();
  sourceRecords.forEach((r, i) => {
    const where = `${DATA_FILES.sources} row ${i + 1}`;
    if (r.source === '') {
      problems.push(`${where}: the source name is blank`);
      return;
    }
    if (r.hard_mode !== 'yes' && r.hard_mode !== 'no') {
      problems.push(`${where} ("${r.source}"): hard_mode must be "yes" or "no", not "${r.hard_mode}"`);
    }
    if (sourceByName.has(r.source!)) {
      problems.push(`${where}: source "${r.source}" is listed more than once`);
      return;
    }
    const s: Source = { name: r.source!, type: r.source_type!, hardMode: r.hard_mode === 'yes' };
    sources.push(s);
    sourceByName.set(s.name, s);
  });

  // ---- Catalogue rows ----------------------------------------------------------------------
  const rows: CatalogueRow[] = [];
  catalogueRecords.forEach((r, i) => {
    const where = `${cat} row ${i + 1} (${r.entry_id || 'no entry_id'} "${r.upgrade}")`;
    const bad = (msg: string) => problems.push(`${where}: ${msg}`);
    const style = r.style!;
    const section = r.section!;
    if (!isStyle(style)) return bad(`unknown style "${style}" (expected ${STYLE_NAMES.join(', ')})`);
    if (!isSection(section)) return bad(`unknown section "${section}" (expected "${SECTION_PVME}" or "${SECTION_FREE}")`);
    if (r.upgrade === '') return bad('the upgrade name is blank');
    if (r.inventory_item === '') return bad('inventory_item is blank');
    if (r.entry_id === '') return bad('entry_id is blank');

    let stage: number | null = null;
    let stageName: string | null = null;
    if (section === SECTION_PVME) {
      stage = positiveInt(r.stage!);
      stageName = orNull(r.stage_name!);
      if (stage === null) return bad(`a PVME order row needs a stage number, not "${r.stage}"`);
      if (stageName === null) return bad('a PVME order row needs a stage_name');
    }
    const neededInStyle = positiveInt(r.needed_in_style!);
    if (neededInStyle === null) return bad(`needed_in_style must be a whole number of 1 or more, not "${r.needed_in_style}"`);
    const entryOrder = r.entry_order === '' ? null : positiveInt(r.entry_order!);
    if (r.entry_order !== '' && entryOrder === null) return bad(`entry_order must be a whole number, not "${r.entry_order}"`);

    const group = r.alternative_group!;
    const option = r.alternative_option!;
    if ((group === '') !== (option === '')) {
      return bad('alternative_group and alternative_option must both be set or both be blank');
    }

    rows.push({
      style,
      section,
      stage,
      stageName,
      entryId: r.entry_id!,
      entryOrder,
      pvmeEntryText: r.pvme_entry_text!,
      upgrade: r.upgrade!,
      item: r.inventory_item!,
      alternative: group === '' ? null : { group, option },
      pvmeNotes: orNull(r.pvme_notes!),
      neededInStyle,
      genesisWeapon: null,
    });
  });

  const catalogueItems = new Set(rows.map((r) => r.item));

  // ---- Check: a "one of" group with only one option ----------------------------------------
  const optionsByGroup = new Map<string, Set<string>>();
  for (const r of rows) {
    if (!r.alternative) continue;
    const key = `${r.style}|${r.alternative.group}`;
    if (!optionsByGroup.has(key)) optionsByGroup.set(key, new Set());
    optionsByGroup.get(key)!.add(r.alternative.option);
  }
  for (const [key, options] of optionsByGroup) {
    if (options.size < 2) {
      const [style, group] = key.split('|');
      problems.push(
        `${cat}: ${style} "one of" group ${group} has only one option (${[...options].join(', ')}); a choice needs at least two`,
      );
    }
  }

  // ---- Check: a Genesis row whose weapon isn't an upgrade in the catalogue ------------------
  const itemByUpgradeName = new Map<string, string>();
  for (const r of rows) if (r.item !== GENESIS_ITEM) itemByUpgradeName.set(r.upgrade, r.item);
  for (const r of rows) {
    if (r.item !== GENESIS_ITEM) continue;
    const prefix = GENESIS_ITEM + GENESIS_SEPARATOR;
    const weapon = r.upgrade.startsWith(prefix) ? r.upgrade.slice(prefix.length).trim() : '';
    if (weapon === '') {
      problems.push(
        `${cat}: ${r.style} ${r.entryId} Genesis row "${r.upgrade}" doesn't name its weapon as "${prefix}<weapon>"`,
      );
      continue;
    }
    const weaponItem = itemByUpgradeName.get(weapon);
    if (weaponItem === undefined) {
      problems.push(
        `${cat}: ${r.style} ${r.entryId} Genesis row "${r.upgrade}" names weapon "${weapon}", which isn't an upgrade in the catalogue`,
      );
      continue;
    }
    r.genesisWeapon = weaponItem;
  }

  // ---- Item sources and parts --------------------------------------------------------------
  const directSources = new Map<string, string[]>();
  const partSources = new Map<string, Map<string, string[]>>();
  itemSourceRecords.forEach((r, i) => {
    const where = `${DATA_FILES.itemSources} row ${i + 1} ("${r.inventory_item}"${r.part ? `, part "${r.part}"` : ''})`;
    const item = r.inventory_item!;
    const source = sourceByName.get(r.source!);
    if (!source) {
      problems.push(`${where}: names source "${r.source}", which isn't in ${DATA_FILES.sources}`);
      return;
    }
    if (r.source_type !== '' && r.source_type !== source.type) {
      problems.push(`${where}: gives "${r.source}" type "${r.source_type}" but ${DATA_FILES.sources} says "${source.type}"`);
    }
    if (!catalogueItems.has(item)) {
      problems.push(`${where}: "${item}" isn't an inventory_item in ${cat}`);
      return;
    }
    const add = (list: string[]) => {
      if (!list.includes(source.name)) list.push(source.name);
    };
    if (r.part === '') {
      if (!directSources.has(item)) directSources.set(item, []);
      add(directSources.get(item)!);
    } else {
      if (!partSources.has(item)) partSources.set(item, new Map());
      const byPart = partSources.get(item)!;
      if (!byPart.has(r.part!)) byPart.set(r.part!, []);
      add(byPart.get(r.part!)!);
    }
  });

  // Quantities for tracked parts, keyed by item and part name.
  const quantityByPart = new Map<string, string>();
  for (const r of partRecords) {
    const key = `${r.item}|${r.part_name}`;
    if (!quantityByPart.has(key)) quantityByPart.set(key, r.part_quantity_needed!);
  }

  const inventoryByItem = new Map<string, Record<string, string>>();
  for (const r of inventoryRecords) if (!inventoryByItem.has(r.item!)) inventoryByItem.set(r.item!, r);

  // ---- Items (first-appearance order) ------------------------------------------------------
  const items: Item[] = [];
  for (const name of catalogueItems) {
    const parts: Part[] = [];
    for (const [partName, srcs] of partSources.get(name) ?? []) {
      const raw = quantityByPart.get(`${name}|${partName}`);
      const quantity = raw === undefined ? null : positiveInt(raw);
      if (quantity === null) {
        problems.push(
          raw === undefined
            ? `${DATA_FILES.parts}: tracked part "${partName}" of "${name}" has no row, so it has no quantity`
            : `${DATA_FILES.parts}: tracked part "${partName}" of "${name}" has quantity "${raw}"; it needs a whole number of 1 or more`,
        );
        continue;
      }
      parts.push({ name: partName, quantity, sources: srcs });
    }
    const own = directSources.get(name) ?? [];

    // Check: a catalogue row whose inventory_item has no sources.
    if (own.length === 0 && (partSources.get(name)?.size ?? 0) === 0) {
      const where = rows
        .filter((r) => r.item === name)
        .map((r) => `${r.style} ${r.entryId}`)
        .join(', ');
      problems.push(`${cat}: "${name}" (${where}) has no sources in ${DATA_FILES.itemSources}`);
    }

    const inv = inventoryByItem.get(name);
    if (!inv) {
      problems.push(`${DATA_FILES.inventory}: no row for catalogue item "${name}", so it has no wiki link or requirements`);
      continue;
    }
    if (inv.wiki_url === '') {
      problems.push(`${DATA_FILES.inventory}: catalogue item "${name}" has a blank wiki_url`);
    }
    items.push({
      name,
      wikiUrl: inv.wiki_url!,
      accessRequirements: orNull(inv.access_requirements!),
      sources: own,
      parts,
    });
  }

  if (problems.length > 0) throw new DataCheckError(problems);

  // ---- Group rows by style and stage, keeping CSV (PVME) order -----------------------------
  const styles: StyleCatalogue[] = STYLE_NAMES.map((style) => {
    const stages: Stage[] = [];
    const freeUpgrades: CatalogueRow[] = [];
    for (const r of rows) {
      if (r.style !== style) continue;
      if (r.section === SECTION_FREE) {
        freeUpgrades.push(r);
        continue;
      }
      let stage = stages.find((s) => s.number === r.stage);
      if (!stage) {
        stage = { number: r.stage!, name: r.stageName!, rows: [] };
        stages.push(stage);
      }
      stage.rows.push(r);
    }
    stages.sort((a, b) => a.number - b.number);
    return { style, stages, freeUpgrades };
  });

  return { formatVersion: CATALOGUE_FORMAT_VERSION, styles, items, sources };
}
