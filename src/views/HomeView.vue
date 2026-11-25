<script setup>
import { RouterLink } from 'vue-router'
import DeployDiagram from '@/components/DeployDiagram.vue'
import StatelessQuiz from '@/components/StatelessQuiz.vue'
import FinalAdvice from '@/components/FinalAdvice.vue'
import { site, autor } from '@/data/site'
import { frontendPlatforms, backendPlatforms } from '@/data/platforms'

const urlLista = !site.urlPublica.startsWith('[')

const resumen = [
  {
    titulo: 'Frontend',
    descripcion: 'Práctica real: lo publicamos en vivo.',
    to: '/frontend',
    plataformas: frontendPlatforms,
  },
  {
    titulo: 'Backend',
    descripcion: 'Solo documentación: qué opciones hay y qué decidir.',
    to: '/backend',
    plataformas: backendPlatforms,
  },
]
</script>

<template>
  <section class="seccion hero">
    <div class="contenedor">
      <p class="etiqueta">Mentoría · {{ site.institucion }}</p>
      <h1>{{ site.titulo }} para la demo de tu hackathon</h1>
      <p class="subtitulo">{{ site.subtitulo }}</p>
      <div class="acciones">
        <RouterLink to="/frontend" class="boton boton-primario">Desplegar mi frontend</RouterLink>
        <RouterLink to="/backend" class="boton boton-secundario">¿Y mi backend?</RouterLink>
      </div>
      <p class="en-vivo">
        <span class="punto" aria-hidden="true"></span>
        Este sitio está desplegado con lo que vas a aprender hoy:
        <a v-if="urlLista" :href="site.urlPublica">{{ site.urlPublica.replace('https://', '') }}</a>
        <span v-else>{{ site.urlPublica }}</span>
      </p>
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-html">
    <div class="contenedor">
      <h2 id="t-html">Al final, todo es HTML, CSS y JavaScript</h2>
      <p class="texto-angosto">
        No importa si usaste Vue, React o Svelte: el comando <code>npm run build</code> convierte tu
        proyecto en archivos que cualquier navegador entiende. Esa carpeta, <code>dist/</code>, es
        lo único que subes al hosting (el servicio que guarda tus archivos y los sirve en internet).
      </p>
      <DeployDiagram />
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-estado">
    <div class="contenedor texto-angosto">
      <p class="etiqueta">Antes de empezar</p>
      <h2 id="t-estado">¿Tu app es stateful o stateless?</h2>
      <p>
        Piensa en una <strong>calculadora</strong>: le das números, te da un resultado y no recuerda
        nada. Eso es <strong>stateless</strong> (sin estado). Ahora piensa en un
        <strong>cajero de banco</strong> que recuerda quién eres y cuánto dinero tienes: eso es
        <strong>stateful</strong> (con estado).
      </p>
      <p>
        Los planes gratuitos apagan, duermen y reinician tu servidor sin avisar. Si tu app guarda
        cosas en la memoria o en el disco del servidor, las pierde.
        <strong>Si es stateless, vas bien. Si es stateful, considera hacerla stateless</strong>:
        mueve el estado a una base de datos administrada, al cliente o a un servicio externo.
      </p>
      <h3>Descúbrelo en 4 preguntas</h3>
      <StatelessQuiz />
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-opciones">
    <div class="contenedor">
      <h2 id="t-opciones">Tus opciones gratuitas</h2>
      <div class="resumen">
        <article v-for="r in resumen" :key="r.to" class="bloque">
          <h3>{{ r.titulo }}</h3>
          <p class="texto-suave">{{ r.descripcion }}</p>
          <ul>
            <li v-for="p in r.plataformas" :key="p.id">
              <RouterLink :to="{ path: r.to, hash: `#${p.id}` }">{{ p.nombre }}</RouterLink>
              <span v-if="p.recomendada" class="insignia">Recomendada</span>
            </li>
          </ul>
          <RouterLink :to="r.to" class="boton boton-secundario">Ver {{ r.titulo }}</RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section class="seccion" aria-label="Consejo final">
    <div class="contenedor texto-angosto">
      <FinalAdvice />
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-autor">
    <div class="contenedor texto-angosto autor">
      <h2 id="t-autor">Sobre el autor</h2>
      <p>
        Soy <strong>{{ autor.nombre }}</strong
        >, tengo {{ autor.edad }} años y soy del {{ autor.origen }}. Soy cofundador de la comunidad
        <a :href="autor.comunidad.url" rel="noopener">{{ autor.comunidad.nombre }}</a
        >.
      </p>
      <blockquote>“{{ autor.frase }}”</blockquote>
      <p class="redes">
        <a :href="autor.linkedin" rel="noopener">LinkedIn</a>
        <a :href="autor.github" rel="noopener">GitHub</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 3.5rem 3rem;
}

.subtitulo {
  font-size: 1.3rem;
  color: var(--color-texto-suave);
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.en-vivo {
  margin-top: 2rem;
  font-size: 0.95rem;
  color: var(--color-texto-suave);
}

.en-vivo a {
  font-weight: 600;
  overflow-wrap: anywhere;
}

.punto {
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: 0.05em;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgb(34 197 94 / 0.2);
}

.resumen {
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .resumen {
    grid-template-columns: 1fr 1fr;
  }
}

.bloque {
  padding: 1.5rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
  box-shadow: var(--sombra);
}

.bloque ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.insignia {
  margin-left: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  background: var(--color-acento-suave);
  color: var(--color-acento-fuerte);
}

blockquote {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid var(--color-acento);
  font-size: 1.15rem;
  font-style: italic;
}

.redes {
  display: flex;
  gap: 1rem;
  font-weight: 600;
}
</style>
