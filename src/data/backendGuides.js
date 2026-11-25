// Contenido de la sección de backend. SOLO DOCUMENTACIÓN: aquí no se despliega nada.
// Fuentes consultadas el 2026-11-25 (enlazadas en cada fragmento).

export const antesDeElegir = [
  {
    id: 'stateless',
    titulo: 'Stateless contra stateful',
    texto:
      'Un backend stateless (sin estado) no recuerda nada entre una solicitud y otra: todo lo que necesita guardar lo manda a una base de datos o a un servicio externo. Los planes gratuitos apagan, duermen o reinician tu servidor, y lo que estaba en memoria o en el disco se pierde. Si tu backend es stateless, vas bien. Si guarda sesiones en memoria o archivos en su disco, considera hacerlo stateless.',
  },
  {
    id: 'cors',
    titulo: 'CORS: por qué tu frontend "no puede" llamar a tu API',
    texto:
      'CORS (Cross-Origin Resource Sharing) es una regla del navegador: una página en mi-app.workers.dev no puede leer respuestas de mi-api.onrender.com, a menos que la API diga explícitamente que lo permite con el encabezado Access-Control-Allow-Origin. El error aparece en la consola del navegador, no en tu servidor. Se arregla en el backend, permitiendo el dominio de tu frontend (no "*" si manejas sesiones).',
  },
  {
    id: 'secretos',
    titulo: 'Variables de entorno y secretos',
    texto:
      'Las llaves de tu base de datos, de pagos o de APIs externas viven en el backend, configuradas como variables de entorno en la plataforma. Nunca en el repo ni en el frontend. Si subiste una llave a GitHub por error, cámbiala (rótala): borrar el commit no basta.',
  },
  {
    id: 'dormir',
    titulo: 'Dormir por inactividad',
    texto:
      'Varios planes gratuitos apagan tu servidor si nadie lo usa por unos minutos. La siguiente solicitud lo despierta, pero tarda (en Render, alrededor de un minuto). Para tu demo: abre tu API 2 o 3 minutos antes de presentar, y muestra un "cargando…" en el frontend en lugar de una pantalla vacía.',
  },
  {
    id: 'bd-separada',
    titulo: 'La base de datos va separada del servidor',
    texto:
      'No guardes datos en un archivo SQLite dentro de tu servidor gratuito: cuando se reinicie, se pierden. Usa una base de datos administrada (Supabase, D1, Postgres de la plataforma) y conéctate a ella con una variable de entorno.',
  },
]

export const flujoGeneral = [
  {
    titulo: 'Tu backend en un repo de GitHub',
    descripcion:
      'Puede ser el mismo repo del frontend (en una carpeta como /api) o uno separado. Si es el mismo, la plataforma te pide un "root directory".',
  },
  {
    titulo: 'Crea un servicio nuevo en la plataforma',
    descripcion:
      'En Render se llama "Web Service"; en Railway, "New Project"; en Heroku, "New app".',
  },
  {
    titulo: 'Comando de build y comando de inicio',
    descripcion: 'El de build instala dependencias; el de inicio levanta tu servidor.',
    valores: [
      { campo: 'Build command', valor: 'npm install' },
      { campo: 'Start command', valor: 'npm start' },
    ],
  },
  {
    titulo: 'Escucha en el puerto que te da la plataforma',
    descripcion:
      'Tu servidor debe usar process.env.PORT, no un puerto fijo. En Render, el valor por defecto es 10000.',
  },
  {
    titulo: 'Configura las variables de entorno',
    descripcion:
      'DATABASE_URL, llaves de APIs y el dominio de tu frontend para CORS (por ejemplo, FRONTEND_URL).',
  },
  {
    titulo: 'Despliega y copia la URL',
    descripcion: 'Algo como https://mi-api.onrender.com. Pruébala directo en el navegador.',
  },
  {
    titulo: 'Conecta el frontend con VITE_API_URL',
    descripcion:
      'En la plataforma de tu frontend, crea VITE_API_URL con la URL de tu API y vuelve a desplegar el frontend.',
    codigo: {
      codigo: `const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/saludo\`)
const datos = await res.json()`,
      lenguaje: 'js',
      titulo: 'src/composables/useApi.js',
    },
  },
  {
    titulo: 'Prueba CORS desde tu sitio publicado',
    descripcion:
      'Abre tu frontend ya desplegado, abre la consola del navegador (F12) y busca errores que digan "CORS". Si aparecen, revisa que el backend permita exactamente el dominio de tu frontend.',
    resultado: 'Los datos de tu API aparecen en tu sitio y la consola está limpia.',
  },
]

