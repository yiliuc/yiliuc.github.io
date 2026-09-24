/* Runs in the head so a saved theme is applied before the page is painted. */
(() => {
  const key = 'yiliu-cao-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (_) { /* Storage can be blocked. */ }
  let explicit = saved === 'dark' || saved === 'light';
  const root = document.documentElement;
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    const dark = theme === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.querySelector('[data-moon]').toggleAttribute('hidden', dark);
    button.querySelector('[data-sun]').toggleAttribute('hidden', !dark);
  };
  setTheme(explicit ? saved : system.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    button.hidden = false;
    setTheme(root.dataset.theme);
    button.addEventListener('click', () => {
      explicit = true;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem(key, next); } catch (_) { /* Still works for this page. */ }
    });
  });
  system.addEventListener('change', (event) => {
    if (!explicit) setTheme(event.matches ? 'dark' : 'light');
  });
})();
