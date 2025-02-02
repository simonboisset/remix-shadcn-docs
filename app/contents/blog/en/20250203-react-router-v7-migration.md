# Migrating to React Router v7 and Tailwind v4

After a long time, I finally migrated my Remix application to React Router v7 and Tailwind v4. Here is a list of changes I made.

## React Router v7

### Explicit routes declaration

In React Router v7, you need to explicitly declare your routes.

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

That allows me to reorganize my folder structure and not be forced to use file base routing convention.

### Route type generation

React Router v7 now generates the route type for you. Don't use anymore LoaderFunction, ActionFunction, etc.

```tsx
// slug.ts
import type { Route } from "./+types/slug";

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data.title }];
};
```

## Tailwind v4

### No config file

Tailwind v4 now css file only. No config file.

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

I upgraded to React 19. It brings a lot of new features and improvements.

## Next improvements

This upgrade is a first step. I will continue to improve the template and the codebase.

- [ ] Use static site generation (evalable with react-router v7)
- [ ] Add page transition
- [ ] Imporve performance for search engine

## Conclusion

I'm happy with the changes I made. I think it's a good thing to migrate to React Router v7 and Tailwind v4.

If you have any questions, please feel free to ask me or open an issue on the repository.
