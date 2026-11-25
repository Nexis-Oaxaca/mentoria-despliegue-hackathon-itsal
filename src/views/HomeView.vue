<script setup>
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'
</script>

<template>
  <section class="seccion hero">
    <div class="contenedor">
      <p class="etiqueta">Mentoría · {{ site.institucionCorta }}</p>
      <h1>{{ site.titulo }} para la demo de tu hackathon</h1>
      <p class="subtitulo">{{ site.subtitulo }}</p>
      <div class="acciones">
        <RouterLink to="/frontend" class="boton boton-primario">Desplegar mi frontend</RouterLink>
        <RouterLink to="/backend" class="boton boton-secundario">¿Y mi backend?</RouterLink>
      </div>
    </div>
  </section>
  <!-- Fase 4: diagrama, cuestionario stateful/stateless, tarjetas resumen, consejo final y autor. -->
</template>

<style scoped>
.hero {
  padding-block: 4rem 3rem;
}

.subtitulo {
  font-size: 1.25rem;
  color: var(--color-texto-suave);
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
