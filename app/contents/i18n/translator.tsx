import { createContext, useContext } from "react";
import { useParams } from "react-router";
import { createTranslatorFromDictionary, type Translator } from "typed-locale";
import { useAppConfig } from "~/routes/layout";
import type { Language } from "../docs/doc.server";
import { en, type Translations } from "./en";
import { fr } from "./fr";

export const dictionary = { en, fr };

export const TranslationContext = createContext(
  {} as { t: Translator<Translations> }
);

export const useTranslation = () => {
  const { t } = useContext(TranslationContext);
  return t;
};

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { DEFAULT_LANGUAGE } = useAppConfig();
  const { lang } = useParams();

  const t = createTranslatorFromDictionary({
    dictionary,
    defaultLocale: DEFAULT_LANGUAGE,
    locale: (lang as Language) || DEFAULT_LANGUAGE,
  });
  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
};
