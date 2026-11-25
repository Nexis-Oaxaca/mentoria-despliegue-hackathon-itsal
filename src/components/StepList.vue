<script setup>
import CodeBlock from '@/components/CodeBlock.vue'

// Cada paso: { titulo, descripcion?, valores?: [{ campo, valor }],
//              codigo?: { codigo, lenguaje, titulo }, resultado?, captura? }
defineProps({
  pasos: { type: Array, required: true },
})
</script>

<template>
  <ol class="pasos">
    <li v-for="(paso, i) in pasos" :key="paso.titulo" class="paso">
      <span class="numero" aria-hidden="true">{{ i + 1 }}</span>
      <div class="contenido">
        <h3>{{ paso.titulo }}</h3>
        <p v-if="paso.descripcion">{{ paso.descripcion }}</p>

        <dl v-if="paso.valores?.length" class="valores">
          <template v-for="v in paso.valores" :key="v.campo">
            <dt>{{ v.campo }}</dt>
            <dd>
              <code>{{ v.valor }}</code>
            </dd>
          </template>
        </dl>

        <CodeBlock
          v-if="paso.codigo"
          :codigo="paso.codigo.codigo"
          :lenguaje="paso.codigo.lenguaje"
          :titulo="paso.codigo.titulo"
        />

        <p v-if="paso.resultado" class="resultado">
          <strong>Qué deberías ver:</strong> {{ paso.resultado }}
        </p>
        <p v-if="paso.captura" class="captura">[CAPTURA: {{ paso.captura }}]</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.pasos {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  counter-reset: none;
}

.paso {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: 0.9rem;
  padding-bottom: 1.5rem;
  position: relative;
}

.paso:not(:last-child)::before {
  content: '';
  position: absolute;
  left: calc(1.125rem - 1px);
  top: 2.5rem;
  bottom: 0.25rem;
  width: 2px;
  background: var(--color-borde);
}

.numero {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--color-acento);
  color: var(--color-texto-sobre-acento);
  font-weight: 700;
}

h3 {
  font-size: 1.1rem;
  margin: 0.35rem 0 0.4rem;
}

.valores {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 0.35rem 1rem;
  margin: 0.75rem 0 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-superficie-2);
  border-radius: var(--radio-chico);
}

dt {
  font-weight: 600;
  color: var(--color-texto-suave);
}

dd {
  margin: 0;
}

.resultado {
  padding: 0.6rem 0.9rem;
  border-radius: var(--radio-chico);
  background: var(--color-tip-fondo);
}

.captura {
  padding: 1.5rem;
  border: 2px dashed var(--color-borde);
  border-radius: var(--radio-chico);
  text-align: center;
  color: var(--color-texto-suave);
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .valores {
    grid-template-columns: minmax(0, 1fr);
  }

  dd {
    margin-bottom: 0.4rem;
  }
}
</style>
