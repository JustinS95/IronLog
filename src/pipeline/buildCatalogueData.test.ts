// Each data check gets a small broken fixture. The fixtures use made-up names, not catalogue data:
// they only need the same columns as the real files.

import { describe, expect, it } from 'vitest';
import { DataCheckError, buildCatalogueData } from './buildCatalogueData.ts';
import type { DataInputs } from './buildCatalogueData.ts';

const CATALOGUE_HEADER =
  'style,section,stage,stage_name,entry_id,entry_order,pvme_entry_text,upgrade,inventory_item,alternative_group,alternative_option,pvme_notes,needed_in_style';

/** A small, valid set of the five files. Tests break one thing at a time. */
function validInputs(): DataInputs {
  return {
    catalogue: [
      CATALOGUE_HEADER,
      'Melee,PVME order,1,Stage 1: Test,M1-01,1,Test sword,Test sword,Test sword,,,,1',
      'Melee,PVME order,1,Stage 1: Test,M1-02,2,Shard (use on sword),Shard of Genesis Essence – Test sword,Shard of Genesis Essence,,,,1',
      'Melee,PVME order,2,Stage 2: Test,M2-01,1,Ring A or Ring B,Ring A,Ring A,M2-01,A,alternative choice,1',
      'Melee,PVME order,2,Stage 2: Test,M2-01,1,Ring A or Ring B,Ring B,Ring B,M2-01,B,alternative choice,1',
      'Melee,Free Upgrades,,,FU-1,,Free amulet,Free amulet,Free amulet,,,,1',
      'Ranged,PVME order,1,Stage 1: Test,R1-01,1,Test bow,Test bow,Test bow,,,,1',
      'Magic,PVME order,1,Stage 1: Test,G1-01,1,Test staff,Test staff,Test staff,,,,1',
      'Necromancy,PVME order,1,Stage 1: Test,N1-01,1,Test lantern,Test lantern,Test lantern,,,,1',
    ].join('\n'),
    sources: [
      'source,source_type,hard_mode',
      'Test boss,Boss,no',
      'Test boss (Hard Mode),Boss,yes',
      'Test creature,Slayer creature,no',
    ].join('\n'),
    itemSources: [
      'inventory_item,part,source,source_type',
      'Test sword,Sword blade,Test boss,Boss',
      'Test sword,Sword hilt,Test boss (Hard Mode),Boss',
      'Shard of Genesis Essence,,Test boss,Boss',
      'Ring A,,Test creature,Slayer creature',
      'Ring B,,Test creature,Slayer creature',
      'Free amulet,,Test boss,Boss',
      'Test bow,,Test boss,Boss',
      'Test staff,,Test boss,Boss',
      'Test lantern,,Test boss,Boss',
    ].join('\n'),
    parts: [
      'item,part_name,part_quantity_needed',
      'Test sword,Sword blade,1',
      'Test sword,Sword hilt,10',
      'Untracked thing,Untracked part,',
    ].join('\n'),
    inventory: [
      'item,access_requirements,wiki_url',
      'Test sword,90 Attack,https://runescape.wiki/w/Test_sword',
      'Shard of Genesis Essence,,https://runescape.wiki/w/Shard',
      'Ring A,,https://runescape.wiki/w/Ring_A',
      'Ring B,,https://runescape.wiki/w/Ring_B',
      'Free amulet,,https://runescape.wiki/w/Free_amulet',
      'Test bow,,https://runescape.wiki/w/Test_bow',
      'Test staff,,https://runescape.wiki/w/Test_staff',
      'Test lantern,,https://runescape.wiki/w/Test_lantern',
    ].join('\n'),
  };
}

function problemsFor(inputs: DataInputs): string[] {
  try {
    buildCatalogueData(inputs);
  } catch (e) {
    if (e instanceof DataCheckError) return e.problems;
    throw e;
  }
  throw new Error('Expected the data build to fail, but it passed');
}

