import { Library } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type TableOfContentsProps = {
  toc: { text: string; level: number }[];
};

const goToHeading = (e: MouseEvent<HTMLElement>) => {
  e.preventDefault();
  const targetText = e.currentTarget.textContent;
  if (targetText) {
    const element = document.querySelector(`[data-heading="${targetText}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

function TableOfContents({ toc }: TableOfContentsProps) {
  return (
    <nav>
      {toc.map((item, index) => (
        <Link
          key={index}
          to={`#${encodeURIComponent(item.text)}`}
          onClick={goToHeading}
          className={`block py-1 text-sm hover:text-primary transition-colors ${
            item.level === 1
              ? "font-semibold"
              : item.level === 2
              ? "pl-4"
              : "pl-8"
          }`}
        >
          {item.text}
        </Link>
      ))}
    </nav>
  );
}

export function DesktopTableOfContents({ toc }: TableOfContentsProps) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <TableOfContents toc={toc} />
        </ScrollArea>
      </div>
    </aside>
  );
}

export function MobileTableOfContents({ toc }: TableOfContentsProps) {
  const [title, ...rest] = toc;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon-lg"
          className="md:hidden fixed bottom-4 right-4"
        >
          <Library className="h-6 w-6" />
          <span className="sr-only">Toggle table of contents</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[50vh]"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle
            onClick={goToHeading}
            className="text-start"
            data-heading={title.text}
          >
            {title.text}
          </SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <ScrollArea className="h-[calc(50vh-100px)]">
            <TableOfContents toc={rest} />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
