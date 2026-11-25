<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <a class="saltar" href="#contenido">Saltar al contenido</a>
  <AppHeader />
  <main id="contenido" tabindex="-1">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.saltar {
  position: absolute;
  left: 1rem;
  top: -3rem;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--color-acento);
  color: var(--color-texto-sobre-acento);
  border-radius: var(--radio-chico);
  font-weight: 600;
}

.saltar:focus {
  top: 0.5rem;
}

main:focus {
  outline: none;
}
</style>