const replaceLine = (text: string, from: string, to: string) => {
  if (!text.includes(from)) throw new Error(`Fixture line not found: ${from}`);
  return text.replace(from, to);
};
const dropLine = (text: string, line: string) => replaceLine(text, line + '\n', '').replace('\n' + line, '');

describe('buildCatalogueData with valid data', () => {
  const data = buildCatalogueData(validInputs());

  it('groups rows by style and stage and keeps Free Upgrades apart', () => {
    const melee = data.styles[0]!;
    expect(data.styles.map((s) => s.style)).toEqual(['Melee', 'Ranged', 'Magic', 'Necromancy']);
    expect(melee.stages.map((s) => [s.number, s.name, s.rows.length])).toEqual([
      [1, 'Stage 1: Test', 2],
      [2, 'Stage 2: Test', 2],
    ]);
    expect(melee.freeUpgrades.map((r) => r.upgrade)).toEqual(['Free amulet']);
  });

  it('joins sources, parts with quantities, requirements and wiki links', () => {
    const sword = data.items.find((i) => i.name === 'Test sword')!;
    expect(sword).toEqual({
      name: 'Test sword',
      wikiUrl: 'https://runescape.wiki/w/Test_sword',
      accessRequirements: '90 Attack',
      sources: [],
      parts: [
        { name: 'Sword blade', quantity: 1, sources: ['Test boss'] },
        { name: 'Sword hilt', quantity: 10, sources: ['Test boss (Hard Mode)'] },
      ],
    });
    expect(data.sources.find((s) => s.name === 'Test boss (Hard Mode)')?.hardMode).toBe(true);
  });

  it('links a Genesis row to its weapon and keeps alternatives', () => {
    const rows = data.styles[0]!.stages.flatMap((s) => s.rows);
    expect(rows.find((r) => r.item === 'Shard of Genesis Essence')?.genesisWeapon).toBe('Test sword');
    expect(rows.filter((r) => r.alternative).map((r) => r.alternative)).toEqual([
      { group: 'M2-01', option: 'A' },
      { group: 'M2-01', option: 'B' },
    ]);
  });
});

describe('buildCatalogueData checks (Tech Approach, "Data inputs")', () => {
  it('fails when a catalogue row\'s inventory_item has no sources', () => {
    const inputs = validInputs();
    inputs.itemSources = dropLine(inputs.itemSources, 'Test bow,,Test boss,Boss');
    expect(problemsFor(inputs)).toEqual([
      'ba/catalogue/ironlog_catalogue_v1.csv: "Test bow" (Ranged R1-01) has no sources in ba/catalogue/ironlog_item_sources_v1.csv',
    ]);
  });

  it('fails when an item-source row names a source that isn\'t in the sources file', () => {
    const inputs = validInputs();
    inputs.itemSources = replaceLine(inputs.itemSources, 'Sword hilt,Test boss (Hard Mode)', 'Sword hilt,Missing boss');
    expect(problemsFor(inputs)).toEqual([
      'ba/catalogue/ironlog_item_sources_v1.csv row 2 ("Test sword", part "Sword hilt"): names source "Missing boss", which isn\'t in ba/catalogue/ironlog_sources_v1.csv',
    ]);
  });

  it('fails when a tracked part has no quantity row', () => {
    const inputs = validInputs();
    inputs.parts = dropLine(inputs.parts, 'Test sword,Sword hilt,10');
    expect(problemsFor(inputs)).toEqual([
      'ba/discovery/data/parts.csv: tracked part "Sword hilt" of "Test sword" has no row, so it has no quantity',
    ]);
  });

  it('fails when a tracked part\'s quantity is blank', () => {
    const inputs = validInputs();
    inputs.parts = replaceLine(inputs.parts, 'Test sword,Sword hilt,10', 'Test sword,Sword hilt,');
    expect(problemsFor(inputs)).toEqual([
      'ba/discovery/data/parts.csv: tracked part "Sword hilt" of "Test sword" has quantity ""; it needs a whole number of 1 or more',
    ]);
  });

  it('fails when a "one of" group has only one option', () => {
    const inputs = validInputs();
    inputs.catalogue = replaceLine(inputs.catalogue, 'Ring B,Ring B,M2-01,B,', 'Ring B,Ring B,M2-01,A,');
    expect(problemsFor(inputs)).toEqual([
      'ba/catalogue/ironlog_catalogue_v1.csv: Melee "one of" group M2-01 has only one option (A); a choice needs at least two',
    ]);
  });

  it('fails when a Genesis row\'s weapon isn\'t an upgrade in the catalogue', () => {
    const inputs = validInputs();
    inputs.catalogue = replaceLine(
      inputs.catalogue,
      'Shard of Genesis Essence – Test sword',
      'Shard of Genesis Essence – Missing sword',
    );
    expect(problemsFor(inputs)).toEqual([
      'ba/catalogue/ironlog_catalogue_v1.csv: Melee M1-02 Genesis row "Shard of Genesis Essence – Missing sword" names weapon "Missing sword", which isn\'t an upgrade in the catalogue',
    ]);
  });
});

