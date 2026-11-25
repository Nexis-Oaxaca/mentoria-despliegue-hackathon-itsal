<script setup>
import PlatformCard from '@/components/PlatformCard.vue'
import { frontendPlatforms } from '@/data/platforms'
</script>

<template>
  <section class="seccion">
    <div class="contenedor">
      <p class="etiqueta">Práctica real</p>
      <h1>Despliega tu frontend gratis</h1>
      <p class="texto-angosto texto-suave">
        Esta página es el ejemplo: este mismo sitio está desplegado con los pasos que vas a ver
        aquí.
      </p>
    </div>
  </section>

  <section class="seccion" aria-labelledby="titulo-plataformas">
    <div class="contenedor">
      <h2 id="titulo-plataformas">Opciones gratuitas para tu frontend</h2>
      <div class="lista">
        <PlatformCard v-for="p in frontendPlatforms" :key="p.id" :plataforma="p" />
      </div>
    </div>
  </section>
  <!-- Fase 2: checklist previo, guía de Cloudflare, error 404, variables de entorno, problemas comunes y galería. -->
</template>

<style scoped>
.lista {
  display: grid;
  gap: 1rem;
}
</style>
