type GetRootUrlPrams = { lang?: string; DEFAULT_LANGUAGE: string; url: string };
const getRootUrl = ({ lang, DEFAULT_LANGUAGE, url }: GetRootUrlPrams) => {
  if (lang === DEFAULT_LANGUAGE || !lang) {
    return url || "/";
  }
  return `/${lang}${url}`;
};

type GetDocUrlParams = {
  lang?: string;
  version?: string;
  slug?: string;
  DEFAULT_LANGUAGE: string;
  LATEST_VERSION: string;
};

const getDocUrl = ({
  lang,
  version,
  DEFAULT_LANGUAGE,
  LATEST_VERSION,
  slug,
}: GetDocUrlParams) => {
  const urlWithLanguage = getRootUrl({ lang, DEFAULT_LANGUAGE, url: "/docs" });
  if (version === LATEST_VERSION || !version) {
    return slug ? `${urlWithLanguage}/${slug}` : urlWithLanguage;
  }
  return slug
    ? `${urlWithLanguage}/v/${version}/${slug}`
    : `${urlWithLanguage}/v/${version}`;
};

export const getAppUrl = ({
  type,
  lang,
  version,
  slug,
  DEFAULT_LANGUAGE,
  LATEST_VERSION,
}: {
  type?: "docs" | "blog";
  lang?: string;
  version?: string;
  slug?: string;
  DEFAULT_LANGUAGE: string;
  LATEST_VERSION: string;
}) => {
  if (type === "docs") {
    return getDocUrl({ lang, version, DEFAULT_LANGUAGE, LATEST_VERSION, slug });
  }
  if (type === "blog") {
    return slug
      ? `${getRootUrl({ lang, DEFAULT_LANGUAGE, url: "/blog" })}/${slug}`
      : `${getRootUrl({ lang, DEFAULT_LANGUAGE, url: "/blog" })}`;
  }
  return getRootUrl({ lang, DEFAULT_LANGUAGE, url: slug ? `/${slug}` : "" });
};
