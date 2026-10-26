// The player's marks, as plain data. Storage (src/storage/) saves and loads this shape;
// the rules that read it belong to the E2–E4 stories. Pure: no React, no storage, no DOM.

import type { Catalogue } from './catalogue.ts';

/**
 * Everything is keyed by `inventory_item` and part name, never by row or entry ID, so a catalogue
 * change doesn't scramble saved marks (Tech Approach, "Saved progress").
 */
export interface Progress {
  /** `inventory_item` names the player owns. One item counts in every style it appears in. */
  ownedItems: string[];
  /** Owned tracked parts: `inventory_item` -> part names. Parts are tracked per upgrade (D60). */
  ownedParts: Record<string, string[]>;
  /** Weapons (`inventory_item`) with a Shard of Genesis Essence applied (D16). */
  shardApplied: string[];
}

export function emptyProgress(): Progress {
  return { ownedItems: [], ownedParts: {}, shardApplied: [] };
}

/**
 * The marks that still match the catalogue. Names that no longer exist are left out here, but the
 * saved progress keeps them (storage never deletes them), so they come back if the name returns.
 */
export function knownProgress(progress: Progress, catalogue: Catalogue): Progress {
  const ownedParts: Record<string, string[]> = {};
  for (const [itemName, parts] of Object.entries(progress.ownedParts)) {
    const item = catalogue.item(itemName);
    if (!item) continue;
    const known = parts.filter((p) => item.parts.some((part) => part.name === p));
    if (known.length > 0) ownedParts[itemName] = known;
  }
  const genesisWeapons = new Set(catalogue.genesisRows().map((r) => r.genesisWeapon));
  return {
    ownedItems: progress.ownedItems.filter((name) => catalogue.item(name) !== undefined),
    ownedParts,
    shardApplied: progress.shardApplied.filter((name) => genesisWeapons.has(name)),
  };
}
