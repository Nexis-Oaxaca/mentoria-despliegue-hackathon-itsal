import { ref, onScopeDispose } from 'vue'

// Copia texto al portapapeles y avisa durante unos segundos que se copió.
export function useCopyToClipboard(duracionMs = 2000) {
  const copiado = ref(false)
  const error = ref(false)
  let timer = null

  async function copiar(texto) {
    error.value = false
    try {
      await navigator.clipboard.writeText(texto)
      copiado.value = true
    } catch {
      // Sin permiso o en un navegador viejo: avisamos para que copien a mano.
      error.value = true
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      copiado.value = false
      error.value = false
    }, duracionMs)
  }

  onScopeDispose(() => clearTimeout(timer))

  return { copiado, error, copiar }
}
