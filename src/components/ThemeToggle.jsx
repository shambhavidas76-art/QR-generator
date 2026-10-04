/**
 * ThemeToggle component.
 * Allows toggling between Chartreuse Light and Ink Dark mode with smooth transitions.
 */
export default function ThemeToggle({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={onToggleTheme}
      title={isDark ? 'Switch to Chartreuse Light Theme' : 'Switch to Ink Dark Theme'}
      aria-label={isDark ? 'Switch to Chartreuse Light Theme' : 'Switch to Ink Dark Theme'}
    >
      <div className={`theme-toggle-track ${isDark ? 'dark' : 'light'}`}>
        <span className="theme-icon sun-icon">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </span>
        <span className="theme-icon moon-icon">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
        <span className="theme-toggle-thumb" />
      </div>
      <span className="theme-label">{isDark ? '✦ Dark' : '✦ Lime'}</span>
    </button>
  );
}
