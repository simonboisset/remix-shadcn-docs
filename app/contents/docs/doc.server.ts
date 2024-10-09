import { redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { z } from "zod";
import { getAppUrl } from "../../navigation/get-url";
import { v0_0_1 } from "./v0.0.1";
import { v1_0_0 } from "./v1.0.0";
export const DEFAULT_LANGUAGE = "en";

export const doc = {
  v1_0_0,
  v0_0_1,
};

type InferVersionKeyToNumber<T> = T extends `v${infer C}`
  ? InferVersionKeyToNumber<C>
  : T extends `${infer C}_${infer Rest}`
  ? `${C}.${InferVersionKeyToNumber<Rest>}`
  : T;

export type Version = InferVersionKeyToNumber<keyof typeof doc>;
export type Language = keyof (typeof doc)[keyof typeof doc];
export const languages: Language[] = ["en", "fr"];
export const languageSchema = z.enum(languages as [Language]);

export const getDocs = ({
  version,
  language,
}: {
  version: string;
  language: string;
}): Record<string, string> | null => {
  const versionKey = `v${version}`.replaceAll(".", "_") as keyof typeof doc;
  const docWithVersion = doc[versionKey] as
    | Record<Language, Record<string, string>>
    | undefined;
  if (!docWithVersion) {
    return null;
  }
  const docWithLanguage = docWithVersion[language as Language] as
    | Record<string, string>
    | undefined;
  if (!docWithLanguage) {
    return null;
  }
  return docWithLanguage;
};

export type FlatSummary = {
  slug: string;
  number: string;
  title: string;
};

export type LinkTree = {
  href: string;
  title: string;
  children?: LinkTree[];
  slug: string;
};

export const getDocSummaries = ({
  docs,
  lang,
  version,
}: {
  docs: Record<string, string>;
  lang: Language;
  version: Version;
}): {
  flat: FlatSummary[];
  tree: LinkTree[];
  lang: Language;
  version: Version;
} => {
  const flat: FlatSummary[] = [];
  const tree: LinkTree[] = [];

  for (const key in docs) {
    if (Object.prototype.hasOwnProperty.call(docs, key)) {
      const doc = docs[key] as string;

      const title = getTitle(doc);
      let slug = getSlug(title);
      const slugAlreadyExist = flat.some((item) => item.slug === slug);
      if (slugAlreadyExist) {
        slug = `${slug}-${key}`;
      }
      flat.push({
        slug,
        number: key,
        title,
      });
    }
  }
  flat.sort((a, b) => sortVersionAsc(a.number, b.number));
  tree.push(
    ...buildTree({ lang, version, items: flat, parent: "", used: [] }).tree
  );
  return { flat, tree, lang, version };
};

export const getTitle = (doc: string) => {
  return doc.split("\n")[0].replace("# ", "");
};

export const getSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const buildTree = ({
  lang,
  version,
  items,
  parent,
  used,
}: {
  lang: Language;
  version: Version;
  items: FlatSummary[];
  parent: string;
  used: string[];
}): { tree: LinkTree[]; added: string[] } => {
  const tree: LinkTree[] = [];
  const allreadyUsed = [...used];

  for (const item of items) {
    if (
      item.number.startsWith(parent) &&
      item.number !== parent &&
      !allreadyUsed.includes(item.number)
    ) {
      const { tree: children, added } = buildTree({
        lang,
        version,
        items,
        parent: item.number,
        used: allreadyUsed,
      });
      const child: LinkTree = {
        href: getAppUrl({
          type: "docs",
          lang,
          version,
          slug: item.slug,
          DEFAULT_LANGUAGE,
          LATEST_VERSION,
        }),
        title: item.title,
        children,
        slug: item.slug,
      };
      tree.push(child);
      allreadyUsed.push(...added, item.number);
    }
  }

  return { tree, added: allreadyUsed };
};
const sortVersionDesc = (a: string, b: string) => {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (aParts[i] < bParts[i]) {
      return 1;
    }
    if (aParts[i] > bParts[i]) {
      return -1;
    }
  }
  return 0;
};

const sortVersionAsc = (a: string, b: string) => {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (aParts[i] < bParts[i]) {
      return -1;
    }
    if (aParts[i] > bParts[i]) {
      return 1;
    }
  }
  return 0;
};

export const versions = Object.keys(doc)
  .map((version) => version.replace("v", "").replaceAll("_", "."))
  .sort(sortVersionDesc) as Version[];
export const versionSchema = z.enum(versions as [Version]);
export const LATEST_VERSION = versions[0];

export const requireDoc = (params: Params) => {
  const { lang, version, slug } = params;
  const redirectUrl = getAppUrl({
    type: "docs",
    lang,
    version,
    slug,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(lang || DEFAULT_LANGUAGE);
  const { success: successVersion, data: validVersion } =
    versionSchema.safeParse(version || LATEST_VERSION);
  const mustRedirect =
    lang === DEFAULT_LANGUAGE ||
    !successLang ||
    !successVersion ||
    version === LATEST_VERSION;

  if (mustRedirect) {
    throw redirect(redirectUrl);
  }

  const docs = getDocs({ version: validVersion, language: validLanguage });
  if (!docs) {
    throw redirect(
      getAppUrl({
        type: "docs",
        lang: validLanguage,
        version: validVersion,
        LATEST_VERSION,
        DEFAULT_LANGUAGE,
      })
    );
  }

  return { docs, lang: validLanguage, version: validVersion };
};
