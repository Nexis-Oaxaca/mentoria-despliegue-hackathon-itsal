// Guía principal de frontend: Cloudflare (Workers y Pages).
// Fuentes consultadas el 2026-11-25:
// - Workers Builds: https://developers.cloudflare.com/workers/ci-cd/builds/
// - Configuración de builds: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
// - CLI (wrangler): https://developers.cloudflare.com/workers/get-started/guide/
// - SPA en Workers: https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/
// - Vue en Pages: https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/
// - Direct Upload en Pages: https://developers.cloudflare.com/pages/get-started/direct-upload/

export const checklistPrevio = [
  {
    id: 'dev',
    texto: 'Tu proyecto corre con npm run dev.',
    ayuda: 'Si no corre en tu computadora, tampoco va a correr en internet.',
  },
  {
    id: 'build',
    texto: 'npm run build termina sin errores y crea la carpeta dist/.',
    ayuda: 'Es exactamente lo que va a hacer la plataforma. Pruébalo antes y te ahorras sorpresas.',
  },
  {
    id: 'github',
    texto: 'Tu código está en un repositorio de GitHub (sin la carpeta node_modules ni dist).',
    ayuda: 'El .gitignore que crea Vite ya las excluye.',
  },
  {
    id: 'vite-env',
    texto: 'Tus variables de entorno públicas empiezan con VITE_.',
    ayuda: 'Vite solo pasa al navegador las variables con ese prefijo.',
  },
  {
    id: 'secretos',
    texto: 'No hay llaves secretas en tu frontend.',
    ayuda:
      'Todo lo que está en el frontend lo puede ver cualquiera con las herramientas del navegador.',
  },
]

// Archivo de configuración que necesita Workers. Se usa en ambos caminos.
export const wranglerConfig = `{
  // Nombre del Worker: también será parte de tu URL (nombre.tu-subdominio.workers.dev).
  // Solo letras, números y guiones.
  "name": "mi-proyecto-hackathon",
  // Fecha de compatibilidad: pon la fecha de hoy.
  "compatibility_date": "2026-11-25",
  "assets": {
    // La carpeta que genera npm run build.
    "directory": "./dist/",
    // Si la ruta no es un archivo, responde con index.html (evita el 404 al recargar).
    "not_found_handling": "single-page-application"
  }
}`

export const workersDashboard = [
  {
    titulo: 'Agrega wrangler.jsonc a la raíz de tu proyecto',
    descripcion:
      'Es el archivo que le dice a Cloudflare qué subir y cómo servirlo. Va junto a tu package.json.',
    codigo: { codigo: wranglerConfig, lenguaje: 'jsonc', titulo: 'wrangler.jsonc' },
  },
  {
    titulo: 'Fija tu versión de Node (recomendado)',
    descripcion:
      'Crea un archivo .nvmrc con la versión mayor de Node que usas. Así Cloudflare compila con la misma versión que tú.',
    codigo: { codigo: '24', lenguaje: 'text', titulo: '.nvmrc' },
  },
  {
    titulo: 'Sube los cambios a GitHub',
    codigo: {
      codigo: `git add wrangler.jsonc .nvmrc
git commit -m "Configura el despliegue en Cloudflare"
git push`,
      lenguaje: 'bash',
      titulo: 'terminal',
    },
    resultado: 'En GitHub ya aparecen wrangler.jsonc y .nvmrc en la rama main.',
  },
  {
    titulo: 'Crea tu cuenta de Cloudflare',
    descripcion:
      'Entra a dash.cloudflare.com/sign-up/workers-and-pages. Basta con correo y contraseña; después confirmas tu correo.',
    captura: 'pantalla de registro de Cloudflare',
  },
  {
    titulo: 'Crea la aplicación desde tu repo',
    descripcion:
      'En el dashboard ve a Workers & Pages → Create application → GitHub. Si te lo pide, autoriza a Cloudflare en GitHub y elige tu repositorio.',
    captura: 'botón Create application y la opción GitHub',
  },
  {
    titulo: 'Configura el proyecto',
    descripcion:
      'El nombre del proyecto debe ser igual al "name" de tu wrangler.jsonc. Si no coinciden, el build falla.',
    valores: [
      { campo: 'Project name', valor: 'mi-proyecto-hackathon' },
      { campo: 'Build command', valor: 'npm run build' },
      { campo: 'Deploy command', valor: 'npx wrangler deploy' },
      { campo: 'Root directory', valor: '(vacío)' },
    ],
    captura: 'formulario de configuración con los valores llenos',
  },
  {
    titulo: 'Da clic en Save and Deploy y espera',
    descripcion:
      'Cloudflare clona tu repo, instala dependencias, corre npm run build y sube dist/. Puedes ver el log en la pestaña Deployments → View build history.',
    resultado:
      'Un build en verde y tu sitio en https://mi-proyecto-hackathon.<tu-subdominio>.workers.dev.',
    captura: 'build exitoso con la URL de workers.dev',
  },
  {
    titulo: 'Haz la prueba de fuego: recarga una ruta',
    descripcion:
      'Abre tu sitio, navega a una ruta como /frontend y presiona F5. Si configuraste not_found_handling, carga normal.',
    resultado: 'La página carga, sin error 404.',
  },
  {
    titulo: 'Desde ahora, cada push publica solo',
    descripcion:
      'Cada push a main genera un deploy nuevo. Los push a otras ramas generan una preview: la encuentras en la sección Previews de tu Worker.',
    resultado: 'Cambias un texto, haces push y en un par de minutos lo ves en tu URL.',
  },
]

