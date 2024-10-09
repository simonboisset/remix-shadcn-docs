import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { requireBlogPost } from "~/contents/blog/blog.server";
import { DEFAULT_LANGUAGE, LATEST_VERSION } from "~/contents/docs/doc.server";
import { getAppUrl } from "~/navigation/get-url";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { posts, lang } = requireBlogPost(params);
  const latest = posts[0];
  const url = getAppUrl({
    type: "blog",
    lang,
    slug: latest.slug,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  throw redirect(url);
};
