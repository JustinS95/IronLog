export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="site-header__logo"
        >
          <path d="M4 5h16v14H4z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
        <span className="site-header__name">IronLog</span>
      </div>
    </header>
  );
}
