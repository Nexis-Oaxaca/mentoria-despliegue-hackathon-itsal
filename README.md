# Despliega tu proyecto a costo $0

Sitio de ejemplo de la mentoría **"Cómo desplegar tu proyecto a coste $0 para la demo de tu hackathon"**, de Joan Garfias, para el Instituto Tecnológico de Salina Cruz (ITSAL).

El sitio cumple dos papeles:

1. **Es el ejemplo.** Lo desplegamos gratis en vivo: repo → build → deploy → URL pública.
2. **Es la guía.** Explica cómo desplegar un frontend (con pasos reales) y qué opciones tienes para un backend (solo documentación).

Está hecho con **Vue 3** (`<script setup>` y Composition API), **JavaScript** (sin TypeScript) y **Vite**. Es 100 % estático: no tiene servidor ni base de datos.

## Requisitos

- [Node.js](https://nodejs.org/) 24 (la versión está en `.nvmrc`; si usas `nvm`, corre `nvm use`).
- Git.

## Cómo correrlo en tu computadora

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre el sitio en http://localhost:5173 y se recarga solo al guardar
```

## Cómo hacer el build

```bash
npm run build    # genera la carpeta dist/ con HTML, CSS y JavaScript
npm run preview  # sirve dist/ en tu computadora para revisarlo antes de subirlo
```

**La carpeta `dist/` es lo que se despliega.** Al final, todo es HTML, CSS y JavaScript.

## Cómo está organizado

```
src/
  components/   Piezas reutilizables (tarjetas, bloques de código, avisos…)
  composables/  Lógica reutilizable con Composition API (copiar, checklist, modo presentación)
  data/         TODO el contenido: plataformas, pasos y preguntas. Los componentes solo lo pintan.
  views/        Una vista por ruta: Inicio (/), Frontend (/frontend) y Backend (/backend)
  router/       Las rutas, con createWebHistory (URLs limpias, sin #)
  utils/        Funciones sueltas (resaltado de código)
```

¿Quieres corregir un dato de una plataforma? Casi siempre es en `src/data/platforms.js`.

## Dónde está publicado

**https://despliegue-hackathon.joanpagarf09.workers.dev** (Cloudflare Workers)

## Cómo desplegarlo

El mismo `dist/` funciona en cualquier plataforma. Cada una tiene su archivo de configuración en la raíz del repo; las demás lo ignoran.

| Plataforma | Archivo | Build | Carpeta | Fallback de SPA |
|---|---|---|---|---|
| Cloudflare Workers (principal) | `wrangler.jsonc` | `npm run build` | `dist` | `not_found_handling: "single-page-application"` |
| Cloudflare Pages | — | `npm run build` | `dist` | Automático (no hay `404.html`) |
| Vercel | `vercel.json` | `npm run build` | `dist` | `rewrites` hacia `/index.html` |
| Netlify | `netlify.toml` | `npm run build` | `dist` | `[[redirects]]` `/*` → `/index.html` 200 |
| GitHub Pages | `.github/workflows/deploy-gh-pages.yml` | `npm run build` con `BASE_PATH=/<repo>/` | `dist` | Copia `index.html` como `404.html` |
| Firebase Hosting | `firebase.json` | `npm run build` | `dist` | `rewrites` `**` → `/index.html` |

La versión de Node está en `.nvmrc` (24). Cloudflare Pages no lee `engines` de `package.json`, por eso existe ese archivo.

### Cloudflare Workers (despliegue principal)

**Desde la terminal** (así se creó el Worker la primera vez):

```bash
npx wrangler login   # solo la primera vez
npm run deploy       # = npm run build && wrangler deploy
```

**Deploy automático en cada push** (Workers Builds):

1. Dashboard de Cloudflare → **Workers & Pages** → Worker `despliegue-hackathon` → **Settings** → **Builds** → **Connect**.
2. Elige el repo `Nexis-Oaxaca/mentoria-despliegue-hackathon-itsal`, rama `main`.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy` (el valor por defecto). Root directory: vacío.
4. Guarda. Desde ahí, cada push a `main` publica, y cada push a otra rama crea una preview (sección **Previews** del Worker).

> El nombre del Worker en el dashboard debe ser igual al `name` de `wrangler.jsonc` (`despliegue-hackathon`), o el build falla.

### Cloudflare Pages

Dashboard → **Workers & Pages** → **Create application** → pestaña **Pages** → **Import an existing Git repository**. Rama `main`, build command `npm run build`, carpeta `dist`.

Desde la terminal: `npx wrangler pages project create` y luego `npm run build && npx wrangler pages deploy dist`.

### Vercel y Netlify

Importa el repo desde su dashboard. Ambos detectan Vite; `vercel.json` y `netlify.toml` ya traen el fallback de SPA.

### GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow**.
3. El sitio queda en `https://nexis-oaxaca.github.io/mentoria-despliegue-hackathon-itsal/`.

El workflow solo se corre a mano para que no falle en cada push mientras Pages no esté activado. Cuando lo actives, puedes agregar `push: branches: [main]` en `on:`.

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase use --add      # elige o crea tu proyecto de Firebase
npm run build && firebase deploy --only hosting
```

### Open Graph (vista previa en WhatsApp)

Las etiquetas Open Graph de `index.html` usan `VITE_SITE_URL`, definida en `.env.production`. Si cambias de dominio, actualízala ahí.

## Otros comandos

```bash
npm run lint     # revisa el código con oxlint y ESLint
npm run format   # da formato con Prettier
```
