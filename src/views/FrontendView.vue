<script setup>
import PlatformCard from '@/components/PlatformCard.vue'
import PreDeployChecklist from '@/components/PreDeployChecklist.vue'
import CloudflareGuide from '@/components/CloudflareGuide.vue'
import SpaFallbackDiagram from '@/components/SpaFallbackDiagram.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import CalloutBox from '@/components/CalloutBox.vue'
import { frontendPlatforms } from '@/data/platforms'
import { problemas } from '@/data/troubleshooting'
import { ejemplos } from '@/data/examples'
import { site, formatearFecha } from '@/data/site'

const otras = frontendPlatforms.filter((p) => !p.id.startsWith('cloudflare'))

const indice = [
  { id: 'checklist', texto: 'Antes de empezar' },
  { id: 'cloudflare', texto: 'Paso a paso en Cloudflare' },
  { id: 'otras', texto: 'Otras opciones gratuitas' },
  { id: 'error-404', texto: 'El error 404 al recargar' },
  { id: 'variables', texto: 'Variables de entorno' },
  { id: 'problemas', texto: 'Problemas comunes' },
  { id: 'ejemplos', texto: 'Plantillas oficiales' },
]

const envEjemplo = `# .env.local  (no se sube a GitHub: *.local ya está en el .gitignore)
VITE_API_URL=https://mi-api.ejemplo.com
DB_PASSWORD=esto-no-llega-al-navegador`

const envUso = `// Cualquier componente o archivo .js
const api = import.meta.env.VITE_API_URL   // "https://mi-api.ejemplo.com"
const pass = import.meta.env.DB_PASSWORD   // undefined: no empieza con VITE_`

