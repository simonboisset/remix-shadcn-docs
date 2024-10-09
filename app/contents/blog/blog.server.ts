import { redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { getAppUrl } from "../../navigation/get-url";
import {
  DEFAULT_LANGUAGE,
  getTitle,
  Language,
  languageSchema,
  LATEST_VERSION,
  LinkTree,
} from "../docs/doc.server";
import { en } from "./en";
import { fr } from "./fr";

export const blog = { en, fr };

export const getBlogPosts = (lang: Language): LinkTree[] => {
  return blog[lang]
    .map((post) => ({
      href: getAppUrl({
        DEFAULT_LANGUAGE,
        lang,
        LATEST_VERSION,
        type: "blog",
        slug: post.slug,
      }),
      title: getTitle(post.content),
      slug: post.slug,
      date: post.date,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getBlogContent = (slug: string, lang: Language) => {
  return blog[lang].find((post) => post.slug === slug);
};

export const requireBlogPost = (params: Params) => {
  const { lang, slug } = params;
  const redirectUrl = getAppUrl({
    type: "blog",
    lang,
    slug,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  const { success: successLang, data: validLanguage } =
    languageSchema.safeParse(lang || DEFAULT_LANGUAGE);
  const mustRedirect = lang === DEFAULT_LANGUAGE || !successLang;

  if (mustRedirect) {
    throw redirect(redirectUrl);
  }

  const posts = getBlogPosts(validLanguage);
  if (!posts) {
    throw redirect(
      getAppUrl({
        type: "blog",
        lang: validLanguage,
        LATEST_VERSION,
        DEFAULT_LANGUAGE,
      })
    );
  }

  return { posts, lang: validLanguage };
};
