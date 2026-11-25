import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FrontendView from '@/views/FrontendView.vue'
import BackendView from '@/views/BackendView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// createWebHistory da URLs limpias (/frontend en lugar de /#/frontend).
// Por eso el hosting necesita el "fallback de SPA": si recargas /frontend,
// el servidor no tiene un archivo con ese nombre y debe responder con index.html.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView,
      meta: {
        titulo: 'Despliega tu proyecto a costo $0',
        descripcion:
          'Guía práctica para desplegar gratis el frontend de tu proyecto de hackathon y entender tus opciones de backend.',
      },
    },
    {
      path: '/frontend',
      name: 'frontend',
      // Importamos las vistas directo (sin carga diferida): el sitio es pequeño y así
      // la página no "salta" mientras se descarga el código de la ruta.
      component: FrontendView,
      meta: {
        titulo: 'Despliega tu frontend gratis',
        descripcion:
          'Paso a paso para publicar tu proyecto de Vue en Cloudflare Workers o Pages, Vercel, Netlify, GitHub Pages y Firebase.',
      },
    },
    {
      path: '/backend',
      name: 'backend',
      component: BackendView,
      meta: {
        titulo: '¿Y mi backend?',
        descripcion:
          'Opciones gratuitas para tu backend en una hackathon: Cloudflare Workers, Render, Railway, Supabase y Heroku.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'no-encontrada',
      component: NotFoundView,
      meta: { titulo: 'Página no encontrada', descripcion: 'Esta página no existe.' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})

// SEO básico: título y descripción por ruta.
router.afterEach((to) => {
  const sufijo = 'Mentoría ITSAL'
  document.title = `${to.meta.titulo} · ${sufijo}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', to.meta.descripcion)
})

export default router