export const workersCli = [
  {
    titulo: 'Agrega wrangler.jsonc a la raíz de tu proyecto',
    descripcion: 'El mismo archivo del otro camino.',
    codigo: { codigo: wranglerConfig, lenguaje: 'jsonc', titulo: 'wrangler.jsonc' },
  },
  {
    titulo: 'Instala Wrangler en tu proyecto',
    descripcion:
      'Wrangler es la herramienta de terminal de Cloudflare. Instalarla como dependencia de desarrollo fija la versión para todo tu equipo.',
    codigo: { codigo: 'npm install -D wrangler', lenguaje: 'bash', titulo: 'terminal' },
  },
  {
    titulo: 'Inicia sesión',
    descripcion: 'Se abre tu navegador para que autorices a Wrangler con tu cuenta de Cloudflare.',
    codigo: { codigo: 'npx wrangler login', lenguaje: 'bash', titulo: 'terminal' },
    resultado: 'La terminal confirma que iniciaste sesión.',
  },
  {
    titulo: 'Compila y despliega',
    descripcion:
      'wrangler deploy no compila tu proyecto, así que primero corre el build. Si es tu primera vez y no tienes subdominio, Wrangler te pide crear uno.',
    codigo: {
      codigo: `npm run build
npx wrangler deploy`,
      lenguaje: 'bash',
      titulo: 'terminal',
    },
    resultado: 'Wrangler imprime tu URL: https://mi-proyecto-hackathon.<tu-subdominio>.workers.dev',
  },
  {
    titulo: 'Atajo: un solo comando',
    descripcion: 'Agrega un script a tu package.json y despliega con npm run deploy.',
    codigo: {
      codigo: `"scripts": {
  "deploy": "npm run build && wrangler deploy"
}`,
      lenguaje: 'json',
      titulo: 'package.json',
    },
  },
]

export const pagesDashboard = [
  {
    titulo: 'Sube tu proyecto a GitHub',
    descripcion:
      'Para Pages no necesitas ningún archivo extra. Solo te recomendamos el .nvmrc, porque Pages usa Node 22 por defecto y no lee "engines" de package.json.',
    codigo: { codigo: '24', lenguaje: 'text', titulo: '.nvmrc' },
  },
  {
    titulo: 'Crea el proyecto de Pages',
    descripcion:
      'En el dashboard: Workers & Pages → Create application → pestaña Pages → Import an existing Git repository → Begin setup. Elige tu repo.',
    captura: 'pestaña Pages con la opción Import an existing Git repository',
  },
  {
    titulo: 'Configura el build',
    descripcion: 'En "Set up builds and deployments" llena estos valores:',
    valores: [
      { campo: 'Production branch', valor: 'main' },
      { campo: 'Build command', valor: 'npm run build' },
      { campo: 'Build output directory', valor: 'dist' },
    ],
    captura: 'formulario Set up builds and deployments',
  },
  {
    titulo: 'Save and Deploy',
    resultado: 'Tu sitio en https://<proyecto>.pages.dev.',
  },
  {
    titulo: 'No necesitas configurar el fallback de SPA',
    descripcion:
      'Si tu dist/ no tiene un 404.html en la raíz, Pages entiende que es una SPA y responde con index.html. Recarga /frontend para comprobarlo.',
    resultado:
      'Cada push a main publica; cada rama tiene su preview en <rama>.<proyecto>.pages.dev.',
  },
]

export const pagesCli = [
  {
    titulo: 'Crea el proyecto (solo la primera vez)',
    descripcion: 'Te pregunta el nombre del proyecto y la rama de producción.',
    codigo: { codigo: 'npx wrangler pages project create', lenguaje: 'bash', titulo: 'terminal' },
  },
  {
    titulo: 'Compila y sube la carpeta dist/',
    codigo: {
      codigo: `npm run build
npx wrangler pages deploy dist`,
      lenguaje: 'bash',
      titulo: 'terminal',
    },
    resultado: 'Wrangler imprime la URL de tu deploy en pages.dev.',
  },
]

// Pestañas de la guía de Cloudflare.
export const caminosCloudflare = [
  {
    id: 'workers-dashboard',
    producto: 'Workers',
    titulo: 'Workers · desde GitHub',
    resumen:
      'Conectas tu repo una vez y cada push despliega solo. Es el camino que te recomendamos.',
    pasos: workersDashboard,
  },
  {
    id: 'workers-cli',
    producto: 'Workers',
    titulo: 'Workers · desde la terminal',
    resumen: 'Despliegas con un comando desde tu computadora. Útil si aún no tienes repo.',
    pasos: workersCli,
  },
  {
    id: 'pages-dashboard',
    producto: 'Pages',
    titulo: 'Pages · desde GitHub',
    resumen: 'El camino más corto: sin archivos extra y con fallback de SPA automático.',
    pasos: pagesDashboard,
  },
  {
    id: 'pages-cli',
    producto: 'Pages',
    titulo: 'Pages · desde la terminal',
    resumen:
      'Subes la carpeta dist/ directo. Ojo: un proyecto creado así no se puede conectar a Git después.',
    pasos: pagesCli,
  },
]
