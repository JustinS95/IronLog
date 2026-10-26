// IL-E1-01 (#4): one combat style's upgrades in PVME's order. Displays what the rules return;
// the grouping and every label come from upgradeOrder() in the rules module.

import { useState } from 'react';
import type { StyleName } from '../rules/types.ts';
import { STYLE_NAMES } from '../rules/types.ts';
import type { UpgradeOrderView, UpgradeRowView } from '../rules/upgradeOrder.ts';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

interface StylePickerProps {
  style: StyleName;
  onChange: (style: StyleName) => void;
}

export function StylePicker({ style, onChange }: StylePickerProps) {
  return (
    <div role="group" aria-label="Combat style" className="style-picker">
      {STYLE_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          className="style-picker__button"
          aria-pressed={name === style}
          onClick={() => onChange(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function UpgradeRow({ row }: { row: UpgradeRowView }) {
  const hasTags = row.alternativeLabel || row.genesisLabel || row.entryLabel || row.pvmeNote;
  return (
    <li className="upgrade" data-entry-id={row.entryId}>
      {/* Neutral placeholder until item icons are imported (IL-E0-02, #19). */}
      <span className="upgrade__icon" aria-hidden="true" />
      <span className="upgrade__entry">{row.entryId}</span>
      <span className="upgrade__body">
        <span className="upgrade__name">{row.name}</span>
        {hasTags && (
          <span className="upgrade__tags">
            {row.alternativeLabel && <span className="tag tag--alternative">{row.alternativeLabel}</span>}
            {row.genesisLabel && <span className="tag tag--genesis">{row.genesisLabel}</span>}
            {row.entryLabel && <span className="tag tag--entry">{row.entryLabel}</span>}
            {row.pvmeNote && <span className="upgrade__note">PVME note: {row.pvmeNote}</span>}
          </span>
        )}
      </span>
    </li>
  );
}

interface StageSectionProps {
  id: string;
  heading: string;
  countText: string;
  rows: UpgradeRowView[];
  free?: boolean;
}

function StageSection({ id, heading, countText, rows, free = false }: StageSectionProps) {
  const [open, setOpen] = useState(true);
  const listId = `${id}-list`;
  const List = free ? 'ul' : 'ol';
  return (
    <section className="stage" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="stage__heading">
        <button
          type="button"
          className="stage__toggle"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="stage__name">{heading}</span>
          <span className="stage__count">
            {countText} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
          </span>
        </button>
      </h2>
      <List id={listId} className={free ? 'upgrades upgrades--free' : 'upgrades'} hidden={!open}>
        {rows.map((row) => (
          <UpgradeRow key={row.key} row={row} />
        ))}
      </List>
    </section>
  );
}

interface UpgradeOrderProps {
  view: UpgradeOrderView;
  onStyleChange: (style: StyleName) => void;
}

export function UpgradeOrder({ view, onStyleChange }: UpgradeOrderProps) {
  const slug = view.style.toLowerCase();
  return (
    <>
      <section className="intro">
        <h1 className="intro__title">{view.style} upgrade order</h1>
        <StylePicker style={view.style} onChange={onStyleChange} />
        <p className="intro__blurb">
          {plural(view.pvmeCount, 'upgrade')} in PVME&apos;s order, plus {plural(view.freeCount, 'Free Upgrade')}.
        </p>
      </section>
      {/* key={view.style}: each style starts with its stages open. */}
      <div key={view.style} className="stages">
        {view.stages.map((stage) => (
          <StageSection
            key={stage.number}
            id={`${slug}-stage-${stage.number}`}
            heading={stage.name}
            countText={plural(stage.rows.length, 'upgrade')}
            rows={stage.rows}
          />
        ))}
        <StageSection
          id={`${slug}-free`}
          heading="Free Upgrades"
          countText={`Outside PVME's stage order · ${plural(view.freeCount, 'upgrade')}`}
          rows={view.freeUpgrades}
          free
        />
      </div>
    </>
  );
}
