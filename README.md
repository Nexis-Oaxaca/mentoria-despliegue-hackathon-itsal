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

## Cómo desplegarlo

Se documenta a detalle en la Fase 5 (Cloudflare Workers, Cloudflare Pages y otras plataformas).

## Otros comandos

```bash
npm run lint     # revisa el código con oxlint y ESLint
npm run format   # da formato con Prettier
```
