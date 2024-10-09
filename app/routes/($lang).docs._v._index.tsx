import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import {
  DEFAULT_LANGUAGE,
  getDocSummaries,
  LATEST_VERSION,
  requireDoc,
} from "~/contents/docs/doc.server";
import { getAppUrl } from "~/navigation/get-url";

export const loader = async ({ params }: LoaderFunctionArgs) => {
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
  throw redirect(url);
};
