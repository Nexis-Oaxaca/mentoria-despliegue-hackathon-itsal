// Resaltado de código muy ligero (sin librerías): solo pinta comentarios y cadenas.
// Es suficiente para leer los ejemplos y no agrega peso al sitio.

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const CADENA = String.raw`"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|` + '`(?:[^`\\\\]|\\\\.)*`'
const COMENTARIO_SLASH = String.raw`\/\/[^\n]*`
const COMENTARIO_HASH = String.raw`(?:^|(?<=\s))#[^\n]*`

const usaHash = ['bash', 'sh', 'yaml', 'yml', 'toml', 'txt', 'text']

export function resaltar(codigo, lenguaje = 'text') {
  const partes = [CADENA, usaHash.includes(lenguaje) ? COMENTARIO_HASH : COMENTARIO_SLASH]
  // En bash, el apóstrofo aparece en texto normal; solo resaltamos comillas dobles.
  if (lenguaje === 'bash' || lenguaje === 'sh') partes[0] = String.raw`"(?:[^"\\\n]|\\.)*"`
  const patron = new RegExp(partes.join('|'), 'gm')

  let html = ''
  let ultimo = 0
  for (const coincidencia of codigo.matchAll(patron)) {
    const [texto] = coincidencia
    if (!texto) continue
    html += escapar(codigo.slice(ultimo, coincidencia.index))
    const clase = /^["'`]/.test(texto) ? 'tk-cadena' : 'tk-comentario'
    html += `<span class="${clase}">${escapar(texto)}</span>`
    ultimo = coincidencia.index + texto.length
  }
  return html + escapar(codigo.slice(ultimo))
}
