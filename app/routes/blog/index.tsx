import { redirect } from "react-router";
import { requireBlogPost } from "~/contents/blog/blog.server";
import { DEFAULT_LANGUAGE, LATEST_VERSION } from "~/contents/docs/doc.server";
import { getAppUrl } from "~/navigation/get-url";
import type { Route } from "./+types/index";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { posts, lang } = requireBlogPost(params);
  const latest = posts[0];
  const url = getAppUrl({
    type: "blog",
    lang,
    slug: latest.slug,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  console.warn("Blog index redirect", url);
  throw redirect(url);
};
