import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Link, useParams } from "react-router";
import { remark } from "remark";
import html from "remark-html";
import { useTranslation } from "~/contents/i18n/translator";
import { cn } from "~/lib/utils";
import { getAppUrl } from "~/navigation/get-url";
import { useAppConfig } from "~/routes/layout";
import { ChevronLeft } from "../icons/chevron-left";
import { ChevronRight } from "../icons/chevron-right";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CodeBlock } from "./code-block";
import {
  DesktopTableOfContents,
  MobileTableOfContents,
} from "./table-of-contents";

export const processedContent = async (content: string) => {
  const result = await remark().use(html).process(content);

  const processedContent = result
    .toString()
    .replace(/<(h[1-6])>(.*?)<\/h[1-6]>/g, (_, tag, content) => {
      if (tag === "h1") return "";
      return `<${tag} data-heading="${content}" class="scroll-mt-20">${content}</${tag}>`;
    })
    .replace(
      /<pre><code class="(language-[^"]+)">([\s\S]+?)<\/code><\/pre>/g,
      (_, className, code) => {
        return `<div class="code-block" data-language="${className}">${code}</div>`;
      }
    );

  const headings = content?.match(/^#{1,3} .+$/gm) || [];
  const description = content
    ?.split("\n")
    .slice(1, 3)
    .join(" ")
    .trim()
    .substring(0, 160);
  const tocItems = headings.map((heading) => {
    const level = heading?.match(/^#+/)?.[0]?.length ?? 0;
    const text = heading?.replace(/^#+\s/, "");
    return { text, level };
  });

  const title = headings[0]?.replace(/^#+\s/, "");
  return { content: processedContent, toc: tocItems, title, description };
};

type ArticleContentProps = Awaited<ReturnType<typeof processedContent>> & {
  type: "docs" | "blog";
  nextArticle?: {
    slug: string;
    title: string;
  };
  previousArticle?: {
    slug: string;
    title: string;
  };
};

export const ArticleContent = ({
  content,
  toc,
  title,
  nextArticle,
  previousArticle,
  type,
}: ArticleContentProps) => {
  const { lang, version } = useParams();
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const t = useTranslation();
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".code-block");
    codeBlocks.forEach((block) => {
      const language = block.getAttribute("data-language");
      const code = block.textContent || "";
      const root = document.createElement("div");
      block.parentNode?.replaceChild(root, block);
      createRoot(root).render(
        <CodeBlock className={language || ""}>{code}</CodeBlock>
      );
    });
  }, [content]);

  const estimatedReadingTime = Math.ceil(content.split(/\s+/).length / 200);

  return (
    <>
      <main className="w-full max-w-2xl pb-16 mx-auto">
        <h1
          data-heading={title}
          className="text-4xl font-bold mb-4 scroll-mt-20"
        >
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t((l) =>
            l.article.estimatedReadingTime({ count: estimatedReadingTime })
          )}
        </p>
        <div
          className={cn(
            "text-foreground prose prose-headings:text-foreground prose-strong:text-primary",
            "max-w-none prose-img:rounded-lg prose-img:border prose-img:shadow-lg prose-img:mx-auto",
            "prose-code:px-1 prose-code:py-0.5 prose-code:text-primary prose-code:font-bold  prose-code:after:content-none",
            "prose-code:rounded-sm prose-code:border prose-code:border-primary prose-code:before:content-none"
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex mt-8 gap-4">
          {previousArticle ? (
            <Link
              to={getAppUrl({
                lang,
                version,
                slug: previousArticle.slug,
                DEFAULT_LANGUAGE,
                LATEST_VERSION,
                type,
              })}
              className="group flex-1"
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardDescription className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary">
                    <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {t((l) => l.article.previous)}
                  </CardDescription>
                  <CardTitle className="text-base sm:text-lg font-semibold mt-2 group-hover:text-primary">
                    {previousArticle.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextArticle ? (
            <Link
              to={getAppUrl({
                type,
                lang,
                version,
                slug: nextArticle.slug,
                DEFAULT_LANGUAGE,
                LATEST_VERSION,
              })}
              className="group flex-1"
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardDescription className="flex items-center justify-end text-sm font-medium text-muted-foreground group-hover:text-primary">
                    {t((l) => l.article.next)}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </CardDescription>
                  <CardTitle className=" text-base sm:text-lg font-semibold mt-2 text-right group-hover:text-primary">
                    {nextArticle.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </main>
      <DesktopTableOfContents toc={toc} />
      <MobileTableOfContents toc={toc} />
    </>
  );
};
