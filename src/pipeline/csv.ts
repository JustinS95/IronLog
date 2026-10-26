// A small RFC 4180 CSV reader: quoted fields, doubled quotes, commas and newlines inside quotes,
// CRLF or LF line endings and an optional UTF-8 BOM. Enough for the BA catalogue files.

export class CsvError extends Error {}

/** Parses CSV text into rows of string fields. Blank lines are skipped. */
export function parseCsvRows(text: string): string[][] {
  const src = text.startsWith('﻿') ? text.slice(1) : text;
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  const endRow = () => {
    row.push(field);
    field = '';
    if (!(row.length === 1 && row[0] === '')) rows.push(row);
    row = [];
  };

  while (i < src.length) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      if (field !== '') throw new CsvError(`Unexpected quote inside an unquoted field on line ${rows.length + 1}`);
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\r') {
      if (src[i + 1] === '\n') i += 1;
      endRow();
    } else if (ch === '\n') {
      endRow();
    } else {
      field += ch;
    }
    i += 1;
  }
  if (inQuotes) throw new CsvError('Unterminated quoted field at end of file');
  if (field !== '' || row.length > 0) endRow();
  return rows;
}

export interface CsvTable {
  header: string[];
  /** Each record maps column name to value. */
  records: Record<string, string>[];
}

/**
 * Parses CSV text with a header row. Throws CsvError naming the file when a required column is
 * missing or a row has the wrong number of fields.
 */
export function parseCsvTable(text: string, fileName: string, requiredColumns: readonly string[]): CsvTable {
  let rows: string[][];
  try {
    rows = parseCsvRows(text);
  } catch (e) {
    throw new CsvError(`${fileName}: ${(e as Error).message}`);
  }
  const header = rows[0];
  if (!header) throw new CsvError(`${fileName}: the file is empty`);
  const missing = requiredColumns.filter((c) => !header.includes(c));
  if (missing.length > 0) {
    throw new CsvError(`${fileName}: missing column(s) ${missing.map((m) => `"${m}"`).join(', ')}`);
  }
  const records = rows.slice(1).map((fields, idx) => {
    if (fields.length !== header.length) {
      throw new CsvError(
        `${fileName}: data row ${idx + 1} has ${fields.length} fields but the header has ${header.length}`,
      );
    }
    const rec: Record<string, string> = {};
    header.forEach((col, j) => {
      rec[col] = (fields[j] ?? '').trim();
    });
    return rec;
  });
  return { header, records };
}