export const fragmentos = [
  {
    id: 'worker',
    titulo: 'Endpoint mínimo en un Worker de Cloudflare',
    plataforma: 'Cloudflare Workers',
    lenguaje: 'js',
    archivo: 'src/index.js',
    codigo: `// Ejemplo de referencia, basado en el "Hello World" oficial de Cloudflare.
// Un Worker exporta un objeto con un método fetch que recibe cada solicitud.
const FRONTEND = 'https://mi-proyecto-hackathon.mi-subdominio.workers.dev'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Encabezados CORS: solo tu frontend puede leer las respuestas.
    const cors = {
      'Access-Control-Allow-Origin': FRONTEND,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // El navegador pregunta primero con OPTIONS ("preflight").
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors })
    }

    if (url.pathname === '/api/saludo') {
      return Response.json({ mensaje: '¡Hola desde el borde!' }, { headers: cors })
    }

    return new Response('No encontrado', { status: 404, headers: cors })
  },
}`,
    fuente: 'https://developers.cloudflare.com/workers/get-started/guide/',
  },
  {
    id: 'express',
    titulo: 'Servidor Express listo para Render',
    plataforma: 'Render',
    lenguaje: 'js',
    archivo: 'app.js',
    codigo: `// Ejemplo de referencia, basado en render-examples/express-hello-world.
// Requiere: npm install express cors
const express = require('express')
const cors = require('cors')

const app = express()

// Render te da el puerto en process.env.PORT. En local usamos 3001.
const port = process.env.PORT || 3001

// Solo permitimos llamadas desde tu frontend (configúralo en Render como variable de entorno).
app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde Render!' })
})

app.listen(port, () => console.log(\`API escuchando en el puerto \${port}\`))`,
    fuente: 'https://github.com/render-examples/express-hello-world',
    fuenteExtra: 'https://render.com/docs/web-services#port-binding',
  },
]

// Consejo final de la mentoría. Se muestra en Inicio y al final de /backend.
export const consejoFinal = {
  titulo: 'Mi consejo final',
  puntos: [
    { etiqueta: 'Base de datos', valor: 'PostgreSQL en Supabase' },
    { etiqueta: 'Frontend y backend', valor: 'Cloudflare (Workers o Pages)' },
  ],
  studentPack: {
    titulo: 'Si tienes el GitHub Student Developer Pack',
    puntos: [
      { etiqueta: 'Frontend', valor: 'Cloudflare Pages' },
      { etiqueta: 'Backend y base de datos', valor: 'Heroku (con el crédito para estudiantes)' },
    ],
    oferta:
      'Heroku da $13 de crédito al mes durante 24 meses ($312 en total). Necesitas ser mayor de 18 años y registrar una tarjeta de crédito o débito; lo que pase de $13 al mes se cobra a esa tarjeta.',
    comoSolicitar: [
      'Necesitas tener al menos 13 años, estar inscrito en una escuela y tener una cuenta personal de GitHub.',
      'Agrega y verifica tu correo institucional en tu cuenta de GitHub (si tu escuela lo pide).',
      'Ve a github.com/settings/education/benefits y da clic en "Start an application".',
      'Llena el formulario. Te pueden pedir una prueba: credencial con fecha vigente, horario, kárdex o constancia de estudios.',
      'Cuando te aprueben, entra a heroku.com/github-students para activar el crédito de Heroku.',
    ],
    fuentes: [
      {
        texto: 'Solicitar GitHub Education',
        url: 'https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student',
      },
      { texto: 'Heroku para estudiantes de GitHub', url: 'https://www.heroku.com/github-students' },
      { texto: 'Student Developer Pack', url: 'https://education.github.com/pack' },
    ],
  },
}
