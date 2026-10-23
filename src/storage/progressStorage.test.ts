// Saved progress (Issue #18, item 5): save, load, an unknown name, and blocked storage.

import { describe, expect, it } from 'vitest';
import { catalogue } from '../rules/catalogue.ts';
import { emptyProgress, knownProgress } from '../rules/progress.ts';
import type { Progress } from '../rules/progress.ts';
import { PROGRESS_KEY, PROGRESS_VERSION, loadProgress, saveProgress } from './progressStorage.ts';
import type { StorageProvider } from './progressStorage.ts';

/** An in-memory stand-in for localStorage. */
function memoryStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
  };
  return { store, provider: (() => storage) as StorageProvider };
}

// Real catalogue names, taken from the generated catalogue rather than typed in.
const genesisRow = catalogue.genesisRows()[0]!;
const itemWithParts = catalogue.items.find((i) => i.parts.length > 0)!;
const plainItem = catalogue.items.find((i) => i.parts.length === 0)!;

const sample: Progress = {
  ownedItems: [plainItem.name, itemWithParts.name],
  ownedParts: { [itemWithParts.name]: [itemWithParts.parts[0]!.name] },
  shardApplied: [genesisRow.genesisWeapon!],
};

describe('saving progress', () => {
  it('writes one versioned entry keyed by item and part names', () => {
    const { store, provider } = memoryStorage();
    expect(saveProgress(sample, provider)).toBe(true);
    expect(JSON.parse(store.get(PROGRESS_KEY)!)).toEqual({ version: PROGRESS_VERSION, ...sample });
    expect(PROGRESS_KEY).toBe('ironlog:progress');
  });

  it('never overwrites an entry saved in a newer format', () => {
    const newer = JSON.stringify({ version: PROGRESS_VERSION + 1, something: 'new' });
    const { store, provider } = memoryStorage({ [PROGRESS_KEY]: newer });
    expect(saveProgress(sample, provider)).toBe(false);
    expect(store.get(PROGRESS_KEY)).toBe(newer);
  });
});

describe('loading progress', () => {
  it('reads back what was saved', () => {
    const { provider } = memoryStorage();
    saveProgress(sample, provider);
    expect(loadProgress(provider)).toEqual({ status: 'loaded', progress: sample });
  });

  it('starts empty when nothing is saved', () => {
    expect(loadProgress(memoryStorage().provider)).toEqual({ status: 'empty', progress: emptyProgress() });
  });

  it('starts empty, without touching the entry, when it is unreadable', () => {
    const { store, provider } = memoryStorage({ [PROGRESS_KEY]: '{not json' });
    expect(loadProgress(provider)).toEqual({ status: 'unreadable', progress: emptyProgress() });
    expect(store.get(PROGRESS_KEY)).toBe('{not json');
  });

  it('treats a newer format as unreadable', () => {
    const { provider } = memoryStorage({ [PROGRESS_KEY]: JSON.stringify({ version: 99, ownedItems: ['x'] }) });
    expect(loadProgress(provider).status).toBe('unreadable');
  });
});

describe('an unknown name', () => {
  const stored = {
    version: PROGRESS_VERSION,
    ownedItems: [plainItem.name, 'Retired upgrade'],
    ownedParts: { [itemWithParts.name]: [itemWithParts.parts[0]!.name, 'Retired part'], 'Retired upgrade': ['Old part'] },
    shardApplied: [genesisRow.genesisWeapon!, 'Retired weapon'],
  };

  it('is ignored by the rules but kept when progress is saved again', () => {
    const { store, provider } = memoryStorage({ [PROGRESS_KEY]: JSON.stringify(stored) });
    const { status, progress } = loadProgress(provider);
    expect(status).toBe('loaded');

    expect(knownProgress(progress, catalogue)).toEqual({
      ownedItems: [plainItem.name],
      ownedParts: { [itemWithParts.name]: [itemWithParts.parts[0]!.name] },
      shardApplied: [genesisRow.genesisWeapon!],
    });

    // A later save (e.g. after marking another item) must not delete the unknown names.
    saveProgress({ ...progress, ownedItems: [...progress.ownedItems, itemWithParts.name] }, provider);
    const saved = JSON.parse(store.get(PROGRESS_KEY)!);
    expect(saved.ownedItems).toContain('Retired upgrade');
    expect(saved.ownedParts['Retired upgrade']).toEqual(['Old part']);
    expect(saved.ownedParts[itemWithParts.name]).toContain('Retired part');
    expect(saved.shardApplied).toContain('Retired weapon');
  });
});

describe('blocked storage', () => {
  const throwing: StorageProvider = () => {
    throw new DOMException('The operation is insecure.', 'SecurityError');
  };
  const failingCalls: StorageProvider = () => ({
    getItem: () => {
      throw new DOMException('Access denied', 'SecurityError');
    },
    setItem: () => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    },
  });

  it('loads as empty and unavailable when touching storage throws', () => {
    expect(loadProgress(throwing)).toEqual({ status: 'unavailable', progress: emptyProgress() });
  });

  it('loads as empty and unavailable when reading throws', () => {
    expect(loadProgress(failingCalls)).toEqual({ status: 'unavailable', progress: emptyProgress() });
  });

  it('reports a failed save instead of throwing', () => {
    expect(saveProgress(sample, throwing)).toBe(false);
    expect(saveProgress(sample, failingCalls)).toBe(false);
  });

  it('works with the default provider when there is no localStorage at all', () => {
    // Vitest runs in Node, where globalThis.localStorage may be missing or unusable.
    expect(['unavailable', 'empty']).toContain(loadProgress().status);
  });
});
