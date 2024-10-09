import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/content/layout";
import { requireBlogPost } from "~/contents/blog/blog.server";
import {
  DEFAULT_LANGUAGE,
  getDocs,
  LATEST_VERSION,
} from "~/contents/docs/doc.server";
import { getSearchItems } from "~/contents/docs/search-items.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { posts } = requireBlogPost(params);
  const docs = getDocs({
    version: LATEST_VERSION,
    language: params.lang || DEFAULT_LANGUAGE,
  });
  const searchItems = getSearchItems(docs);
  return { posts, searchItems };
};

export default function Index() {
  const { posts, searchItems } = useLoaderData<typeof loader>();
  return (
    <ContentLayout linksTree={posts} searchItems={searchItems}>
      <Outlet />
    </ContentLayout>
  );
}
