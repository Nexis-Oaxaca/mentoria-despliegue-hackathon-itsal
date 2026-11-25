<script setup>
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'

const props = defineProps({
  texto: { type: String, required: true },
  etiqueta: { type: String, default: 'Copiar' },
})

const { copiado, error, copiar } = useCopyToClipboard()
</script>

<template>
  <button type="button" class="copiar" :class="{ copiado }" @click="copiar(props.texto)">
    <span aria-hidden="true">{{ copiado ? '✓' : '⧉' }}</span>
    <span>{{ copiado ? '¡Copiado!' : error ? 'Cópialo a mano' : etiqueta }}</span>
    <span class="solo-lectores" role="status">{{ copiado ? 'Copiado al portapapeles' : '' }}</span>
  </button>
</template>

<style scoped>
.copiar {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2rem;
  padding: 0.25rem 0.65rem;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: var(--radio-chico);
  background: rgb(255 255 255 / 0.08);
  color: var(--color-codigo-texto);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.copiar:hover {
  background: rgb(255 255 255 / 0.16);
}

.copiado {
  border-color: #3fb950;
  color: #7ee787;
}
</style>
