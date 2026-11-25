<script setup>
import { ref, computed } from 'vue'
import StepList from '@/components/StepList.vue'
import { caminosCloudflare } from '@/data/frontendSteps'

const activo = ref(caminosCloudflare[0].id)
const camino = computed(() => caminosCloudflare.find((c) => c.id === activo.value))
const botones = ref([])

// Navegación con flechas entre pestañas, como pide el patrón de accesibilidad de "tabs".
function moverFoco(indice, delta) {
  const total = caminosCloudflare.length
  const siguiente = (indice + delta + total) % total
  activo.value = caminosCloudflare[siguiente].id
  botones.value[siguiente]?.focus()
}
</script>

<template>
  <div class="guia">
    <div class="pestanas" role="tablist" aria-label="Elige cómo desplegar en Cloudflare">
      <button
        v-for="(c, i) in caminosCloudflare"
        :key="c.id"
        :ref="(el) => (botones[i] = el)"
        :id="`tab-${c.id}`"
        type="button"
        role="tab"
        :aria-selected="activo === c.id"
        :aria-controls="`panel-${c.id}`"
        :tabindex="activo === c.id ? 0 : -1"
        :class="['pestana', `producto-${c.producto.toLowerCase()}`]"
        @click="activo = c.id"
        @keydown.right.prevent="moverFoco(i, 1)"
        @keydown.left.prevent="moverFoco(i, -1)"
      >
        {{ c.titulo }}
      </button>
    </div>

    <div
      :id="`panel-${camino.id}`"
      role="tabpanel"
      :aria-labelledby="`tab-${camino.id}`"
      class="panel"
      tabindex="0"
    >
      <p class="resumen">{{ camino.resumen }}</p>
      <StepList :pasos="camino.pasos" />
    </div>
  </div>
</template>

<style scoped>
.pestanas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: 0.5rem;
}

.pestana {
  min-height: 2.75rem;
  padding: 0.6rem 0.9rem;
  border: 2px solid var(--color-borde);
  border-radius: var(--radio-chico);
  background: var(--color-superficie);
  color: var(--color-texto);
  font: inherit;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.pestana:hover {
  border-color: var(--color-acento);
}

.pestana[aria-selected='true'] {
  border-color: var(--color-acento);
  background: var(--color-acento-suave);
  color: var(--color-acento-fuerte);
}

.panel {
  margin-top: 1.25rem;
}

.panel:focus-visible {
  outline-offset: 6px;
}

.resumen {
  font-size: 1.05rem;
  color: var(--color-texto-suave);
}
</style>
