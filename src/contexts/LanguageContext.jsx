import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

function getInitialLang() {
  try {
    const saved = localStorage.getItem('tel-urmood-lang');
    if (saved === 'en' || saved === 'id') return saved;
  } catch {}
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('tel-urmood-lang', l); } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
