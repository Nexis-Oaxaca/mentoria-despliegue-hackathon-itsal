<script setup>
import { useChecklist } from '@/composables/useChecklist'
import { checklistPrevio } from '@/data/frontendSteps'

const { completados, total, listo, estaMarcado, alternar, reiniciar } = useChecklist(
  'antes-de-desplegar',
  checklistPrevio,
)
</script>

<template>
  <div class="checklist">
    <div class="progreso" aria-live="polite">
      <strong>{{ completados }} de {{ total }}</strong>
      <span v-if="listo"> · ¡Listo para desplegar! 🚀</span>
      <span v-else> · Marca cada punto cuando lo hayas revisado.</span>
    </div>
    <div
      class="barra"
      role="progressbar"
      aria-label="Avance del checklist"
      :aria-valuenow="completados"
      aria-valuemin="0"
      :aria-valuemax="total"
    >
      <span :style="{ width: `${(completados / total) * 100}%` }"></span>
    </div>

    <ul>
      <li v-for="item in checklistPrevio" :key="item.id">
        <label :class="{ marcado: estaMarcado(item.id) }">
          <input type="checkbox" :checked="estaMarcado(item.id)" @change="alternar(item.id)" />
          <span>
            <span class="texto">{{ item.texto }}</span>
            <span class="ayuda">{{ item.ayuda }}</span>
          </span>
        </label>
      </li>
    </ul>

    <button v-if="completados > 0" type="button" class="reiniciar" @click="reiniciar">
      Reiniciar checklist
    </button>
  </div>
</template>

<style scoped>
.checklist {
  padding: 1.25rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
  box-shadow: var(--sombra);
}

.barra {
  height: 0.5rem;
  margin: 0.5rem 0 1rem;
  border-radius: 999px;
  background: var(--color-superficie-2);
  overflow: hidden;
}

.barra span {
  display: block;
  height: 100%;
  background: var(--color-acento);
  transition: width 0.25s;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

label {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: var(--radio-chico);
  cursor: pointer;
}

label:hover {
  background: var(--color-superficie-2);
}

input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
  accent-color: var(--color-acento);
}

.texto {
  display: block;
  font-weight: 600;
}

.marcado .texto {
  text-decoration: line-through;
  color: var(--color-texto-suave);
}

.ayuda {
  display: block;
  font-size: 0.92rem;
  color: var(--color-texto-suave);
}

.reiniciar {
  margin-top: 0.75rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-chico);
  background: transparent;
  color: var(--color-texto-suave);
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
