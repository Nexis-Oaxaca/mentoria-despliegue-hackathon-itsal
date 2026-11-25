<script setup>
defineProps({
  plataformas: { type: Array, required: true },
})

function tarjeta(valor) {
  if (valor === true) return 'Sí'
  if (valor === false) return 'No'
  return valor
}
</script>

<template>
  <div class="tabla-scroll" tabindex="0" role="region" aria-label="Comparativa de backends">
    <table>
      <thead>
        <tr>
          <th scope="col">Plataforma</th>
          <th scope="col">Tipo de servicio</th>
          <th scope="col">¿Duerme por inactividad?</th>
          <th scope="col">Límites del plan gratuito</th>
          <th scope="col">¿Pide tarjeta?</th>
          <th scope="col">Base de datos</th>
          <th scope="col">Dificultad</th>
          <th scope="col">Fuente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in plataformas" :key="p.id">
          <th scope="row">{{ p.nombre }}</th>
          <td>{{ p.backend.tipo_servicio }}</td>
          <td>{{ p.backend.duerme }}</td>
          <td>{{ p.backend.limites }}</td>
          <td>{{ tarjeta(p.pide_tarjeta) }}</td>
          <td>{{ p.backend.base_datos }}</td>
          <td>{{ p.backend.dificultad }}</td>
          <td><a :href="p.docs_url" rel="noopener">Docs</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-scroll {
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
}

table {
  width: 100%;
  min-width: 60rem;
  border-collapse: collapse;
  font-size: 0.92rem;
  background: var(--color-superficie);
}

th,
td {
  padding: 0.7rem 0.9rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--color-borde);
}

thead th {
  background: var(--color-superficie-2);
}

tbody tr:last-child > * {
  border-bottom: 0;
}
</style>
