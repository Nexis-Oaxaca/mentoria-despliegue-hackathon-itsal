<script setup>
import { consejoFinal } from '@/data/backendGuides'
</script>

<template>
  <div class="consejo">
    <h2 class="titulo">{{ consejoFinal.titulo }}</h2>
    <dl class="puntos">
      <div v-for="p in consejoFinal.puntos" :key="p.etiqueta">
        <dt>{{ p.etiqueta }}</dt>
        <dd>{{ p.valor }}</dd>
      </div>
    </dl>

    <div class="pack">
      <h3>{{ consejoFinal.studentPack.titulo }}</h3>
      <dl class="puntos">
        <div v-for="p in consejoFinal.studentPack.puntos" :key="p.etiqueta">
          <dt>{{ p.etiqueta }}</dt>
          <dd>{{ p.valor }}</dd>
        </div>
      </dl>
      <p>{{ consejoFinal.studentPack.oferta }}</p>
      <details>
        <summary>Cómo solicitar el Student Developer Pack</summary>
        <ol>
          <li v-for="paso in consejoFinal.studentPack.comoSolicitar" :key="paso">{{ paso }}</li>
        </ol>
      </details>
      <p class="fuentes">
        Fuentes:
        <template v-for="(f, i) in consejoFinal.studentPack.fuentes" :key="f.url">
          <a :href="f.url" rel="noopener">{{ f.texto }}</a
          ><span v-if="i < consejoFinal.studentPack.fuentes.length - 1"> · </span>
        </template>
      </p>
    </div>
  </div>
</template>

<style scoped>
.consejo {
  padding: 1.5rem;
  border-radius: var(--radio);
  border: 2px solid var(--color-acento);
  background: var(--color-tip-fondo);
}

.titulo {
  margin-bottom: 1rem;
}

.puntos {
  display: grid;
  gap: 0.75rem;
  margin: 0 0 1rem;
}

@media (min-width: 640px) {
  .puntos {
    grid-template-columns: 1fr 1fr;
  }
}

.puntos div {
  padding: 0.9rem 1rem;
  border-radius: var(--radio-chico);
  background: var(--color-superficie);
}

dt {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-texto-suave);
}

dd {
  margin: 0.2rem 0 0;
  font-size: 1.15rem;
  font-weight: 700;
}

.pack {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-borde);
}

summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-acento-fuerte);
  margin-bottom: 0.5rem;
}

.fuentes {
  font-size: 0.9rem;
  margin: 1rem 0 0;
}
</style>
