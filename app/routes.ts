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
