import { plural } from "typed-locale";
import type { Translations } from "./en";

export const fr: Translations = {
  landingPage: {
    title: "Bienvenue sur remix-shadcn-docs",
    subtitle:
      "Un template Remix avec Shadcn UI pour créer des sites de documentation beau et fonctionnel.",
    getStarted: "Commencer",
    viewOnGithub: "Voir sur GitHub",
    features: {
      seoFriendly: {
        title: "Optimisé pour le SEO",
        description:
          "Remix-shadcn-docs est optimisé pour le SEO par défaut pour des sites de documentation.",
      },
      remixPowered: {
        title: "Remix Powered",
        description:
          "Utilise Remix pour des pages de documentation rapides, dynamiques et SEO-friendly.",
      },
      shadcnUI: {
        title: "Shadcn UI",
        description:
          "Utilise Shadcn UI pour un design beau et personnalisable.",
      },
    },
    screenshotSection: {
      title: "Beautiful Documentation Made Easy",
      description:
        "remix-shadcn-docs fournit un design élégant, réactif pour votre documentation. Créez des sites de documentation engageants et accessibles avec facilité.",
      getStarted: "Commencer",
    },
    footer: {
      copyright: "© 2024 Simon Boisset. Tous droits réservés.",
      github: "Github",
      simonBoisset: "Simon Boisset",
    },
  },
  article: {
    estimatedReadingTime: plural({
      none: "Temps de lecture estimé: 0 minute",
      one: "Temps de lecture estimé: 1 minute",
      other: "Temps de lecture estimé: {{count}} minutes",
    }),
    previous: "Précédent",
    next: "Suivant",
  },
  sidebar: {
    documentation: "Documentation",
    toggleDocumentationMenu: "Basculer le menu de documentation",
  },
  header: {
    docs: "Docs",
    blog: "Blog",
  },
  search: {
    placeholder: "Rechercher dans la documentation...",
    submit: "Rechercher",
    noResults: "Aucun résultat trouvé",
  },
};
