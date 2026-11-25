<script setup>
import { computed } from 'vue'

const props = defineProps({
  variante: {
    type: String,
    default: 'tip',
    validator: (v) => ['tip', 'cuidado', 'importante'].includes(v),
  },
  titulo: { type: String, default: '' },
})

const config = {
  tip: { icono: '💡', titulo: 'Tip' },
  cuidado: { icono: '⚠️', titulo: 'Cuidado' },
  importante: { icono: '❗', titulo: 'Importante' },
}

const actual = computed(() => config[props.variante])
</script>

<template>
  <aside class="callout" :class="`callout-${variante}`">
    <p class="encabezado">
      <span aria-hidden="true">{{ actual.icono }}</span>
      <strong>{{ titulo || actual.titulo }}</strong>
    </p>
    <div class="cuerpo"><slot /></div>
  </aside>
</template>

<style scoped>
.callout {
  margin: 1.25rem 0;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--borde);
  border-radius: var(--radio-chico);
  background: var(--fondo);
}

.callout-tip {
  --borde: var(--color-tip);
  --fondo: var(--color-tip-fondo);
}

.callout-cuidado {
  --borde: var(--color-cuidado);
  --fondo: var(--color-cuidado-fondo);
}

.callout-importante {
  --borde: var(--color-importante);
  --fondo: var(--color-importante-fondo);
}

.encabezado {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.cuerpo :deep(p:last-child),
.cuerpo :deep(ul:last-child) {
  margin-bottom: 0;
}
</style>
