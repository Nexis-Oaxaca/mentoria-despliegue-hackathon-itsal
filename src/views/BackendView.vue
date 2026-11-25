<script setup>
import PlatformCard from '@/components/PlatformCard.vue'
import StepList from '@/components/StepList.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import CalloutBox from '@/components/CalloutBox.vue'
import ComparisonTable from '@/components/ComparisonTable.vue'
import FinalAdvice from '@/components/FinalAdvice.vue'
import { backendPlatforms } from '@/data/platforms'
import { antesDeElegir, flujoGeneral, fragmentos } from '@/data/backendGuides'
import { site, formatearFecha } from '@/data/site'
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <p class="etiqueta">Solo documentación</p>
      <h1>¿Y mi backend?</h1>
      <p class="texto-angosto intro">
        El <strong>backend</strong> es la parte de tu app que corre en un servidor: guarda datos,
        valida usuarios y protege tus llaves. Aquí no desplegamos ninguno: te explicamos qué
        opciones gratuitas hay, qué decidir antes y cómo se vería el proceso.
      </p>
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-antes">
    <div class="contenedor">
      <h2 id="t-antes">Antes de elegir</h2>
      <div class="rejilla">
        <article v-for="a in antesDeElegir" :key="a.id" class="concepto">
          <h3>{{ a.titulo }}</h3>
          <p>{{ a.texto }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-plataformas">
    <div class="contenedor">
      <h2 id="t-plataformas">Opciones gratuitas para tu backend</h2>
      <p class="texto-angosto">
        Datos verificados el {{ formatearFecha(site.verificadoEl) }}. Ninguna es perfecta: abre cada
        tarjeta y lee la sección "Cuidado con".
      </p>
      <div class="lista">
        <PlatformCard v-for="p in backendPlatforms" :key="p.id" :plataforma="p" modo="backend" />
      </div>
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-tabla">
    <div class="contenedor">
      <h2 id="t-tabla">Tabla comparativa</h2>
      <ComparisonTable :plataformas="backendPlatforms" />
      <p class="texto-suave nota">
        "Gratis" significa gratis en el plan actual, verificado el
        {{ formatearFecha(site.verificadoEl) }}. Los valores marcados con [VERIFICAR] no aparecen en
        la documentación oficial que consultamos.
      </p>
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-flujo">
    <div class="contenedor texto-angosto">
      <h2 id="t-flujo">Cómo se desplegaría un backend típico</h2>
      <p>El flujo es casi igual en Render, Railway y Heroku:</p>
      <StepList :pasos="flujoGeneral" />
    </div>
  </section>

  <section class="seccion" aria-labelledby="t-fragmentos">
    <div class="contenedor texto-angosto">
      <h2 id="t-fragmentos">Fragmentos de referencia</h2>
      <CalloutBox variante="cuidado" titulo="Ejemplo de referencia">
        <p>
          Estos fragmentos no están desplegados en ningún lado. Son para que veas la forma que tiene
          un backend en cada plataforma.
        </p>
      </CalloutBox>
      <article v-for="f in fragmentos" :key="f.id" class="fragmento">
        <h3>{{ f.titulo }}</h3>
        <CodeBlock
          :codigo="f.codigo"
          :lenguaje="f.lenguaje"
          :titulo="`${f.archivo} · ${f.plataforma}`"
        />
        <p class="texto-suave">
          Fuente: <a :href="f.fuente" rel="noopener">{{ f.fuente }}</a>
          <template v-if="f.fuenteExtra">
            · <a :href="f.fuenteExtra" rel="noopener">{{ f.fuenteExtra }}</a>
          </template>
        </p>
      </article>
    </div>
  </section>

  <section class="seccion" aria-label="Consejo final">
    <div class="contenedor texto-angosto">
      <FinalAdvice />
    </div>
  </section>
</template>

<style scoped>
.intro {
  font-size: 1.1rem;
}

.lista {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.concepto {
  padding: 1.25rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
}

.concepto h3 {
  font-size: 1.1rem;
}

.concepto p:last-child {
  margin-bottom: 0;
}

.nota {
  font-size: 0.9rem;
}

.fragmento + .fragmento {
  margin-top: 2rem;
}

.fragmento p {
  overflow-wrap: anywhere;
}
</style>
