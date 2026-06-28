'use client';

import { useState } from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import { COLOR_THEME_COOKIE_NAME, LIGHT_TOKENS, DARK_TOKENS } from '@/lib/constants';

export default function ColorThemeToggle({
  initialTheme,
}: {
  initialTheme: 'light' | 'dark';
}) {
  const [theme, setTheme] = useState(initialTheme);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    Cookie.set(COLOR_THEME_COOKIE_NAME, next, { expires: 1000 });
    const root = document.documentElement;
    root.setAttribute('data-color-theme', next);
    const tokens = next === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light / dark mode"
      className="text-shadow-light hover:text-highlight-2 transition-colors duration-500 p-1.5"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}
