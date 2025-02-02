import type { BlogPost } from "../authors";
import docIsLive from "./20240923-doc-is-live.md?raw";
import reactRouterV7Migration from "./20250203-react-router-v7-migration.md?raw";
export const en: BlogPost[] = [
  {
    date: new Date("2024-09-19"),
    author: "simon-boisset",
    content: docIsLive,
    slug: "doc-is-live",
  },
  {
    date: new Date("2025-02-03"),
    author: "simon-boisset",
    content: reactRouterV7Migration,
    slug: "react-router-v7-migration",
  },
];
