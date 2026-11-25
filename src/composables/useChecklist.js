import { ref, computed, watch } from 'vue'

// Lista de verificación que recuerda lo que marcaste (solo en tu navegador).
// `clave` separa una lista de otra en localStorage.
export function useChecklist(clave, items) {
  const storageKey = `checklist:${clave}`
  const marcados = ref(leer())

  function leer() {
    try {
      const guardado = JSON.parse(localStorage.getItem(storageKey))
      return Array.isArray(guardado) ? guardado : []
    } catch {
      return []
    }
  }

  watch(
    marcados,
    (valor) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(valor))
      } catch {
        // Modo privado o almacenamiento bloqueado: la lista funciona, pero no se guarda.
      }
    },
    { deep: true },
  )

  const total = computed(() => items.length)
  const completados = computed(() => items.filter((i) => marcados.value.includes(i.id)).length)
  const listo = computed(() => completados.value === total.value)

  function estaMarcado(id) {
    return marcados.value.includes(id)
  }

  function alternar(id) {
    marcados.value = estaMarcado(id)
      ? marcados.value.filter((m) => m !== id)
      : [...marcados.value, id]
  }

  function reiniciar() {
    marcados.value = []
  }

  return { marcados, total, completados, listo, estaMarcado, alternar, reiniciar }
}
