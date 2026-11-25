<script setup>
import { computed } from 'vue'
import CopyButton from '@/components/CopyButton.vue'
import { resaltar } from '@/utils/highlight'

const props = defineProps({
  codigo: { type: String, required: true },
  lenguaje: { type: String, default: 'text' },
  // Nombre de archivo o descripción corta que aparece arriba del bloque.
  titulo: { type: String, default: '' },
})

const html = computed(() => resaltar(props.codigo.trim(), props.lenguaje))
</script>

<template>
  <figure class="bloque-codigo">
    <figcaption class="barra">
      <span class="titulo">{{ titulo || lenguaje }}</span>
      <CopyButton :texto="codigo.trim()" />
    </figcaption>
    <!-- El HTML viene de resaltar(), que escapa todo el texto antes de agregar <span>. -->
    <pre tabindex="0"><code v-html="html"></code></pre>
  </figure>
</template>

<style scoped>
.bloque-codigo {
  margin: 1rem 0 1.5rem;
  border-radius: var(--radio);
  overflow: hidden;
  background: var(--color-codigo-fondo);
  color: var(--color-codigo-texto);
}

.barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0.5rem 0.4rem 1rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  font-family: var(--fuente-codigo);
  font-size: 0.8rem;
}

.titulo {
  color: var(--color-codigo-comentario);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.55;
}

code {
  background: none;
  border: 0;
  padding: 0;
  font-size: inherit;
  color: inherit;
  overflow-wrap: normal;
}

:deep(.tk-comentario) {
  color: var(--color-codigo-comentario);
  font-style: italic;
}

:deep(.tk-cadena) {
  color: var(--color-codigo-cadena);
}
</style>
