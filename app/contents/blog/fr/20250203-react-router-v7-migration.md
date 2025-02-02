# Migration vers React Router v7 et Tailwind v4

Après une longue attente, j'ai enfin migré mon application Remix vers React Router v7 et Tailwind v4. Voici la liste des changements que j'ai effectués.

## React Router v7

### Déclaration explicite des routes

Dans React Router v7, vous devez déclarer explicitement vos routes.

```tsx
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(":lang?", "routes/layout.tsx", [
    index("routes/index.tsx"),
    route("blog", "routes/blog/layout.tsx", [
      index("routes/blog/index.tsx"),
      route(":slug", "routes/blog/slug.tsx"),
    ]),
    route("docs", "routes/docs/layout.tsx", [
      index("routes/docs/index.tsx"),
      route(":slug", "routes/docs/slug.tsx"),
    ]),
    route("docs/v/:version", "routes/docs/version/layout.tsx", [
      index("routes/docs/version/index.tsx"),
      route(":slug", "routes/docs/version/slug.tsx"),
    ]),
  ]),
  route("/robots.txt", "routes/robots.ts"),
  route("/sitemap.xml", "routes/sitemap.ts"),
] satisfies RouteConfig;
```

Cela me permet de réorganiser la structure des dossiers sans être contraint par la convention de routage basée sur les fichiers.

### Génération des types de routes

React Router v7 génère maintenant automatiquement les types de routes. Il n'est plus nécessaire d'utiliser LoaderFunction, ActionFunction, etc.

```tsx
// slug.ts
import type { Route } from "./+types/slug";

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data.title }];
};
```

## Tailwind v4

### Plus de fichier de configuration

Tailwind v4 utilise maintenant uniquement des fichiers CSS. Plus besoin de fichier de configuration.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

## React 19

J'ai effectué la mise à niveau vers React 19. Cela apporte de nombreuses nouvelles fonctionnalités et améliorations.

## Améliorations futures

Cette mise à niveau n'est qu'une première étape. Je continuerai à améliorer le template et le code source.

- [ ] Utiliser la génération de site statique (disponible avec react-router v7)
- [ ] Ajouter des transitions de pages
- [ ] Améliorer les performances pour les moteurs de recherche

## Conclusion

Je suis satisfait des changements effectués. Je pense que c'est une bonne chose de migrer vers React Router v7 et Tailwind v4.

Si vous avez des questions, n'hésitez pas à me les poser ou à ouvrir une issue sur le dépôt.
