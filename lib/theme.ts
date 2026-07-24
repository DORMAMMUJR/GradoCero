export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'grado-cero-theme';

export function resolveInitialTheme(
  savedTheme: string | null,
  systemPrefersDark: boolean,
): Theme {
  if (savedTheme) {
    return savedTheme as Theme;
  }
  return 'light';
}

export const themeInitScript = `
  try {
    const saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    const theme = saved ? saved : 'light';
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
`;

