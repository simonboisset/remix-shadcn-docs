import { useLocation, useNavigate, useParams } from "react-router";
import type { Language } from "~/contents/docs/doc.server";
import { cn } from "~/lib/utils";
import { getAppUrl } from "~/navigation/get-url";
import { useAppConfig } from "~/routes/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const LanguageSelect = ({ expand }: { expand?: boolean }) => {
  const { DEFAULT_LANGUAGE, LATEST_VERSION } = useAppConfig();
  const isDocs = useLocation().pathname.includes("/docs");
  const isBlog = useLocation().pathname.includes("/blog");
  const navigate = useNavigate();
  const { lang, version, slug } = useParams();
  const value = lang ?? DEFAULT_LANGUAGE;
  const onSelect = (locale: Language) => {
    const newPathname = getAppUrl({
      type: isDocs ? "docs" : isBlog ? "blog" : undefined,
      lang: locale,
      version,
      slug,
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });

    navigate(newPathname);
  };

  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger
        className={cn("rounded-md", expand ? "flex-1" : "w-16")}
        aria-label={
          localeOptions.find((locale) => locale.value === value)?.label
        }
      >
        <SelectValue>
          <span className="mr-2">
            {localeOptions.find((locale) => locale.value === value)?.flag}
          </span>
          <span>
            {expand &&
              localeOptions.find((locale) => locale.value === value)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map((locale) => (
          <SelectItem key={locale.value} value={locale.value}>
            <span className="mr-2">{locale.flag}</span>
            <span>{locale.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const localeOptions: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
];
