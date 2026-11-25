<script setup>
import PlatformCard from '@/components/PlatformCard.vue'
import { backendPlatforms } from '@/data/platforms'
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <p class="etiqueta">Solo documentación</p>
      <h1>¿Y mi backend?</h1>
      <p class="texto-angosto texto-suave">
        Aquí no desplegamos ningún backend. Te explicamos qué opciones hay, qué decidir antes y cómo
        se vería el proceso.
      </p>
    </div>
  </section>

  <section class="seccion" aria-labelledby="titulo-plataformas-backend">
    <div class="contenedor">
      <h2 id="titulo-plataformas-backend">Opciones gratuitas para tu backend</h2>
      <div class="lista">
        <PlatformCard v-for="p in backendPlatforms" :key="p.id" :plataforma="p" modo="backend" />
      </div>
    </div>
  </section>
  <!-- Fase 3: antes de elegir, flujo general, fragmentos de referencia y tabla comparativa. -->
</template>

<style scoped>
.lista {
  display: grid;
  gap: 1rem;
}
</style>
