export const authors = [
  {
    name: "Simon Boisset",
    slug: "simon-boisset",
    avatar: "/images/authors/simon-boisset.jpg",
    description:
      "I'm a software engineer and the author of the Remix Shadcn Docs.",
    link: "https://github.com/simonboisset",
  },
] as const satisfies Author[];

export type Author = {
  name: string;
  slug: string;
  avatar: string;
  description: string;
  link: string;
};

export type AuthorSlug = (typeof authors)[number]["slug"];

export type BlogPost = {
  slug: string;
  date: Date;
  author: AuthorSlug;
  content: string;
};
