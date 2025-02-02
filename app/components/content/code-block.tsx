import { CheckIcon, CopyIcon } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Button } from "../ui/button";

export function CodeBlock({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "tsx";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      <Highlight
        theme={themes.oneDark}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 rounded-md`} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2"
        onClick={copyToClipboard}
        aria-label={isCopied ? "Copied" : "Copy"}
      >
        {isCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
