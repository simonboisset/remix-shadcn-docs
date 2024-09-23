# Get Started

Welcome to the Remix Shadcn Docs template! This guide will help you set up and start using this documentation tool.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (version 20.0.0 or higher)
- npm (usually comes with Node.js)

## Installation

To create a new project using the Remix Shadcn Docs template, run the following command in your terminal:

```bash
npx create-remix@latest --template simonboisset/remix-shadcn-docs
```

This command will create a new directory with all the necessary files and dependencies for your documentation site.

## Project Structure

After installation, your project will have the following structure:

```txt
your-project-name/
├── app/
│   ├── components/
│   ├── contents/
│   ├── routes/
│   └── ...
├── public/
├── package.json
└── ...
```

The `app` directory contains the main application code, including components, content management, and routes. The `public` directory is for static assets.

## Running the Development Server

To start the development server, navigate to your project directory and run:

```bash
npm run dev
```

This will start the Remix development server, and you can view your site at `http://localhost:3000`.

## Customizing Your Documentation

### Adding Content

To add new documentation pages, create Markdown files in the `app/contents/doc/` directory. The template uses a versioning system, so place your files in the appropriate version and language subdirectories.

For example, to add a new page for version 1.0.0 in English:

1. Create a new Markdown file in `app/contents/doc/v1.0.0/en/`.
2. Add your content to the file.
3. Update the `index.ts` file in the same directory to include your new page.

### Internationalization

To add or modify translations, update the language files in the `app/contents/i18n/` directory. The template supports easy addition of new languages.

## Building for Production

When you're ready to deploy your documentation site, run the following command to create a production build:

```bash
npm run build
```

This will generate optimized files in the `build` directory, ready for deployment.
