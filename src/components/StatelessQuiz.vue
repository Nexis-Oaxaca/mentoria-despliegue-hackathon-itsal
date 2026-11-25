<script setup>
import { ref, computed } from 'vue'

const preguntas = [
  {
    id: 'archivos',
    texto: '¿Guardas archivos que suben los usuarios en el disco del servidor?',
    arreglo: 'Mueve los archivos a un almacenamiento externo (Supabase Storage, Cloudflare R2).',
  },
  {
    id: 'sesiones',
    texto: '¿Guardas las sesiones de login en la memoria del servidor?',
    arreglo: 'Usa tokens (JWT) o guarda las sesiones en la base de datos.',
  },
  {
    id: 'bd-local',
    texto: '¿Tu base de datos es un archivo dentro del servidor (por ejemplo, SQLite)?',
    arreglo: 'Usa una base de datos administrada: PostgreSQL en Supabase o D1 en Cloudflare.',
  },
  {
    id: 'variables',
    texto: '¿Guardas datos en variables globales del servidor (contadores, carritos, listas)?',
    arreglo: 'Guárdalos en la base de datos o, si son del usuario, en el cliente (localStorage).',
  },
]

// null = sin responder, true = sí, false = no
const respuestas = ref(Object.fromEntries(preguntas.map((p) => [p.id, null])))

const respondidas = computed(() => Object.values(respuestas.value).filter((r) => r !== null).length)
const completo = computed(() => respondidas.value === preguntas.length)
const pendientes = computed(() => preguntas.filter((p) => respuestas.value[p.id] === true))
const esStateless = computed(() => completo.value && pendientes.value.length === 0)

function reiniciar() {
  for (const p of preguntas) respuestas.value[p.id] = null
}
</script>

<template>
  <div class="quiz">
    <fieldset v-for="(p, i) in preguntas" :key="p.id" class="pregunta">
      <legend>{{ i + 1 }}. {{ p.texto }}</legend>
      <div class="opciones">
        <label :class="{ elegida: respuestas[p.id] === true }">
          <input v-model="respuestas[p.id]" type="radio" :name="p.id" :value="true" />
          Sí
        </label>
        <label :class="{ elegida: respuestas[p.id] === false }">
          <input v-model="respuestas[p.id]" type="radio" :name="p.id" :value="false" />
          No
        </label>
      </div>
    </fieldset>

    <div class="resultado" aria-live="polite">
      <p v-if="!completo" class="texto-suave">
        Respondidas: {{ respondidas }} de {{ preguntas.length }}.
      </p>
      <div v-else-if="esStateless" class="bien">
        <p><strong>✅ Tu app es stateless. Vas bien.</strong></p>
        <p>
          Cualquier plataforma gratuita te sirve: aunque reinicien o duerman tu servidor, no pierdes
          nada.
        </p>
      </div>
      <div v-else class="cambiar">
        <p>
          <strong>⚠️ Tu app es stateful.</strong> En un plan gratuito, el servidor se reinicia o se
          duerme y vas a perder datos. Considera hacerla stateless:
        </p>
        <ul>
          <li v-for="p in pendientes" :key="p.id">{{ p.arreglo }}</li>
        </ul>
      </div>
      <button v-if="respondidas > 0" type="button" class="reiniciar" @click="reiniciar">
        Volver a empezar
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: 0.75rem;
}

.pregunta {
  margin: 0;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
}

legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.opciones {
  clear: both;
  display: flex;
  gap: 0.5rem;
}

label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.5rem;
  padding: 0.35rem 1rem;
  border: 2px solid var(--color-borde);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
}

label:has(input:focus-visible) {
  outline: 3px solid var(--color-acento);
  outline-offset: 2px;
}

label.elegida {
  border-color: var(--color-acento);
  background: var(--color-acento-suave);
}

input {
  accent-color: var(--color-acento);
}

.resultado {
  min-height: 2rem;
}

.bien,
.cambiar {
  padding: 1rem 1.25rem;
  border-radius: var(--radio);
  border-left: 4px solid;
}

.bien {
  border-color: var(--color-tip);
  background: var(--color-tip-fondo);
}

.cambiar {
  border-color: var(--color-cuidado);
  background: var(--color-cuidado-fondo);
}

.bien p:last-child,
.cambiar ul {
  margin-bottom: 0;
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
