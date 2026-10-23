// Saves and loads the player's marks in one versioned localStorage entry.
// Every read and write is wrapped: if the browser blocks storage the app keeps working, unsaved.

import { emptyProgress } from '../rules/progress.ts';
import type { Progress } from '../rules/progress.ts';

export const PROGRESS_KEY = 'ironlog:progress';
export const PROGRESS_VERSION = 1;

/** What is written to localStorage. */
export interface StoredProgressV1 extends Progress {
  version: typeof PROGRESS_VERSION;
}

export type LoadStatus =
  /** Saved progress was read. */
  | 'loaded'
  /** Nothing saved yet. */
  | 'empty'
  /** The browser blocked storage; the app works without saving. */
  | 'unavailable'
  /** Something is saved but it isn't readable (bad JSON, or a newer format). It is left untouched. */
  | 'unreadable';

export interface LoadResult {
  status: LoadStatus;
  progress: Progress;
}

/** Returns the storage to use. May throw: some browsers throw just for touching localStorage. */
export type StorageProvider = () => Pick<Storage, 'getItem' | 'setItem'>;

const browserStorage: StorageProvider = () => globalThis.localStorage;

const strings = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

/** Reads a stored entry. Unknown names are kept; filtering is the rules module's job. */
function parseStored(raw: string): Progress | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (v.version !== PROGRESS_VERSION) return null;
  const ownedParts: Record<string, string[]> = {};
  if (typeof v.ownedParts === 'object' && v.ownedParts !== null && !Array.isArray(v.ownedParts)) {
    for (const [item, parts] of Object.entries(v.ownedParts as Record<string, unknown>)) {
      const list = strings(parts);
      if (list.length > 0) ownedParts[item] = list;
    }
  }
  return { ownedItems: strings(v.ownedItems), ownedParts, shardApplied: strings(v.shardApplied) };
}

export function loadProgress(getStorage: StorageProvider = browserStorage): LoadResult {
  let raw: string | null;
  try {
    raw = getStorage().getItem(PROGRESS_KEY);
  } catch {
    return { status: 'unavailable', progress: emptyProgress() };
  }
  if (raw === null) return { status: 'empty', progress: emptyProgress() };
  const progress = parseStored(raw);
  if (progress === null) return { status: 'unreadable', progress: emptyProgress() };
  return { status: 'loaded', progress };
}

/**
 * Saves progress. Returns false if it couldn't be saved: storage blocked or full, or the saved entry
 * is in a newer format than this app knows (it is never overwritten, so no one loses marks).
 */
export function saveProgress(progress: Progress, getStorage: StorageProvider = browserStorage): boolean {
  try {
    const storage = getStorage();
    const existing = storage.getItem(PROGRESS_KEY);
    if (existing !== null && isNewerFormat(existing)) return false;
    const stored: StoredProgressV1 = {
      version: PROGRESS_VERSION,
      ownedItems: progress.ownedItems,
      ownedParts: progress.ownedParts,
      shardApplied: progress.shardApplied,
    };
    storage.setItem(PROGRESS_KEY, JSON.stringify(stored));
    return true;
  } catch {
    return false;
  }
}

function isNewerFormat(raw: string): boolean {
  try {
    const v = JSON.parse(raw) as { version?: unknown };
    return typeof v.version === 'number' && v.version > PROGRESS_VERSION;
  } catch {
    return false;
  }
}
