<script setup>
import { RouterLink } from 'vue-router'
import PresentationToggle from '@/components/PresentationToggle.vue'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/frontend', texto: 'Frontend' },
  { to: '/backend', texto: 'Backend' },
]
</script>

<template>
  <header class="encabezado">
    <div class="contenedor fila">
      <RouterLink to="/" class="marca">
        <span aria-hidden="true" class="logo">$0</span>
        <span class="marca-texto">Despliega a costo $0</span>
      </RouterLink>
      <nav aria-label="Principal">
        <ul>
          <li v-for="enlace in enlaces" :key="enlace.to">
            <RouterLink :to="enlace.to">{{ enlace.texto }}</RouterLink>
          </li>
        </ul>
      </nav>
      <PresentationToggle />
    </div>
  </header>
</template>

<style scoped>
.encabezado {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--color-fondo) 92%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-borde);
}

.fila {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.75rem;
  flex-wrap: wrap;
  padding-block: 0.4rem;
}

.marca {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-texto);
  text-decoration: none;
  font-weight: 700;
  margin-right: auto;
}

.logo {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: var(--color-acento);
  color: var(--color-texto-sobre-acento);
  font-size: 0.85rem;
}

.marca-texto {
  display: none;
}

@media (min-width: 720px) {
  .marca-texto {
    display: inline;
  }
}

ul {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  display: block;
  padding: 0.45rem 0.7rem;
  border-radius: var(--radio-chico);
  color: var(--color-texto-suave);
  text-decoration: none;
  font-weight: 600;
}

nav a:hover {
  color: var(--color-texto);
  background: var(--color-superficie-2);
}

nav a.router-link-exact-active {
  color: var(--color-acento-fuerte);
  background: var(--color-acento-suave);
}
</style>
