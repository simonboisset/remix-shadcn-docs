import { blog } from "~/contents/blog/blog.server";
import {
  DEFAULT_LANGUAGE,
  doc,
  getSlug,
  getTitle,
  LATEST_VERSION,
} from "~/contents/docs/doc.server";
import { DOCS_DOMAIN } from "~/navigation/domain";

export const loader = async () => {
  const allDocs = doc;
  const allArticles = blog;
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().split("T")[0];

  const docsUrls: string[] = [];
  for (const version in allDocs) {
    // @ts-expect-error
    for (const lang in allDocs[version]) {
      // @ts-expect-error
      const docs = allDocs[version][lang] as typeof allDocs.v0_4_0.en;
      for (const key in docs) {
        const slug = getSlug(getTitle(docs[key as keyof typeof docs]));
        const versionUrl = version.replace("v", "").replaceAll("_", ".");
        if (versionUrl === LATEST_VERSION) {
          if (lang === DEFAULT_LANGUAGE) {
            docsUrls.push(`
              <url>
                <loc>${DOCS_DOMAIN}/docs/${slug}</loc>
                <lastmod>${currentDateFormated}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
              </url>
            `);
          } else {
            docsUrls.push(`
              <url>
              <loc>${DOCS_DOMAIN}/${lang}/docs/${slug}</loc>
              <lastmod>${currentDateFormated}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `);
          }
        } else {
          if (lang === DEFAULT_LANGUAGE) {
            docsUrls.push(`
              <url>
                <loc>${DOCS_DOMAIN}/docs/v/${versionUrl}/${slug}</loc>
                <lastmod>${currentDateFormated}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
              </url>
            `);
          } else {
            docsUrls.push(`
              <url>
              <loc>${DOCS_DOMAIN}/${lang}/docs/v/${versionUrl}/${slug}</loc>
              <lastmod>${currentDateFormated}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `);
          }
        }
      }
    }
  }

  const blogUrls = Object.keys(allArticles)
    .map((lang) => {
      const safeLang = lang as keyof typeof allArticles;
      if (lang === DEFAULT_LANGUAGE) {
        return allArticles[DEFAULT_LANGUAGE].map((article) => {
          return `
          <url>
            <loc>${DOCS_DOMAIN}/blog/${article.slug}</loc>
            <lastmod>${currentDateFormated}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
        });
      }
      return allArticles[safeLang].map((article) => {
        return `
        <url>
          <loc>${DOCS_DOMAIN}/${lang}/blog/${article.slug}</loc>
          <lastmod>${currentDateFormated}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
      });
    })
    .filter((v) => !!v)
    .flat();

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOCS_DOMAIN}</loc>
        <lastmod>${currentDateFormated}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${DOCS_DOMAIN}/fr</loc>
        <lastmod>${currentDateFormated}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
      ${docsUrls.join("")}
      ${blogUrls.join("")}
    </urlset>
  `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
