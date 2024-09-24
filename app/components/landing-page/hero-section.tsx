import { Link, useParams } from "@remix-run/react";
import { useTranslation } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";
import { useAppConfig } from "~/routes/($lang)";
import { CodeBlock } from "../content/code-block";
import { Button } from "../ui/button";

export const HeroSection = () => {
  const t = useTranslation();
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const { lang } = useParams();
  const docUrl = getAppUrl({
    lang: lang,
    type: "docs",
    DEFAULT_LANGUAGE,
    LATEST_VERSION,
  });
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {t((l) => l.landingPage.title)}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {t((l) => l.landingPage.subtitle)}
            </p>
          </div>
          <div className="space-x-4 pb-24">
            <Button asChild>
              <Link to={docUrl}>{t((l) => l.landingPage.getStarted)}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="https://github.com/simonboisset/remix-shadcn-docs">
                {t((l) => l.landingPage.viewOnGithub)}
              </Link>
            </Button>
          </div>
          <CodeBlock className="bash max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-start overflow-x-scroll pr-16">
            npx create-remix@latest --template simonboisset/remix-shadcn-docs
          </CodeBlock>
        </div>
      </div>
    </section>
  );
};
