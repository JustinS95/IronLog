import { useState } from 'react';
import { loadProgress } from '../storage/progressStorage.ts';
import { Header } from './Header.tsx';
import { Notices } from './Notices.tsx';

export function App() {
  // Loaded now so a blocked browser storage is exercised from the first page; the stories use it.
  const [{ status }] = useState(() => loadProgress());

  return (
    <div className="page" data-progress-status={status}>
      <Header />
      {/* The stories (#4 onwards) fill the main area. */}
      <main className="page__main" />
      <Notices />
    </div>
  );
}
