<script setup>
import { computed } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { formatearFecha } from '@/data/site'

const props = defineProps({
  plataforma: { type: Object, required: true },
  // 'frontend' muestra build, carpeta y fallback de SPA; 'backend' muestra el resumen de servidor.
  modo: { type: String, default: 'frontend' },
  abierta: { type: Boolean, default: false },
})

const tarjeta = computed(() => {
  const valor = props.plataforma.pide_tarjeta
  if (valor === true) return 'Sí'
  if (valor === false) return 'No'
  return valor
})
</script>

<template>
  <details class="tarjeta" :open="abierta" :id="plataforma.id">
    <summary>
      <span class="titulo">
        <span class="nombre">{{ plataforma.nombre }}</span>
        <span v-if="plataforma.recomendada" class="insignia">Recomendada</span>
      </span>
      <span class="ideal">{{ plataforma.ideal_para }}</span>
    </summary>

    <div class="cuerpo">
      <h4>Plan gratuito (verificado el {{ formatearFecha(plataforma.verificado_el) }})</h4>
      <ul>
        <li v-for="item in plataforma.plan_gratuito" :key="item">{{ item }}</li>
      </ul>

      <dl class="datos">
        <dt>¿Pide tarjeta?</dt>
        <dd>{{ tarjeta }}</dd>
        <template v-if="modo === 'frontend'">
          <dt>Comando de build</dt>
          <dd>
            <code>{{ plataforma.build_command }}</code>
          </dd>
          <dt>Carpeta de salida</dt>
          <dd>
            <code>{{ plataforma.output_dir }}</code>
          </dd>
          <template v-if="plataforma.node">
            <dt>Versión de Node</dt>
            <dd>{{ plataforma.node }}</dd>
          </template>
        </template>
        <template v-else-if="plataforma.backend">
          <dt>Tipo de servicio</dt>
          <dd>{{ plataforma.backend.tipo_servicio }}</dd>
          <dt>¿Se duerme?</dt>
          <dd>{{ plataforma.backend.duerme }}</dd>
          <dt>Base de datos</dt>
          <dd>{{ plataforma.backend.base_datos }}</dd>
        </template>
      </dl>

      <template v-if="modo === 'frontend' && plataforma.spa_fallback">
        <h4>Fallback de SPA (el error 404 al recargar)</h4>
        <p>{{ plataforma.spa_fallback }}</p>
        <CodeBlock
          v-if="plataforma.spa_archivo"
          :codigo="plataforma.spa_archivo.codigo"
          :lenguaje="plataforma.spa_archivo.lenguaje"
          :titulo="plataforma.spa_archivo.nombre"
        />
      </template>

      <template v-if="modo === 'frontend' && plataforma.pasos?.length">
        <h4>Pasos rápidos</h4>
        <ol>
          <li v-for="paso in plataforma.pasos" :key="paso">{{ paso }}</li>
        </ol>
      </template>

      <div class="columnas">
        <div>
          <h4>Ventajas</h4>
          <ul>
            <li v-for="v in plataforma.ventajas" :key="v">{{ v }}</li>
          </ul>
        </div>
        <div>
          <h4>Cuidado con</h4>
          <ul class="cuidado">
            <li v-for="c in plataforma.cuidado_con" :key="c">{{ c }}</li>
          </ul>
        </div>
      </div>

      <h4>Fuentes oficiales</h4>
      <ul class="fuentes">
        <li v-for="f in plataforma.fuentes" :key="f.url">
          <a :href="f.url" rel="noopener">{{ f.texto }}</a>
        </li>
      </ul>
    </div>
  </details>
</template>

<style scoped>
.tarjeta {
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
  box-shadow: var(--sombra);
}

.tarjeta[open] {
  border-color: var(--color-acento);
}

summary {
  display: grid;
  gap: 0.3rem;
  padding: 1rem 3rem 1rem 1.25rem;
  cursor: pointer;
  list-style: none;
  position: relative;
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: '+';
  position: absolute;
  right: 1.25rem;
  top: 0.9rem;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-acento-fuerte);
}

.tarjeta[open] summary::after {
  content: '−';
}

.titulo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.nombre {
  font-size: 1.15rem;
  font-weight: 700;
}

.insignia {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--color-acento-suave);
  color: var(--color-acento-fuerte);
}

.ideal {
  color: var(--color-texto-suave);
  font-size: 0.95rem;
}

.cuerpo {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--color-borde);
}

h4 {
  margin: 1.25rem 0 0.5rem;
  font-size: 1rem;
}

.datos {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 0.4rem 1rem;
  margin: 1rem 0;
}

dt {
  font-weight: 600;
  color: var(--color-texto-suave);
}

dd {
  margin: 0;
}

.columnas {
  display: grid;
  gap: 0 1.5rem;
}

@media (min-width: 720px) {
  .columnas {
    grid-template-columns: 1fr 1fr;
  }
}

.cuidado li::marker {
  color: var(--color-cuidado);
}

.fuentes {
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .datos {
    grid-template-columns: minmax(0, 1fr);
  }

  dd {
    margin-bottom: 0.5rem;
  }
}
</style>
