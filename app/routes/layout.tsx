import { Outlet, useMatches } from "react-router";
import { createTranslator } from "typed-locale";
import { WEBSITE_TITLE } from "~/contents/const";
import {
  DEFAULT_LANGUAGE,
  languageSchema,
  LATEST_VERSION,
  versions,
} from "~/contents/docs/doc.server";
import { dictionary, TranslationProvider } from "~/contents/i18n/translator";
import type { Route } from "./+types/layout";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { lang } = params;
  const validLang = languageSchema.safeParse(lang).data ?? DEFAULT_LANGUAGE;

  return {
    dictionary: dictionary[validLang].landingPage,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
    versions,
  } as const;
};

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const t = createTranslator(data.dictionary);
  return [
    { title: WEBSITE_TITLE },
    { name: "description", content: t ? t((l) => l.subtitle) : "" },
  ];
};

export default function Index() {
  return (
    <TranslationProvider>
      <Outlet />
    </TranslationProvider>
  );
}

export const useAppConfig = () => {
  const matches = useMatches();

  const root = matches.find((match) => match.id === "routes/layout")?.data as
    | Awaited<ReturnType<typeof loader>>
    | undefined;
  const { DEFAULT_LANGUAGE, LATEST_VERSION, versions } = root ?? {
    DEFAULT_LANGUAGE: "en",
    LATEST_VERSION: "1.0.0",
    versions: ["1.0.0"],
  };
  return { DEFAULT_LANGUAGE, LATEST_VERSION, versions };
};
