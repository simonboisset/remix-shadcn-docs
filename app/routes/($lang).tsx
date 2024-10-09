import {
  LoaderFunctionArgs,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import { Outlet, useMatches } from "@remix-run/react";
import { createTranslator } from "typed-locale";
import { WEBSITE_TITLE } from "~/contents/const";
import {
  DEFAULT_LANGUAGE,
  languageSchema,
  LATEST_VERSION,
  versions,
} from "~/contents/docs/doc.server";
import { dictionary, TranslationProvider } from "~/contents/i18n/translator";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  const validLang = languageSchema.safeParse(lang).data ?? DEFAULT_LANGUAGE;

  return {
    dictionary: dictionary[validLang].landingPage,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
    versions,
  } as const;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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

  const root = matches.find((match) => match.id === "routes/($lang)")?.data as
    | SerializeFrom<Awaited<ReturnType<typeof loader>>>
    | undefined;
  const { DEFAULT_LANGUAGE, LATEST_VERSION, versions } = root ?? {
    DEFAULT_LANGUAGE: "en",
    LATEST_VERSION: "0.4.2",
    versions: ["0.4.2"],
  };
  return { DEFAULT_LANGUAGE, LATEST_VERSION, versions };
};