const ghPagesBase = `// vite.config.js
export default defineConfig({
  // Tu sitio vivirá en https://<usuario>.github.io/<repo>/
  base: '/<repo>/',
  plugins: [vue()],
})`
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <p class="etiqueta">Práctica real</p>
      <h1>Despliega tu frontend gratis</h1>
      <p class="texto-angosto intro">
        <strong>Desplegar</strong> es publicar tu proyecto en un servidor para que cualquiera lo
        abra con una URL. Esta página es el ejemplo: este mismo sitio está publicado con los pasos
        que vas a ver aquí. La meta es que tengas tu URL en menos de 15 minutos.
      </p>
      <nav aria-label="En esta página" class="indice">
        <ol>
          <li v-for="item in indice" :key="item.id">
            <a :href="`#${item.id}`">{{ item.texto }}</a>
          </li>
        </ol>
      </nav>
    </div>
  </section>

  <section id="checklist" class="seccion" aria-labelledby="t-checklist">
    <div class="contenedor texto-angosto">
      <h2 id="t-checklist">Antes de empezar: checklist</h2>
      <p>Cinco minutos aquí te ahorran una hora de errores en el build.</p>
      <PreDeployChecklist />
    </div>
  </section>

  <section id="cloudflare" class="seccion" aria-labelledby="t-cloudflare">
    <div class="contenedor">
      <div class="texto-angosto">
        <p class="etiqueta">La recomendación de la mentoría</p>
        <h2 id="t-cloudflare">Paso a paso en Cloudflare</h2>
        <p>
          Cloudflare tiene dos productos para tu frontend. <strong>Workers</strong> es el que
          Cloudflare recomienda hoy para proyectos nuevos y donde llegan las funciones nuevas.
          <strong>Pages</strong> es el producto anterior: sigue funcionando y es un poco más
          directo. Los dos sirven tu carpeta <code>dist/</code> gratis. Elige uno.
        </p>
        <CalloutBox variante="tip" titulo="¿Cuál elijo?">
          <p>
            Si vas a agregar una API más adelante, usa <strong>Workers</strong>. Si solo quieres
            publicar tu sitio ya y no tocar ningún archivo, <strong>Pages</strong> está bien.
          </p>
        </CalloutBox>
      </div>
      <CloudflareGuide />
    </div>
  </section>

  <section id="otras" class="seccion" aria-labelledby="t-otras">
    <div class="contenedor">
      <h2 id="t-otras">Otras opciones gratuitas</h2>
      <p class="texto-angosto">
        Todas reciben la misma carpeta <code>dist/</code>. Cambia el lugar, no tu proyecto. Abre
        cada tarjeta para ver límites, pasos y con qué tener cuidado.
      </p>
      <div class="lista">
        <PlatformCard
          v-for="p in frontendPlatforms.filter((p) => p.id.startsWith('cloudflare'))"
          :key="p.id"
          :plataforma="p"
        />
        <PlatformCard v-for="p in otras" :key="p.id" :plataforma="p" />
      </div>
    </div>
  </section>

  <section id="error-404" class="seccion" aria-labelledby="t-404">
    <div class="contenedor texto-angosto">
      <p class="etiqueta">El error clásico</p>
      <h2 id="t-404">"Recargo la página y sale 404"</h2>
      <p>
        Tu app de Vue es una <strong>SPA</strong> (<em>Single Page Application</em>): solo existe un
        archivo HTML, <code>index.html</code>. Cuando navegas con los enlaces, Vue Router cambia la
        URL sin pedirle nada al servidor. Pero cuando <strong>recargas</strong> o abres un enlace
        directo, el navegador sí le pide esa ruta al servidor… y ahí no hay ningún archivo con ese
        nombre.
      </p>
      <SpaFallbackDiagram />
      <p>
        La solución se llama <strong>fallback de SPA</strong>: decirle al hosting "si no encuentras
        el archivo, responde con <code>index.html</code>". Cada plataforma lo resuelve distinto:
      </p>
    </div>
    <div class="contenedor">
      <div
        class="tabla-scroll"
        tabindex="0"
        role="region"
        aria-label="Fallback de SPA por plataforma"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Plataforma</th>
              <th scope="col">Cómo se resuelve</th>
              <th scope="col">Archivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in frontendPlatforms" :key="p.id">
              <th scope="row">{{ p.nombre }}</th>
              <td>{{ p.spa_fallback }}</td>
              <td>
                <code v-if="p.spa_archivo">{{ p.spa_archivo.nombre }}</code>
                <span v-else>Ninguno</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="contenedor texto-angosto">
      <h3>Caso especial: GitHub Pages y el <code>base</code> de Vite</h3>
      <p>
        En GitHub Pages tu sitio no vive en la raíz del dominio, sino en una subcarpeta:
        <code>usuario.github.io/repo/</code>. Vite, por defecto, genera rutas como
        <code>/assets/index.js</code>, que apuntan a la raíz y no existen. Resultado: página en
        blanco. Se arregla con la opción <code>base</code>:
      </p>
      <CodeBlock :codigo="ghPagesBase" lenguaje="js" titulo="vite.config.js" />
      <p>
        Vue Router toma ese valor solo, porque usamos
        <code>createWebHistory(import.meta.env.BASE_URL)</code>.
      </p>
    </div>
  </section>

  <section id="variables" class="seccion" aria-labelledby="t-variables">
    <div class="contenedor texto-angosto">
      <h2 id="t-variables">Variables de entorno en el frontend</h2>
      <p>
        Una <strong>variable de entorno</strong> es un valor que cambia según dónde corre tu app,
        como la URL de tu API en local contra la de producción. En Vite se leen con
        <code>import.meta.env</code>, y
        <strong>solo las que empiezan con <code>VITE_</code></strong>
        llegan al navegador.
      </p>
      <CodeBlock :codigo="envEjemplo" lenguaje="bash" titulo=".env.local" />
      <CodeBlock :codigo="envUso" lenguaje="js" titulo="src/main.js" />
      <CalloutBox variante="importante" titulo="Todo lo que está en el frontend es público">
        <p>
          Vite <strong>escribe</strong> el valor de cada <code>VITE_*</code> dentro de tu JavaScript
          al hacer el build. Cualquiera puede verlo con las herramientas del navegador. Nunca pongas
          ahí llaves secretas, contraseñas ni tokens de pago. Esos van en un backend.
        </p>
      </CalloutBox>
      <p>
        Como se leen <strong>al momento del build</strong>, tienes que configurarlas en la
        plataforma y volver a desplegar cada vez que cambien:
      </p>
      <ul class="lista-env">
        <li v-for="p in frontendPlatforms" :key="p.id">
          <strong>{{ p.nombre }}:</strong> {{ p.variables_entorno }}
        </li>
      </ul>
      <p class="texto-suave">
        Fuente:
        <a href="https://vite.dev/guide/env-and-mode" rel="noopener"
          >Vite, Env Variables and Modes</a
        >.
      </p>
    </div>
  </section>

  <section id="problemas" class="seccion" aria-labelledby="t-problemas">
    <div class="contenedor">
      <h2 id="t-problemas">Problemas comunes y cómo resolverlos</h2>
      <div class="rejilla">
        <article v-for="p in problemas" :key="p.id" class="problema">
          <h3>{{ p.titulo }}</h3>
          <p><strong>Síntoma:</strong> {{ p.sintoma }}</p>
          <p><strong>Solución:</strong> {{ p.solucion }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="ejemplos" class="seccion" aria-labelledby="t-ejemplos">
    <div class="contenedor">
      <h2 id="t-ejemplos">Plantillas y guías oficiales</h2>
      <p class="texto-angosto">
        Revisadas el {{ formatearFecha(site.verificadoEl) }}. Y el mejor ejemplo de todos:
        <a :href="site.repoUrl" rel="noopener">el código de este sitio</a>.
      </p>
      <ul class="rejilla ejemplos">
        <li v-for="e in ejemplos" :key="e.url">
          <span class="etiqueta">{{ e.plataforma }}</span>
          <a :href="e.url" rel="noopener" class="ejemplo-titulo">{{ e.titulo }}</a>
          <p>{{ e.descripcion }}</p>
          <p v-if="e.actualizado" class="texto-suave fecha">
            Último cambio: {{ formatearFecha(e.actualizado) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.intro {
  font-size: 1.1rem;
}

.indice ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  counter-reset: indice;
}

.indice a {
  display: inline-block;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--color-borde);
  border-radius: 999px;
  background: var(--color-superficie);
  font-size: 0.92rem;
  text-decoration: none;
}

.indice a:hover {
  border-color: var(--color-acento);
}

.lista {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.tabla-scroll {
  overflow-x: auto;
  margin: 1rem 0 2rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
}

table {
  width: 100%;
  min-width: 40rem;
  border-collapse: collapse;
  font-size: 0.95rem;
  background: var(--color-superficie);
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--color-borde);
}

thead th {
  background: var(--color-superficie-2);
}

tbody tr:last-child > * {
  border-bottom: 0;
}

.lista-env li {
  margin-bottom: 0.5rem;
}

.problema,
.ejemplos li {
  padding: 1.25rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
}

.problema h3 {
  font-size: 1.1rem;
}

.problema p:last-child,
.ejemplos p:last-child {
  margin-bottom: 0;
}

.ejemplos {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
}

.ejemplo-titulo {
  display: block;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.fecha {
  font-size: 0.85rem;
}
</style>
