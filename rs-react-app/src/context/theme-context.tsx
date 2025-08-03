import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Theme, ThemeContextType } from './type';
import { DARK, LIGHT } from './constant';

const initialState: ThemeContextType = {
  theme: LIGHT,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialState);

export default ThemeContext;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(LIGHT);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
