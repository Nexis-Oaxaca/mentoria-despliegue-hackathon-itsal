<script setup>
const etapas = [
  { titulo: 'Tu código Vue', detalle: '.vue, .js, .css', icono: '🧩' },
  { titulo: 'npm run build', detalle: 'Vite compila y optimiza', icono: '⚙️' },
  { titulo: 'Carpeta dist/', detalle: 'Solo HTML, CSS y JS', icono: '📁' },
  { titulo: 'Hosting', detalle: 'Cloudflare, Vercel…', icono: '☁️' },
  { titulo: 'URL pública', detalle: 'tu-proyecto.workers.dev', icono: '🌐' },
]
</script>

<template>
  <ol class="flujo" aria-label="Del código a la URL pública">
    <li v-for="(e, i) in etapas" :key="e.titulo" class="etapa">
      <span class="icono" aria-hidden="true">{{ e.icono }}</span>
      <strong>{{ e.titulo }}</strong>
      <span class="detalle">{{ e.detalle }}</span>
      <span v-if="i < etapas.length - 1" class="flecha" aria-hidden="true">→</span>
    </li>
  </ol>
</template>

<style scoped>
.flujo {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: grid;
  gap: 1.75rem;
}

.etapa {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.15rem;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
}

.etapa:nth-child(3) {
  border: 2px solid var(--color-acento);
  background: var(--color-acento-suave);
}

.icono {
  font-size: 1.6rem;
}

.detalle {
  font-size: 0.88rem;
  color: var(--color-texto-suave);
}

.flecha {
  position: absolute;
  bottom: -1.6rem;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  font-size: 1.3rem;
  color: var(--color-acento-fuerte);
}

@media (min-width: 860px) {
  .flujo {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.75rem;
  }

  .flecha {
    bottom: auto;
    top: 50%;
    left: auto;
    right: -1.4rem;
    transform: translateY(-50%);
  }
}
</style>
