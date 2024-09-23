import { Link, useParams } from "@remix-run/react";
import { BookType } from "lucide-react";
import { LinkTree } from "~/contents/doc/doc.server";
import { useTranslation } from "~/contents/i18n/translator";
import { getAppUrl } from "~/contents/navigation/get-url";
import { useAppConfig } from "~/routes/($lang)";
import { DesktopSidebar, MobileSidebar } from "../content/sidebar";
import { LanguageSelect } from "./language-select";
import { VersionSelect } from "./version-select";

function Logo() {
  const { lang } = useParams();
  return (
    <Link to={lang ? `/${lang}` : "/"} className="flex items-center space-x-2">
      <BookType className="h-6 w-6" />
      <span className="font-bold text-xl text-primary">Remix Shadcn Docs</span>
    </Link>
  );
}

type ContentLayoutProps = {
  linksTree?: LinkTree[];
  children: React.ReactNode;
};

export const Header = ({ linksTree }: { linksTree?: LinkTree[] }) => {
  const t = useTranslation();
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const { lang } = useParams();
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <MobileSidebar linksTree={linksTree} />
        <Logo />
        <div className="hidden md:flex items-center gap-8 ml-20 flex-1">
          <Link
            className="hover:text-primary font-semibold"
            to={getAppUrl({
              type: "docs",
              lang,
              DEFAULT_LANGUAGE,
              LATEST_VERSION,
            })}
          >
            {t((l) => l.header.docs)}
          </Link>
          <Link
            className="hover:text-primary font-semibold"
            to={getAppUrl({
              type: "blog",
              lang,
              DEFAULT_LANGUAGE,
              LATEST_VERSION,
            })}
          >
            {t((l) => l.header.blog)}
          </Link>
          <div className="flex-1" />
          <VersionSelect />
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};

export function ContentLayout({ linksTree, children }: ContentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header linksTree={linksTree} />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          {!!linksTree && <DesktopSidebar linksTree={linksTree} />}
          {children}
        </div>
      </div>
    </div>
  );
}
