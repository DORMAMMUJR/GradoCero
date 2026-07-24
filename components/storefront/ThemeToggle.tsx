'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '@/lib/theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const currentTheme = resolveInitialTheme(
      document.documentElement.dataset.theme ?? null,
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    setTheme(currentTheme);
    document.documentElement.dataset.theme = currentTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  const nextThemeLabel = theme === 'dark' ? 'claro' : 'oscuro';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center text-neutral-400 transition hover:text-white"
      aria-label={`Cambiar a tema ${nextThemeLabel}`}
      title={`Cambiar a tema ${nextThemeLabel}`}
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" className="size-5" />
      ) : (
        <Moon aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}
