import { describe, expect, it } from 'vitest';
import { CsvError, parseCsvRows, parseCsvTable } from './csv.ts';

describe('parseCsvRows', () => {
  it('reads plain, quoted and empty fields', () => {
    expect(parseCsvRows('a,b,c\n1,"two, too",\n')).toEqual([
      ['a', 'b', 'c'],
      ['1', 'two, too', ''],
    ]);
  });

  it('reads doubled quotes, newlines inside quotes, CRLF and a BOM', () => {
    expect(parseCsvRows('﻿name,note\r\n"Say ""hi""","line 1\nline 2"\r\n')).toEqual([
      ['name', 'note'],
      ['Say "hi"', 'line 1\nline 2'],
    ]);
  });

  it('skips blank lines and copes with no final newline', () => {
    expect(parseCsvRows('a\n\n1')).toEqual([['a'], ['1']]);
  });

  it('rejects an unterminated quote', () => {
    expect(() => parseCsvRows('a\n"oops')).toThrow(CsvError);
  });
});

describe('parseCsvTable', () => {
  it('maps rows to columns and trims values', () => {
    const t = parseCsvTable('x,y\n 1 ,2\n', 'f.csv', ['x']);
    expect(t.records).toEqual([{ x: '1', y: '2' }]);
  });

  it('names the file and the missing column', () => {
    expect(() => parseCsvTable('x\n1\n', 'f.csv', ['x', 'y'])).toThrow('f.csv: missing column(s) "y"');
  });

  it('names the file and row when a row has the wrong number of fields', () => {
    expect(() => parseCsvTable('x,y\n1\n', 'f.csv', [])).toThrow('f.csv: data row 1 has 1 fields but the header has 2');
  });
});
