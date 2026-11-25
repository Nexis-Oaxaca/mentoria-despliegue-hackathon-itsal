import { ref, watch } from 'vue'

// Modo presentación: agranda la tipografía para proyectar en el salón.
// El estado es compartido por toda la app (vive fuera de la función).
const STORAGE_KEY = 'modo-presentacion'
const activo = ref(leer())

function leer() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

watch(
  activo,
  (valor) => {
    document.documentElement.classList.toggle('modo-presentacion', valor)
    try {
      localStorage.setItem(STORAGE_KEY, valor ? '1' : '0')
    } catch {
      // Sin almacenamiento: el modo funciona, pero no se recuerda.
    }
  },
  { immediate: true },
)

export function usePresentationMode() {
  function alternar() {
    activo.value = !activo.value
  }
  return { activo, alternar }
}
