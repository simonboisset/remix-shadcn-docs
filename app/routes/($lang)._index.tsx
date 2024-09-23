import { Link } from "@remix-run/react";
import { Header } from "~/components/content/layout";
import { FeaturesSection } from "~/components/landing-page/features-section";
import { HeroSection } from "~/components/landing-page/hero-section";
import { ScreenshotSection } from "~/components/landing-page/screenshot-section";
import { useTranslation } from "~/contents/i18n/translator";

export default function Index() {
  const t = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col">
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <ScreenshotSection />
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t((l) => l.landingPage.footer.copyright)}
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              to="https://github.com/simonboisset/remix-shadcn-docs"
            >
              {t((l) => l.landingPage.footer.github)}
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              to="https://github.com/simonboisset"
            >
              {t((l) => l.landingPage.footer.simonBoisset)}
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
