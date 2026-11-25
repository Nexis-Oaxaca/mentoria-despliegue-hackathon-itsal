// Datos generales del sitio. Si cambias algo aquí, cambia en todo el sitio.

export const site = {
  titulo: 'Despliega tu proyecto a costo $0',
  subtitulo: 'Ya lo tienes listo. Ahora vamos a subirlo.',
  institucion: 'Instituto Tecnológico de Salina Cruz (ITSAL)',
  institucionCorta: 'ITSAL',
  audiencia: '[CONFIRMAR: carrera / semestre]',
  fechaSesion: '2026-11-25',
  // Fecha en la que se revisó la documentación oficial de cada plataforma.
  verificadoEl: '2026-11-25',
  // URL pública del sitio desplegado en Cloudflare Workers.
  urlPublica: '[CONFIRMAR: URL final de workers.dev tras el primer despliegue]',
  repoUrl: 'https://github.com/Nexis-Oaxaca/mentoria-despliegue-hackathon-itsal',
}

export const autor = {
  nombre: 'Joan Garfias',
  edad: 22,
  origen: 'Istmo de Tehuantepec',
  comunidad: { nombre: 'Nexis Oaxaca', url: 'https://nexisoaxaca.tech' },
  frase: 'También sufro con las entregas de proyectos.',
  linkedin: 'https://www.linkedin.com/in/joangarfias',
  github: 'https://github.com/JoanGarfias',
}

// Convierte '2026-11-25' en '25 de noviembre de 2026' sin depender de la zona horaria.
export function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number)
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]
  return `${dia} de ${meses[mes - 1]} de ${anio}`
}
