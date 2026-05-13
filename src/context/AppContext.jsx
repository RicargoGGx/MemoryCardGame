import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang,  setLang]  = useState('en');
  const [theme, setTheme] = useState('dark');

  // Apply theme to <html> so CSS variables cascade everywhere
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = (key) => translations[lang]?.[key] ?? key;

  const toggleLang  = () => setLang( (l) => l === 'en' ? 'es' : 'en');
  const toggleTheme = () => setTheme((t) => t === 'dark' ? 'light' : 'dark');

  return (
    <AppContext.Provider value={{ lang, theme, t, toggleLang, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
