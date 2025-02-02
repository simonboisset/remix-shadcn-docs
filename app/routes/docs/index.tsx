import { redirect } from "react-router";
import {
  DEFAULT_LANGUAGE,
  getDocSummaries,
  LATEST_VERSION,
  requireDoc,
} from "~/contents/docs/doc.server";
import { getAppUrl } from "~/navigation/get-url";
import type { Route } from "./+types/index";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { docs, lang, version } = requireDoc(params);
  const summaries = getDocSummaries({ docs, lang, version });
  const latest = summaries.flat[0];
  const url = getAppUrl({
    type: "docs",
    lang,
    version,
    slug: latest.slug,
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  console.warn("Docs index redirect", url);
  throw redirect(url);
};
