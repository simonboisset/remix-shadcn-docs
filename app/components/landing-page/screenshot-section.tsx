import { Link, useParams } from "@remix-run/react";
import { useTranslation } from "~/contents/i18n/translator";
import { getAppUrl } from "~/navigation/get-url";
import { useAppConfig } from "~/routes/($lang)";
import { Button } from "../ui/button";
import screenshot from "./screenshot.png";
export const ScreenshotSection = () => {
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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t((l) => l.landingPage.screenshotSection.title)}
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {t((l) => l.landingPage.screenshotSection.description)}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link to={docUrl}>
                  {t((l) => l.landingPage.screenshotSection.getStarted)}
                </Link>
              </Button>
            </div>
          </div>
          <img
            className="mx-auto rounded-xl border shadow-xl"
            src={screenshot}
            alt="screenshot"
          />
        </div>
      </div>
    </section>
  );
};
