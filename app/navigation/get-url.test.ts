import { describe, expect, it } from "vitest";
import { getAppUrl } from "./get-url";

describe("getAppUrl", () => {
  const DEFAULT_LANGUAGE = "en";
  const LATEST_VERSION = "1.0.0";

  it("should return the correct URL for the home page", () => {
    const url = getAppUrl({ DEFAULT_LANGUAGE, LATEST_VERSION });
    expect(url).toBe("/");
  });

  it("should return the correct URL for a non-default language home page", () => {
    const url = getAppUrl({ lang: "fr", DEFAULT_LANGUAGE, LATEST_VERSION });
    expect(url).toBe("/fr");
  });

  it("should return the correct URL for the docs page", () => {
    const url = getAppUrl({ type: "docs", DEFAULT_LANGUAGE, LATEST_VERSION });
    expect(url).toBe("/docs");
  });

  it("should return the correct URL for a non-default language docs page", () => {
    const url = getAppUrl({
      type: "docs",
      lang: "fr",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/fr/docs");
  });

  it("should return the correct URL for a specific docs version", () => {
    const url = getAppUrl({
      type: "docs",
      version: "0.9.0",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/docs/v/0.9.0");
  });

  it("should return the correct URL for a specific docs version and language", () => {
    const url = getAppUrl({
      type: "docs",
      version: "0.9.0",
      lang: "fr",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/fr/docs/v/0.9.0");
  });

  it("should return the correct URL for a specific docs page", () => {
    const url = getAppUrl({
      type: "docs",
      slug: "getting-started",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/docs/getting-started");
  });

  it("should return the correct URL for a specific docs page with version and language", () => {
    const url = getAppUrl({
      type: "docs",
      version: "0.9.0",
      lang: "fr",
      slug: "getting-started",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/fr/docs/v/0.9.0/getting-started");
  });

  it("should return the correct URL for the blog page", () => {
    const url = getAppUrl({ type: "blog", DEFAULT_LANGUAGE, LATEST_VERSION });
    expect(url).toBe("/blog");
  });

  it("should return the correct URL for a non-default language blog page", () => {
    const url = getAppUrl({
      type: "blog",
      lang: "fr",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/fr/blog");
  });

  it("should return the correct URL for a specific blog post", () => {
    const url = getAppUrl({
      type: "blog",
      slug: "new-features",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/blog/new-features");
  });

  it("should return the correct URL for a specific blog post with non-default language", () => {
    const url = getAppUrl({
      type: "blog",
      lang: "fr",
      slug: "new-features",
      DEFAULT_LANGUAGE,
      LATEST_VERSION,
    });
    expect(url).toBe("/fr/blog/new-features");
  });
});
