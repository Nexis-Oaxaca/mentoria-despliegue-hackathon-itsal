<script setup>
import { usePresentationMode } from '@/composables/usePresentationMode'

const { activo, alternar } = usePresentationMode()
</script>

<template>
  <button
    type="button"
    class="interruptor"
    :aria-pressed="activo"
    title="Agranda la letra para proyectar en el salón"
    @click="alternar"
  >
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 4h18v12H3zM8 20h8M12 16v4"
      />
    </svg>
    <span>Modo presentación</span>
  </button>
</template>

<style scoped>
.interruptor {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.5rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--color-borde);
  border-radius: 999px;
  background: var(--color-superficie);
  color: var(--color-texto-suave);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.interruptor:hover {
  color: var(--color-texto);
}

.interruptor[aria-pressed='true'] {
  background: var(--color-acento);
  border-color: var(--color-acento);
  color: var(--color-texto-sobre-acento);
}
</style>
