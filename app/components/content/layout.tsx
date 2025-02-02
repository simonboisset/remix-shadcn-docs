import { BookType, Github, Search } from "lucide-react";
import { Link, useParams } from "react-router";
import { WEBSITE_TITLE } from "~/contents/const";
import type { LinkTree } from "~/contents/docs/doc.server";
import { useTranslation } from "~/contents/i18n/translator";
import { GITHUB_URL } from "~/navigation/domain";
import { getAppUrl } from "~/navigation/get-url";
import { useAppConfig } from "~/routes/layout";
import { DesktopSidebar, MobileSidebar } from "../content/sidebar";
import { Button } from "../ui/button";
import { LanguageSelect } from "./language-select";
import { SearchBar, type SearchItem } from "./search-bar";
import { VersionSelect } from "./version-select";

function Logo() {
  const { lang } = useParams();
  return (
    <Link to={lang ? `/${lang}` : "/"} className="flex items-center space-x-2">
      <BookType className="h-6 w-6" />
      <span className="font-bold text-xl text-primary">{WEBSITE_TITLE}</span>
    </Link>
  );
}

type ContentLayoutProps = {
  linksTree?: LinkTree[];
  searchItems: SearchItem[];
  children: React.ReactNode;
};

export const Header = ({
  linksTree,
  searchItems,
}: {
  linksTree?: LinkTree[];
  searchItems: SearchItem[];
}) => {
  const t = useTranslation();
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const { lang } = useParams();
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <MobileSidebar linksTree={linksTree} />
        <Logo />
        <div className="flex sm:hidden flex-1">
          <div className="flex-1" />
          <SearchBar
            items={searchItems}
            trigger={
              <Button variant="outline" size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            }
          />
        </div>
        <div className="hidden md:flex items-center gap-4 ml-20 flex-1">
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
          <SearchBar
            items={searchItems}
            trigger={
              <Button variant="outline" className="text-muted-foreground">
                <Search className="h-4 w-4 mr-2" />
                {t((l) => l.search.placeholder)}
              </Button>
            }
          />
          <VersionSelect />
          <LanguageSelect />
          <Button variant="outline" size="icon" aria-label="GitHub" asChild>
            <Link to={GITHUB_URL}>
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export function ContentLayout({
  linksTree,
  searchItems,
  children,
}: ContentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header linksTree={linksTree} searchItems={searchItems} />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          {!!linksTree && <DesktopSidebar linksTree={linksTree} />}
          {children}
        </div>
      </div>
    </div>
  );
}
