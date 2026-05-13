import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => key;

  const toggleLang = () => setLang((l) => l === 'en' ? 'es' : 'en');

  return (
    <AppContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
