const getAppUrlWithLanguage = ({lang, DEFAULT_LANGUAGE}: {lang?: string; DEFAULT_LANGUAGE: string}) => {
  if (lang === DEFAULT_LANGUAGE || !lang) {
    return ``;
  }
  return `/${lang}`;
};

const getAppUrlWithVersion = ({
  type,
  lang,
  version,
  DEFAULT_LANGUAGE,
  LATEST_VERSION,
  slug,
}: {
  type?: 'docs' | 'blog';
  lang?: string;
  version?: string;
  DEFAULT_LANGUAGE: string;
  LATEST_VERSION: string;
  slug?: string;
}) => {
  const urlWithLanguage = getAppUrlWithLanguage({lang, DEFAULT_LANGUAGE});
  if (!type) {
    return urlWithLanguage || '/';
  }
  if (type === 'blog') {
    return slug ? `${urlWithLanguage}/blog/${slug}` : `${urlWithLanguage}/blog`;
  }
  if (version === LATEST_VERSION || !version) {
    return `${urlWithLanguage}/docs`;
  }
  return `${urlWithLanguage}/docs/v/${version}`;
};

export const getAppUrl = ({
  type,
  lang,
  version,
  slug,
  DEFAULT_LANGUAGE,
  LATEST_VERSION,
}: {
  type?: 'docs' | 'blog';
  lang?: string;
  version?: string;
  slug?: string;
  DEFAULT_LANGUAGE: string;
  LATEST_VERSION: string;
}) => {
  const urlWithVersion = getAppUrlWithVersion({type, lang, version, DEFAULT_LANGUAGE, LATEST_VERSION, slug});
  if (!type || type === 'blog') {
    return urlWithVersion;
  }

  if (slug) {
    return `${urlWithVersion}/${slug}`;
  }

  return urlWithVersion;
};
