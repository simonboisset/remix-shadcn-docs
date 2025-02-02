import { Outlet, useLoaderData } from "react-router";
import { ContentLayout } from "~/components/content/layout";
import {
  getDocSummaries,
  getSlug,
  getTitle,
  requireDoc,
} from "~/contents/docs/doc.server";
import type { Route } from "./+types/layout";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { docs, lang, version } = requireDoc(params);
  const { tree } = getDocSummaries({ docs, lang, version });
  const searchItems = !docs
    ? []
    : Object.entries(docs).map(([key, content]) => ({
        title: getTitle(content),
        content,
        slug: getSlug(getTitle(content)),
        version: version,
        lang: lang,
      }));

  return { tree, searchItems };
};

export default function Index() {
  const { tree, searchItems } = useLoaderData<typeof loader>();
  return (
    <ContentLayout linksTree={tree} searchItems={searchItems}>
      <Outlet />
    </ContentLayout>
  );
}
