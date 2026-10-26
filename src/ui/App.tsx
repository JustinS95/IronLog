import { useMemo, useState } from 'react';
import { catalogue } from '../rules/catalogue.ts';
import type { StyleName } from '../rules/types.ts';
import { upgradeOrder } from '../rules/upgradeOrder.ts';
import { loadProgress } from '../storage/progressStorage.ts';
import { Header } from './Header.tsx';
import { Notices } from './Notices.tsx';
import { UpgradeOrder } from './UpgradeOrder.tsx';

export function App() {
  // Loaded now so a blocked browser storage is exercised from the first page; E2 uses the marks.
  const [{ status }] = useState(() => loadProgress());
  const [style, setStyle] = useState<StyleName>('Melee');
  const view = useMemo(() => upgradeOrder(catalogue, style), [style]);

  return (
    <div className="page" data-progress-status={status}>
      <Header />
      <main className="page__main">
        <UpgradeOrder view={view} onStyleChange={setStyle} />
      </main>
      <Notices style={style} />
    </div>
  );
}
