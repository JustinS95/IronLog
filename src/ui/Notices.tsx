// The three notices every page shows (CLAUDE.md, Tech Approach "Licences and notices").
// Wording and links follow the E1 Upgrade Catalogue mockup linked from Issue #4.

import type { StyleName } from '../rules/types.ts';

/** PVME guides at the commit the catalogue was built from (as linked in the E1 mockup). */
const PVME_UPGRADE_ORDER = 'https://github.com/pvme/pvme-guides/tree/7a1f15f/upgrading-info/upgrade-order';
const pvmeStyleUrl = (style: StyleName) =>
  `https://github.com/pvme/pvme-guides/blob/7a1f15f/upgrading-info/upgrade-order/${style.toLowerCase()}.txt`;

interface NoticesProps {
  /** On a page about one style, the PVME notice links that style's upgrade order (as in the E1 mockup). */
  style?: StyleName;
}

export function Notices({ style }: NoticesProps) {
  return (
    <footer className="site-footer" aria-label="Credits and notices">
      <div className="notices">
        <p data-notice="pvme">
          Upgrade order from{' '}
          <a href={style ? pvmeStyleUrl(style) : PVME_UPGRADE_ORDER}>
            {style ? `PVME's ${style} upgrade order` : "PVME's upgrade order"}
          </a>
          , used under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>. Non-commercial.
        </p>
        <p data-notice="wiki">
          Drop sources, parts and requirements from the <a href="https://runescape.wiki/">RuneScape Wiki</a>, used
          under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC BY-NC-SA 3.0</a>.
        </p>
        <p data-notice="jagex">
          Created using intellectual property belonging to Jagex Limited under the terms of{' '}
          <a href="https://legal.jagex.com/docs/policies/fan-content-policy">Jagex&apos;s Fan Content Policy</a>. This
          content is not endorsed by or affiliated with Jagex.
        </p>
      </div>
    </footer>
  );
}
