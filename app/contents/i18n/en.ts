import { InferTranslation, plural } from "typed-locale";

export const en = {
  landingPage: {
    title: "Welcome to remix-shadcn-docs",
    subtitle:
      "A Remix template with Shadcn UI for creating beautiful and functional documentation sites.",
    getStarted: "Get Started",
    viewOnGithub: "View on GitHub",
    features: {
      seoFriendly: {
        title: "SEO Friendly",
        description:
          "Remix-shadcn-docs is optimized for SEO by default for documentation sites.",
      },
      remixPowered: {
        title: "Remix Powered",
        description:
          "Leverages Remix for fast, dynamic, and SEO-friendly documentation pages.",
      },
      shadcnUI: {
        title: "Shadcn UI",
        description:
          "Utilizes Shadcn UI components for a beautiful and customizable design.",
      },
    },
    screenshotSection: {
      title: "Beautiful Documentation Made Easy",
      description:
        "remix-shadcn-docs provides a sleek, responsive design for your documentation. Create engaging and accessible documentation sites with ease.",
      getStarted: "Get Started",
    },
    footer: {
      copyright: "© 2024 Simon Boisset. All rights reserved.",
      github: "Github",
      simonBoisset: "Simon Boisset",
    },
  },
  article: {
    estimatedReadingTime: plural({
      none: "Estimated reading time: 0 minute",
      one: "Estimated reading time: 1 minute",
      other: "Estimated reading time: {{count}} minutes",
    }),
    previous: "Previous",
    next: "Next",
  },
  sidebar: {
    documentation: "Documentation",
    toggleDocumentationMenu: "Toggle documentation menu",
  },
  header: {
    docs: "Docs",
    blog: "Blog",
  },
} as const;

export type Translations = InferTranslation<typeof en>;
