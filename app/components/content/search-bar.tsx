import { useNavigate, useParams } from "@remix-run/react";
import Fuse, { FuseResult, FuseResultMatch } from "fuse.js";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "~/contents/i18n/translator";
import { getAppUrl } from "~/navigation/get-url";
import { useAppConfig } from "~/routes/($lang)";
import { Input } from "../ui/input";
import { ResponsiveDrawer } from "../ui/responsive-drawer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export type SearchItem = {
  title: string;
  content: string;
  slug: string;
};

const fuseOptions = {
  keys: ["content", "title"],
  includeMatches: true,
  threshold: 0.3,
  minMatchCharLength: 3,
  distance: 100000,
};

export function SearchBar({
  items,
  trigger,
}: {
  items: SearchItem[];
  trigger: React.ReactNode;
}) {
  const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
  const navigate = useNavigate();
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const params = useParams();
  const fuseIndex = useMemo(
    () => Fuse.createIndex(fuseOptions.keys, items),
    [items]
  );
  const fuse = useMemo(
    () => new Fuse(items, fuseOptions, fuseIndex),
    [fuseIndex, items]
  );

  const onSearch = (query: string) => {
    setSearchQuery(query);

    const searchResults = fuse.search(query);

    setResults(searchResults);
  };

  const onSelect = (item: FuseResult<SearchItem>) => {
    setIsOpen(false);
    navigate(
      getAppUrl({
        type: "docs",
        slug: item.item.slug,
        lang: params.lang,
        version: params.version,
        DEFAULT_LANGUAGE,
        LATEST_VERSION,
      })
    );
    setSearchQuery("");
    setResults([]);
  };

  return (
    <ResponsiveDrawer
      open={isOpen}
      setOpen={setIsOpen}
      trigger={trigger}
      content={
        <div className="flex flex-col">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              type="search"
              name="search"
              size="large"
              variant="inline"
              className="pl-12"
              placeholder={t((l) => l.search.placeholder)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Separator />

          {results.length > 0 ? (
            <ScrollArea className="h-[calc(50vh-100px)]">
              <div className="flex flex-col">
                {results.map((item) => (
                  <SearchItem
                    key={item.item.slug}
                    result={item}
                    onSelect={() => onSelect(item)}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptySearchResults />
          )}
        </div>
      }
    />
  );
}

const SearchItem = ({
  result,
  onSelect,
}: {
  result: FuseResult<SearchItem>;
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className="w-full flex flex-col gap-2 items-start hover:bg-accent p-2 transition-colors"
    >
      <span className="font-bold">{result.item.title}</span>
      <HighlightedText
        text={result.item.content}
        matches={result.matches?.filter((m) => m.key === "content") ?? []}
      />
    </button>
  );
};

const getFirstHighlightedText = (
  text: string,
  matches: FuseResultMatch[] | undefined
) => {
  const distance = 100;
  if (!matches)
    return {
      before: "",
      highlight: "",
      after: "",
      isStart: false,
      isEnd: false,
    };

  const match = matches[0];
  const start = match.indices[0][0];
  const end = match.indices[0][1] + 1;
  const beforeIndex = Math.max(0, start - distance);
  const before = text.substring(beforeIndex, start);
  const highlight = text.substring(start, end);
  const afterIndex = Math.min(text.length, end + distance);
  const after = text.substring(end, afterIndex);
  const isStart = beforeIndex !== 0;
  const isEnd = afterIndex !== text.length;
  return {
    before,
    highlight,
    after,
    isStart,
    isEnd,
  };
};

const HighlightedText = ({
  text,
  matches,
}: {
  text: string;
  matches: FuseResultMatch[];
}) => {
  const { before, highlight, after, isStart, isEnd } = getFirstHighlightedText(
    text,
    matches
  );
  return (
    <span className="text-muted-foreground text-start text-sm">
      {isStart && "..."}
      {markdownToPlainText(before)}
      <mark className="bg-primary text-card px-1 py-0.5 rounded-sm font-bold">
        {highlight}
      </mark>
      {markdownToPlainText(after)}
      {isEnd && "..."}
    </span>
  );
};

function markdownToPlainText(markdown: string): string {
  let plainText = markdown.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  plainText = plainText.replace(/[*_~`#]/g, "");
  plainText = plainText.replace(/^#+\s*(.*?)$/gm, "$1");
  plainText = plainText.replace(/```[\s\S]*?```/g, "");
  plainText = plainText.replace(/^[-*+]\s/gm, "");
  plainText = plainText.replace(/^\d+\.\s/gm, "");
  plainText = plainText.replace(/^[-*_]{3,}\s*$/gm, "");
  plainText = plainText.trim().replace(/\n{3,}/g, "\n\n");

  return plainText;
}

const EmptySearchResults = () => {
  const t = useTranslation();
  return (
    <span className="text-muted-foreground text-start text-lg h-[calc(50vh-100px)] flex items-center justify-center">
      {t((l) => l.search.noResults)}
    </span>
  );
};
