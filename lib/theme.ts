export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'grado-cero-theme';

export function resolveInitialTheme(
  savedTheme: string | null,
  systemPrefersDark: boolean,
): Theme {
  return 'dark';
}

export const themeInitScript = `
  try {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('${THEME_STORAGE_KEY}', 'dark');
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
`;
