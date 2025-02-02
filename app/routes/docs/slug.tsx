import { redirect, useLoaderData } from "react-router";
import { ArticleContent, processedContent } from "~/components/content/article";
import {
  DEFAULT_LANGUAGE,
  getDocSummaries,
  LATEST_VERSION,
  requireDoc,
} from "~/contents/docs/doc.server";
import { getAppUrl } from "~/navigation/get-url";
import type { Route } from "./+types/slug";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { docs, lang, version } = requireDoc(params);

  const summaries = getDocSummaries({ docs, lang, version });

  const slug = params.slug;
  const summary = summaries.flat.find((doc) => doc.slug === slug);
  if (!summary) {
    console.warn("No summary found for slug", slug);
    throw redirect(
      getAppUrl({
        type: "docs",
        lang,
        version,
        DEFAULT_LANGUAGE,
        LATEST_VERSION,
      })
    );
  }

  const doc = docs[summary.number];
  const nextArticle =
    summaries.flat[
      summaries.flat.findIndex((doc) => doc.number === summary.number) + 1
    ];
  const previousArticle =
    summaries.flat[
      summaries.flat.findIndex((doc) => doc.number === summary.number) - 1
    ];
  const content = await processedContent(doc);

  return {
    ...content,
    nextArticle,
    previousArticle,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <ArticleContent type="docs" {...data} />;
}
