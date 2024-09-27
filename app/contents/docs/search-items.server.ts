import { getSlug, getTitle } from "./doc.server";

export const getSearchItems = (docs?: Record<string, string> | null) => {
  const searchItems = !docs
    ? []
    : Object.entries(docs).map(([key, content]) => ({
        title: getTitle(content),
        content,
        slug: getSlug(getTitle(content)),
      }));

  return searchItems;
};
