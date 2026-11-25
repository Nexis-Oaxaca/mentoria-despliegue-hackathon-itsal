<script setup>
// Diagrama del problema del 404 al recargar una SPA, hecho con HTML y CSS.
</script>

<template>
  <div class="diagrama">
    <figure class="caso caso-mal">
      <figcaption>Sin fallback</figcaption>
      <ol>
        <li>Recargas <code>/frontend</code></li>
        <li>El hosting busca un archivo llamado <code>frontend</code></li>
        <li>No existe: solo hay <code>index.html</code> y <code>assets/</code></li>
        <li class="final">❌ Error 404</li>
      </ol>
    </figure>
    <figure class="caso caso-bien">
      <figcaption>Con fallback de SPA</figcaption>
      <ol>
        <li>Recargas <code>/frontend</code></li>
        <li>No hay archivo con ese nombre…</li>
        <li>…así que el hosting responde con <code>index.html</code></li>
        <li class="final">✅ Vue Router lee la URL y muestra la página</li>
      </ol>
    </figure>
  </div>
</template>

<style scoped>
.diagrama {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (min-width: 720px) {
  .diagrama {
    grid-template-columns: 1fr 1fr;
  }
}

.caso {
  margin: 0;
  padding: 1.25rem;
  border-radius: var(--radio);
  border: 2px solid var(--borde);
  background: var(--fondo);
}

.caso-mal {
  --borde: var(--color-importante);
  --fondo: var(--color-importante-fondo);
}

.caso-bien {
  --borde: var(--color-tip);
  --fondo: var(--color-tip-fondo);
}

figcaption {
  font-weight: 700;
  margin-bottom: 0.75rem;
}

ol {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.35rem;
}

.final {
  font-weight: 700;
}
</style>
