<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="seccion">
    <div class="contenedor texto-angosto">
      <p class="etiqueta">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>
        Dato curioso: si estás viendo esto, el fallback de SPA funciona. El hosting le entregó
        <code>index.html</code> a Vue Router, y fue Vue Router quien decidió que esta ruta no
        existe.
      </p>
      <RouterLink to="/" class="boton boton-primario">Volver al inicio</RouterLink>
    </div>
  </section>
</template>
