import { useState, useEffect } from 'react';
import { i18n, Language } from '../utils/i18n';

export const useTranslation = () => {
  const [language, setLanguageState] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    setLanguageState(i18n.getLanguage());
  }, []);

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const setLanguage = (lang: Language) => {
    i18n.setLanguage(lang);
    setLanguageState(lang);
    // Trigger re-render
    window.dispatchEvent(new Event('languagechange'));
  };

  return { t, language, setLanguage };
};
