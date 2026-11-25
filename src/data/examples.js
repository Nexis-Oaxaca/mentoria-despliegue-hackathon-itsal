// Galería de plantillas y guías oficiales (sin repos de la comunidad).
// Revisadas el 2026-11-25. "actualizado" es la fecha del último commit, cuando se pudo ver.

export const ejemplos = [
  {
    plataforma: 'Cloudflare',
    titulo: 'Plantilla oficial de Vue de create-cloudflare',
    descripcion:
      'La que usa "npm create cloudflare -- --framework=vue". Tiene variantes para Workers y Pages. Agrega un pequeño servidor y el plugin de Vite de Cloudflare, así que es más de lo que necesitas para un sitio estático.',
    url: 'https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/templates/vue',
    actualizado: '2026-09-25',
  },
  {
    plataforma: 'Cloudflare',
    titulo: 'Guía de Vue en Cloudflare Workers',
    descripcion: 'Documentación oficial paso a paso.',
    url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/',
    actualizado: null,
  },
  {
    plataforma: 'Varias',
    titulo: 'Guía de Vite: desplegar un sitio estático',
    descripcion:
      'Cubre Cloudflare, Vercel, Netlify, GitHub Pages, Firebase y más. Es nuestra referencia principal.',
    url: 'https://vite.dev/guide/static-deploy',
    actualizado: '2026-10-07',
  },
  {
    plataforma: 'Vite',
    titulo: 'Plantilla oficial template-vue de create-vite',
    descripcion:
      'El punto de partida más pequeño de Vue 3 con Vite. No trae configuración de despliegue.',
    url: 'https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue',
    actualizado: null,
  },
  {
    plataforma: 'Vercel',
    titulo: 'Vite en Vercel',
    descripcion:
      'Guía oficial, incluido el vercel.json para el fallback de SPA. Ojo: el ejemplo oficial de Vue de Vercel (vercel/examples) usa Vue CLI, no Vite, así que no lo tomes como referencia.',
    url: 'https://vercel.com/docs/frameworks/frontend/vite',
    actualizado: '2026-11-14',
  },
  {
    plataforma: 'Netlify',
    titulo: 'Vite en Netlify',
    descripcion:
      'Guía oficial con los valores de build. No encontramos una plantilla oficial vigente de Vue con Vite.',
    url: 'https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/',
    actualizado: null,
  },
  {
    plataforma: 'GitHub Pages',
    titulo: 'Workflow oficial static.yml',
    descripcion:
      'El workflow de GitHub Actions para publicar un sitio estático. Para Vite, usa el de la guía de Vite: agrega npm ci y npm run build.',
    url: 'https://github.com/actions/starter-workflows/blob/main/pages/static.yml',
    actualizado: '2026-03-25',
  },
  {
    plataforma: 'Firebase',
    titulo: 'Quickstart de Firebase Hosting',
    descripcion: 'Guía oficial. No encontramos un ejemplo oficial de Vue para Firebase Hosting.',
    url: 'https://firebase.google.com/docs/hosting/quickstart',
    actualizado: null,
  },
]
