// Build step: reads the five BA data files and writes src/generated/catalogue.json.
// Run with `npm run data` (it also runs automatically before dev, build, typecheck and test).
// It only reads from ba/; it never writes there. Exits with code 1 and a clear message on broken data.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DATA_FILES, DataCheckError, buildCatalogueData } from '../src/pipeline/buildCatalogueData.ts';
import type { DataFileKey, DataInputs } from '../src/pipeline/buildCatalogueData.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = resolve(root, 'src/generated/catalogue.json');

function main(): number {
  const inputs = {} as DataInputs;
  for (const key of Object.keys(DATA_FILES) as DataFileKey[]) {
    const path = resolve(root, DATA_FILES[key]);
    try {
      inputs[key] = readFileSync(path, 'utf8');
    } catch (e) {
      console.error(`IronLog data build failed: can't read ${DATA_FILES[key]} (${(e as Error).message})`);
      return 1;
    }
  }

  try {
    const data = buildCatalogueData(inputs);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n');
    const rowCount = data.styles.reduce(
      (n, s) => n + s.freeUpgrades.length + s.stages.reduce((m, st) => m + st.rows.length, 0),
      0,
    );
    console.log(
      `IronLog data: ${rowCount} catalogue rows, ${data.items.length} items, ${data.sources.length} sources -> src/generated/catalogue.json`,
    );
    return 0;
  } catch (e) {
    if (e instanceof DataCheckError) {
      console.error(`IronLog data build failed.\n${e.message}`);
      return 1;
    }
    throw e;
  }
}

process.exitCode = main();
