# Commencer

Bienvenue dans le modèle Remix Shadcn Docs ! Ce guide vous aidera à configurer et à commencer à utiliser cet outil de documentation.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre système :

- Node.js (version 20.0.0 ou supérieure)
- npm (généralement fourni avec Node.js)

## Installation

Pour créer un nouveau projet en utilisant le modèle Remix Shadcn Docs, exécutez la commande suivante dans votre terminal :

```bash
npx create-remix@latest --template simonboisset/remix-shadcn-docs
```

Cette commande créera un nouveau répertoire avec tous les fichiers et dépendances nécessaires pour votre site de documentation.

## Structure du projet

Après l'installation, votre projet aura la structure suivante :

```txt
nom-de-votre-projet/
├── app/
│   ├── components/
│   ├── contents/
│   ├── routes/
│   └── ...
├── public/
├── package.json
└── ...
```

Le répertoire `app` contient le code principal de l'application, y compris les composants, la gestion du contenu et les routes. Le répertoire `public` est destiné aux ressources statiques.

## Lancer le serveur de développement

Pour démarrer le serveur de développement, naviguez vers le répertoire de votre projet et exécutez :

```bash
npm run dev
```

Cela lancera le serveur de développement Remix, et vous pourrez voir votre site à l'adresse `http://localhost:3000`.

## Personnaliser votre documentation

### Ajouter du contenu

Pour ajouter de nouvelles pages de documentation, créez des fichiers Markdown dans le répertoire `app/contents/doc/`. Le modèle utilise un système de versionnage, alors placez vos fichiers dans les sous-répertoires appropriés de version et de langue.

Par exemple, pour ajouter une nouvelle page pour la version 1.0.0 en français :

1. Créez un nouveau fichier Markdown dans `app/contents/doc/v1.0.0/fr/`.
2. Ajoutez votre contenu au fichier.
3. Mettez à jour le fichier `index.ts` dans le même répertoire pour inclure votre nouvelle page.

### Internationalisation

Pour ajouter ou modifier des traductions, mettez à jour les fichiers de langue dans le répertoire `app/contents/i18n/`. Le modèle prend en charge l'ajout facile de nouvelles langues.

## Construire pour la production

Lorsque vous êtes prêt à déployer votre site de documentation, exécutez la commande suivante pour créer une version de production :

```bash
npm run build
```

Cela générera des fichiers optimisés dans le répertoire `build`, prêts pour le déploiement.
