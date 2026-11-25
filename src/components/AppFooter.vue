<script setup>
import { site, autor, formatearFecha } from '@/data/site'
</script>

<template>
  <footer class="pie">
    <div class="contenedor">
      <p>
        Mentoría de <a :href="autor.linkedin" rel="noopener">{{ autor.nombre }}</a> para el
        {{ site.institucion }} · Comunidad
        <a :href="autor.comunidad.url" rel="noopener">{{ autor.comunidad.nombre }}</a>
      </p>
      <p class="texto-suave">
        Última verificación de datos: {{ formatearFecha(site.verificadoEl) }}. Los planes gratuitos
        cambian seguido: antes de tu demo, revisa la documentación oficial que enlazamos.
      </p>
      <p class="texto-suave">
        <a :href="site.repoUrl" rel="noopener">Código fuente de este sitio en GitHub</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.pie {
  margin-top: 2rem;
  padding-block: 2rem;
  border-top: 1px solid var(--color-borde);
  background: var(--color-superficie-2);
  font-size: 0.95rem;
}

.pie p:last-child {
  margin-bottom: 0;
}
</style>