describe('buildCatalogueData shape checks', () => {
  it('fails when a file is missing a column', () => {
    const inputs = validInputs();
    inputs.sources = inputs.sources.replace('hard_mode', 'hardmode');
    expect(problemsFor(inputs)).toEqual(['ba/catalogue/ironlog_sources_v1.csv: missing column(s) "hard_mode"']);
  });

  it('fails on an unknown style', () => {
    const inputs = validInputs();
    inputs.catalogue = replaceLine(inputs.catalogue, 'Magic,PVME order', 'Archery,PVME order');
    expect(problemsFor(inputs)[0]).toContain('unknown style "Archery"');
  });

  it('fails when an item-source row names an item that isn\'t in the catalogue', () => {
    const inputs = validInputs();
    inputs.itemSources += '\nStray item,,Test boss,Boss';
    expect(problemsFor(inputs)).toEqual([
      'ba/catalogue/ironlog_item_sources_v1.csv row 10 ("Stray item"): "Stray item" isn\'t an inventory_item in ba/catalogue/ironlog_catalogue_v1.csv',
    ]);
  });

  it('fails when a source type disagrees with the sources file', () => {
    const inputs = validInputs();
    inputs.itemSources = replaceLine(inputs.itemSources, 'Test staff,,Test boss,Boss', 'Test staff,,Test boss,Minigame');
    expect(problemsFor(inputs)[0]).toContain('gives "Test boss" type "Minigame"');
  });

  it('fails when a catalogue item has no wiki row', () => {
    const inputs = validInputs();
    inputs.inventory = dropLine(inputs.inventory, 'Test staff,,https://runescape.wiki/w/Test_staff');
    expect(problemsFor(inputs)).toEqual([
      'ba/discovery/data/upgrade_inventory_review.csv: no row for catalogue item "Test staff", so it has no wiki link or requirements',
    ]);
  });

  it('fails on a hard_mode value other than yes or no', () => {
    const inputs = validInputs();
    inputs.sources = replaceLine(inputs.sources, 'Test creature,Slayer creature,no', 'Test creature,Slayer creature,maybe');
    expect(problemsFor(inputs)[0]).toContain('hard_mode must be "yes" or "no"');
  });

  it('reports every problem at once', () => {
    const inputs = validInputs();
    inputs.itemSources = dropLine(inputs.itemSources, 'Test bow,,Test boss,Boss');
    inputs.parts = dropLine(inputs.parts, 'Test sword,Sword hilt,10');
    const err = (() => {
      try {
        buildCatalogueData(inputs);
      } catch (e) {
        return e as DataCheckError;
      }
      return null;
    })();
    expect(err).toBeInstanceOf(DataCheckError);
    expect(err!.problems).toHaveLength(2);
    expect(err!.message).toMatch(/^The BA catalogue data failed 2 check\(s\):\n {2}- /);
  });
});
