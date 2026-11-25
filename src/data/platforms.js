// Ficha estándar por plataforma.
//
// Todos los datos salen de la documentación oficial consultada en la fecha de
// `verificado_el`. Si algo no se pudo confirmar, aparece como [VERIFICAR: ...].
// Los planes gratuitos cambian seguido: antes de tu demo, vuelve a revisar `docs_url`.
//
// Nota sobre la forma: `plan_gratuito` es una lista (no un texto largo) para que la
// tarjeta la pinte como viñetas. `backend` solo existe en las plataformas de backend
// y alimenta la tabla comparativa.

const VERIFICADO = '2026-11-25'

export const platforms = [
  {
    id: 'cloudflare-workers',
    nombre: 'Cloudflare Workers',
    tipo: ['frontend', 'backend'],
    recomendada: true,
    ideal_para:
      'Tu frontend hoy y, si después lo necesitas, una API pequeña en el mismo lugar. Es lo que Cloudflare recomienda para proyectos nuevos.',
    plan_gratuito: [
      'Las solicitudes a archivos estáticos (tu carpeta dist/) son gratis e ilimitadas.',
      '100,000 solicitudes al día para el código del Worker (tu API). Se reinicia a medianoche UTC.',
      'Hasta 20,000 archivos por versión y 25 MiB por archivo.',
      'Builds automáticos desde GitHub: 3,000 minutos al mes, 1 build a la vez, máximo 20 minutos por build.',
    ],
    pide_tarjeta: '[VERIFICAR: la documentación de precios no lo dice]',
    build_command: 'npm run build',
    output_dir: 'dist',
    deploy_command: 'npx wrangler deploy',
    spa_fallback:
      'En wrangler.jsonc pon "not_found_handling": "single-page-application" dentro de "assets". Si la ruta no es un archivo, Cloudflare responde con tu index.html y estado 200.',
    spa_archivo: {
      nombre: 'wrangler.jsonc',
      lenguaje: 'jsonc',
      codigo: `{
  "name": "mi-proyecto",
  "compatibility_date": "2026-11-25",
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application"
  }
}`,
    },
    node: 'Por defecto usa Node 24.22.1. Para fijar otra versión, agrega un archivo .nvmrc o la variable NODE_VERSION.',
    variables_entorno:
      'Dashboard → tu Worker → Settings → Build → Build Variables and Secrets. Las variables VITE_* tienen que estar ahí porque se leen al momento del build.',
    pasos: [], // La guía completa vive en src/data/frontendSteps.js
    ventajas: [
      'Archivos estáticos ilimitados: tu demo no se cae aunque todo el salón la abra al mismo tiempo.',
      'Deploy automático en cada push y una URL de preview por cada rama.',
      'Puedes agregar una API después sin cambiar de plataforma.',
    ],
    cuidado_con: [
      'El nombre del Worker en el dashboard debe ser igual al "name" de wrangler.jsonc, o el build falla.',
      'wrangler deploy no compila tu proyecto: corre primero npm run build (o configura el build command).',
      'El código del Worker tiene 10 ms de CPU por solicitud en el plan gratuito. Sobra para una API sencilla, pero no para procesos pesados.',
    ],
    docs_url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/',
    ejemplo_url:
      'https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/templates/vue',
    fuentes: [
      {
        texto: 'Guía de Vue en Workers',
        url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/',
      },
      {
        texto: 'Single Page Application en Workers',
        url: 'https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/',
      },
      { texto: 'Precios', url: 'https://developers.cloudflare.com/workers/platform/pricing/' },
      { texto: 'Límites', url: 'https://developers.cloudflare.com/workers/platform/limits/' },
      {
        texto: 'Límites de Workers Builds',
        url: 'https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/',
      },
      {
        texto: 'Imagen de build (versión de Node)',
        url: 'https://developers.cloudflare.com/workers/ci-cd/builds/build-image/',
      },
    ],
    backend: {
      tipo_servicio: 'Serverless: tu código corre por solicitud, sin servidor encendido',
      duerme: 'No aplica: no hay un servidor que se apague',
      limites: '100,000 solicitudes al día y 10 ms de CPU por solicitud',
      base_datos: 'D1 (SQLite) de Cloudflare [VERIFICAR: límites gratuitos de D1]',
      dificultad: 'Media: no es Node.js completo, usa APIs web como fetch y Request',
    },
    verificado_el: VERIFICADO,
  },
  {
    id: 'cloudflare-pages',
    nombre: 'Cloudflare Pages',
    tipo: ['frontend'],
    recomendada: true,
    ideal_para:
      'Un sitio estático en dos clics desde el dashboard. Es el producto anterior de Cloudflare: sigue funcionando, pero las funciones nuevas llegan primero a Workers.',
    plan_gratuito: [
      '500 builds al mes, 1 a la vez, máximo 20 minutos por build.',
      'Hasta 20,000 archivos por sitio y 25 MiB por archivo.',
      'Hasta 100 dominios personalizados por proyecto y 100 proyectos por cuenta.',
    ],
    pide_tarjeta: '[VERIFICAR: la documentación no lo dice]',
    build_command: 'npm run build',
    output_dir: 'dist',
    deploy_command: 'npx wrangler pages deploy dist',
    spa_fallback:
      'Automático: si tu dist/ no tiene un 404.html en la raíz, Pages asume que es una SPA y responde con tu index.html. No tienes que configurar nada.',
    spa_archivo: null,
    node: 'La imagen de build v3 usa Node 22.23.4 por defecto. Para usar otra, agrega .nvmrc o la variable NODE_VERSION. Ojo: Pages no lee "engines" de package.json.',
    variables_entorno: 'Dashboard → tu proyecto de Pages → Settings → Environment variables.',
    pasos: [
      'En el dashboard: Workers & Pages → Create application → pestaña Pages → Import an existing Git repository.',
      'Elige tu repo y en "Set up builds and deployments" pon: rama main, build command npm run build, carpeta dist.',
      'Guarda y espera el build. Tu sitio queda en <proyecto>.pages.dev.',
    ],
    ventajas: [
      'El fallback de SPA es automático.',
      'Preview por cada rama: <rama>.<proyecto>.pages.dev.',
      'El flujo del dashboard es muy directo para principiantes.',
    ],
    cuidado_con: [
      'Cloudflare pone las funciones nuevas en Workers. Para un proyecto que va a crecer, conviene Workers.',
      'Si subes con "Direct Upload" (arrastrar la carpeta), después no puedes cambiarlo a Git.',
      'Si agregas un 404.html en la raíz de dist/, el fallback de SPA se apaga.',
    ],
    docs_url: 'https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/',
    ejemplo_url:
      'https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/templates/vue',
    fuentes: [
      {
        texto: 'Guía de Vue en Pages',
        url: 'https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/',
      },
      {
        texto: 'Cómo sirve Pages tus archivos (SPA)',
        url: 'https://developers.cloudflare.com/pages/configuration/serving-pages/',
      },
      { texto: 'Límites', url: 'https://developers.cloudflare.com/pages/platform/limits/' },
      {
        texto: 'Imagen de build',
        url: 'https://developers.cloudflare.com/pages/configuration/build-image/',
      },
      {
        texto: 'Migrar de Pages a Workers',
        url: 'https://developers.cloudflare.com/workers/static-assets/compatibility-matrix/',
      },
    ],
    verificado_el: VERIFICADO,
  },
  {
    id: 'vercel',
    nombre: 'Vercel',
    tipo: ['frontend'],
    recomendada: false,
    ideal_para: 'Importar tu repo y que todo se detecte solo. Muy popular en hackathons.',
    plan_gratuito: [
      'Plan Hobby: 100 GB de transferencia y 1,000,000 de solicitudes al mes.',
      '100 deploys al día, máximo 45 minutos por build, 1 build a la vez.',
      'Si te pasas de un límite, tienes que esperar 30 días para volver a usar esa función.',
    ],
    pide_tarjeta: '[VERIFICAR: la página del plan Hobby no lo dice]',
    build_command: 'npm run build (Vercel detecta Vite solo)',
    output_dir: 'dist',
    deploy_command: 'npx vercel',
    spa_fallback: 'Agrega un vercel.json en la raíz del repo con un rewrite hacia /index.html.',
    spa_archivo: {
      nombre: 'vercel.json',
      lenguaje: 'json',
      codigo: `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`,
    },
    node: '[VERIFICAR: versión de Node por defecto y cómo cambiarla en Vercel]',
    variables_entorno:
      'Project → Settings → Environment Variables. Los cambios solo aplican a deploys nuevos: vuelve a desplegar.',
    pasos: [
      'Entra a vercel.com, inicia sesión con GitHub y elige "Add New… → Project".',
      'Importa tu repo. Vercel detecta Vite y llena el build command y la carpeta dist.',
      'Da clic en Deploy. Tu sitio queda en <proyecto>.vercel.app.',
    ],
    ventajas: ['Detecta Vite sin configurar nada.', 'Preview automático en cada pull request.'],
    cuidado_con: [
      'Necesitas vercel.json para que recargar una ruta no dé 404.',
      'El plan Hobby es para uso personal. [VERIFICAR: restricción de uso no comercial en los términos actuales]',
      'Cambiar una variable de entorno no actualiza el deploy que ya está publicado.',
    ],
    docs_url: 'https://vercel.com/docs/frameworks/frontend/vite',
    ejemplo_url: 'https://vercel.com/docs/frameworks/frontend/vite',
    fuentes: [
      { texto: 'Vite en Vercel', url: 'https://vercel.com/docs/frameworks/frontend/vite' },
      { texto: 'Plan Hobby', url: 'https://vercel.com/docs/plans/hobby' },
      { texto: 'Límites', url: 'https://vercel.com/docs/limits' },
      { texto: 'Variables de entorno', url: 'https://vercel.com/docs/environment-variables' },
    ],
    verificado_el: VERIFICADO,
  },
  {
    id: 'netlify',
    nombre: 'Netlify',
    tipo: ['frontend'],
    recomendada: false,
    ideal_para:
      'Sitios estáticos con previews ilimitados y una configuración por archivo muy clara.',
    plan_gratuito: [
      'Funciona con créditos: 300 al mes en el plan Free.',
      'Cada deploy a producción cuesta 15 créditos; cada GB de transferencia, 20 créditos; cada 10,000 solicitudes, 2 créditos.',
      'Deploy previews ilimitados.',
    ],
    pide_tarjeta: '[VERIFICAR: la página de precios no lo dice]',
    build_command: 'npm run build',
    output_dir: 'dist',
    deploy_command: 'npx netlify deploy --prod',
    spa_fallback:
      'Una regla de rewrite: todo lo que no sea un archivo responde con /index.html y estado 200. Va en netlify.toml o en public/_redirects.',
    spa_archivo: {
      nombre: 'netlify.toml',
      lenguaje: 'toml',
      codigo: `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
    },
    node: '[VERIFICAR: versión de Node por defecto en Netlify]',
    variables_entorno:
      'Site configuration → Environment variables (o con el CLI). Las que pongas en netlify.toml ganan sobre las del dashboard.',
    pasos: [
      'Entra a app.netlify.com e inicia sesión con GitHub.',
      'Add new project → Import an existing project → elige tu repo.',
      'Revisa que diga npm run build y dist, y da clic en Deploy.',
    ],
    ventajas: [
      'La regla de SPA es una sola línea y es fácil de entender.',
      'Previews ilimitados para cada pull request.',
    ],
    cuidado_con: [
      'Con 300 créditos y 15 por deploy a producción, alcanzas unos 20 deploys al mes si no gastas en nada más. En la noche de la hackathon, no hagas push cada cinco minutos.',
      '[VERIFICAR: qué pasa con tu sitio cuando se acaban los créditos]',
    ],
    docs_url: 'https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/',
    ejemplo_url: 'https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/',
    fuentes: [
      {
        texto: 'Vite en Netlify',
        url: 'https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/',
      },
      {
        texto: 'Rewrites y proxies',
        url: 'https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/',
      },
      { texto: 'Precios', url: 'https://www.netlify.com/pricing/' },
      {
        texto: 'Variables de entorno',
        url: 'https://docs.netlify.com/build/environment-variables/overview/',
      },
    ],
    verificado_el: VERIFICADO,
  },
  {
    id: 'github-pages',
    nombre: 'GitHub Pages',
    tipo: ['frontend'],
    recomendada: false,
    ideal_para: 'Si ya todo vive en GitHub y no quieres crear otra cuenta.',
    plan_gratuito: [
      'Sitios de hasta 1 GB.',
      '100 GB de transferencia al mes (límite blando).',
      '10 builds por hora (no aplica si publicas con tu propio workflow de GitHub Actions).',
    ],
    pide_tarjeta: false,
    build_command: 'npm run build (dentro de un workflow de GitHub Actions)',
    output_dir: 'dist',
    deploy_command: 'Automático con el workflow de GitHub Actions',
    spa_fallback:
      'GitHub Pages no tiene fallback de SPA. El truco comunitario es copiar index.html como 404.html en el build. Funciona, pero la respuesta trae estado 404 [VERIFICAR].',
    spa_archivo: {
      nombre: 'paso extra en el workflow',
      lenguaje: 'yaml',
      codigo: `- run: npm run build
- run: cp dist/index.html dist/404.html`,
    },
    node: 'La eliges tú en el workflow con actions/setup-node.',
    variables_entorno:
      'Settings → Secrets and variables → Actions, y pásalas al paso de build en el workflow.',
    pasos: [
      'En vite.config.js define base: "/<nombre-del-repo>/".',
      'Agrega el workflow .github/workflows/ de la guía de Vite.',
      'En el repo: Settings → Pages → Source: GitHub Actions.',
      'Haz push a main. Tu sitio queda en <usuario>.github.io/<repo>/.',
    ],
    ventajas: ['No necesitas otra cuenta.', 'El workflow te enseña GitHub Actions de paso.'],
    cuidado_con: [
      'Si olvidas el "base" de Vite, la página sale en blanco porque no encuentra los archivos JS y CSS.',
      'No está permitido usarlo para un negocio en línea o un SaaS comercial.',
      '[VERIFICAR: si en el plan Free de GitHub se puede publicar desde un repo privado]',
    ],
    docs_url: 'https://vite.dev/guide/static-deploy#github-pages',
    ejemplo_url: 'https://github.com/actions/starter-workflows/blob/main/pages/static.yml',
    fuentes: [
      { texto: 'Vite: GitHub Pages', url: 'https://vite.dev/guide/static-deploy#github-pages' },
      {
        texto: 'Límites de GitHub Pages',
        url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits',
      },
      {
        texto: 'Página 404 personalizada',
        url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site',
      },
    ],
    verificado_el: VERIFICADO,
  },
  {
    id: 'firebase',
    nombre: 'Firebase Hosting',
    tipo: ['frontend'],
    recomendada: false,
    ideal_para: 'Si tu proyecto ya usa Firebase (Auth, Firestore) y quieres todo en un lugar.',
    plan_gratuito: [
      'Plan Spark: 10 GB de almacenamiento.',
      '360 MB de transferencia al día.',
      'No pide método de pago.',
    ],
    pide_tarjeta: false,
    build_command: 'npm run build',
    output_dir: 'dist',
    deploy_command: 'firebase deploy --only hosting',
    spa_fallback:
      'Al correr firebase init hosting, responde que sí es una "single-page app". Eso agrega un rewrite en firebase.json.',
    spa_archivo: {
      nombre: 'firebase.json',
      lenguaje: 'json',
      codigo: `{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}`,
    },
    node: 'Usas tu Node local, porque el build se hace en tu computadora antes de firebase deploy.',
    variables_entorno:
      'Como el build es local, las variables VITE_* salen de tu archivo .env al correr npm run build.',
    pasos: [
      'Instala el CLI: npm install -g firebase-tools, y luego firebase login.',
      'En tu proyecto: firebase init hosting. Carpeta pública: dist. ¿SPA?: sí.',
      'npm run build y después firebase deploy --only hosting.',
      'Tu sitio queda en <proyecto>.web.app.',
    ],
    ventajas: ['Se integra con el resto de Firebase.', 'No pide tarjeta en el plan Spark.'],
    cuidado_con: [
      'La carpeta pública por defecto es "public", no "dist". Cámbiala o subirás la carpeta equivocada.',
      '360 MB al día se acaban rápido si tu sitio tiene imágenes pesadas y lo abre todo el salón.',
      'Si vuelves a correr firebase init hosting, sobrescribe tu configuración de hosting.',
    ],
    docs_url: 'https://firebase.google.com/docs/hosting/quickstart',
    ejemplo_url: 'https://vite.dev/guide/static-deploy#google-firebase',
    fuentes: [
      {
        texto: 'Quickstart de Hosting',
        url: 'https://firebase.google.com/docs/hosting/quickstart',
      },
      {
        texto: 'Rewrites en firebase.json',
        url: 'https://firebase.google.com/docs/hosting/full-config#rewrites',
      },
      { texto: 'Precios', url: 'https://firebase.google.com/pricing' },
    ],
    verificado_el: VERIFICADO,
  },
  {
    id: 'render',
    nombre: 'Render',
    tipo: ['backend'],
    recomendada: false,
    ideal_para: 'Una API tradicional en Node/Express (o Python) sin aprender nada nuevo.',
    plan_gratuito: [
      '750 horas al mes de instancia gratis por workspace.',
      'El servicio se duerme tras 15 minutos sin tráfico y tarda alrededor de 1 minuto en despertar.',
      'Postgres gratis de 1 GB, uno por workspace, que caduca a los 30 días (con 14 días de gracia para pagar).',
    ],
    pide_tarjeta: '[VERIFICAR: la página del plan gratuito no lo dice]',
    build_command: 'npm install',
    output_dir: null,
    start_command: 'npm start',
    spa_fallback: null,
    pasos: [],
    ventajas: [
      'Corre un servidor de Node normal: tu código de Express funciona casi igual.',
      'Deploy automático desde GitHub.',
    ],
    cuidado_con: [
      'Se duerme: la primera persona del jurado puede esperar un minuto. Abre la API antes de presentar.',
      'La base de datos gratis se borra después del periodo de gracia. No la uses para algo que tenga que vivir más de un mes.',
      'Las instancias gratis no son para producción.',
    ],
    docs_url: 'https://render.com/docs/free',
    ejemplo_url: 'https://github.com/render-examples/express-hello-world',
    fuentes: [
      { texto: 'Plan gratuito', url: 'https://render.com/docs/free' },
      {
        texto: 'Desplegar Express',
        url: 'https://render.com/docs/deploy-node-express-app',
      },
    ],
    backend: {
      tipo_servicio: 'Servidor web (PaaS)',
      duerme: 'Sí, tras 15 min sin tráfico; tarda ~1 min en despertar',
      limites: '750 h al mes por workspace',
      base_datos: 'Postgres de 1 GB que caduca a los 30 días',
      dificultad: 'Baja',
    },
    verificado_el: VERIFICADO,
  },
  {
    id: 'railway',
    nombre: 'Railway',
    tipo: ['backend'],
    recomendada: false,
    ideal_para: 'Probar rápido un servidor y su base de datos con una interfaz muy visual.',
    plan_gratuito: [
      'Plan Free: $1 de uso al mes, sin tarjeta. No se acumula.',
      '1 proyecto, 3 servicios, 1 vCPU y 0.5 GB de RAM por servicio.',
      'Trial aparte: $5 de crédito por 30 días, una sola vez.',
    ],
    pide_tarjeta: false,
    build_command: 'Lo detecta solo',
    output_dir: null,
    start_command: 'npm start',
    spa_fallback: null,
    pasos: [],
    ventajas: [
      'Detecta tu proyecto y lo levanta con muy poca configuración.',
      'Puedes tener API y base de datos en el mismo proyecto.',
    ],
    cuidado_con: [
      'En el plan Free los servicios se duermen tras 5 a 10 minutos sin tráfico de salida; la primera solicitud puede responder 502.',
      '$1 al mes es muy poco: una base de datos encendida también consume de ese dólar. [VERIFICAR: cuánto dura una base de datos con $1]',
      'Sin verificar tu cuenta con GitHub, el trial puede tener la red de salida restringida.',
    ],
    docs_url: 'https://docs.railway.com/reference/pricing/free-trial',
    ejemplo_url: 'https://docs.railway.com/reference/pricing/free-trial',
    fuentes: [
      { texto: 'Precios', url: 'https://railway.com/pricing' },
      { texto: 'Free trial', url: 'https://docs.railway.com/reference/pricing/free-trial' },
      { texto: 'App sleeping', url: 'https://docs.railway.com/reference/app-sleeping' },
    ],
    backend: {
      tipo_servicio: 'Servidor web y bases de datos (PaaS)',
      duerme: 'Sí, tras 5–10 min sin tráfico de salida',
      limites: '$1 de uso al mes; 1 proyecto, 3 servicios',
      base_datos: 'Se agrega como otro servicio (consume del mismo $1)',
      dificultad: 'Baja',
    },
    verificado_el: VERIFICADO,
  },
  {
    id: 'supabase',
    nombre: 'Supabase',
    tipo: ['backend'],
    recomendada: true,
    ideal_para:
      'Si te quieres evitar algunas cosas: te da base de datos PostgreSQL, autenticación y una API lista, sin montar un servidor.',
    plan_gratuito: [
      '2 proyectos activos.',
      'Base de datos de 500 MB por proyecto y 1 GB de almacenamiento de archivos.',
      '50,000 usuarios activos al mes y 5 GB de transferencia.',
    ],
    pide_tarjeta: '[VERIFICAR: la página de precios no lo dice]',
    build_command: null,
    output_dir: null,
    spa_fallback: null,
    pasos: [],
    ventajas: [
      'PostgreSQL real con panel visual para crear tablas.',
      'Login con correo o GitHub sin escribir un backend.',
      'Se conecta directo desde tu frontend con la llave pública (anon), protegida con reglas RLS.',
    ],
    cuidado_con: [
      'Los proyectos gratis se pausan tras 1 semana sin actividad. Entra unos días antes de la demo para revisarlo.',
      'La llave "service_role" nunca va en el frontend. Solo la anon key, y con RLS activado.',
    ],
    docs_url: 'https://supabase.com/docs/guides/platform/billing-on-supabase',
    ejemplo_url: 'https://supabase.com/docs/guides/getting-started/quickstarts/vue',
    fuentes: [
      { texto: 'Precios', url: 'https://supabase.com/pricing' },
      {
        texto: 'Facturación y pausa de proyectos',
        url: 'https://supabase.com/docs/guides/platform/billing-on-supabase',
      },
    ],
    backend: {
      tipo_servicio: 'Backend como servicio (BaaS)',
      duerme: 'Se pausa tras 1 semana sin actividad',
      limites: '2 proyectos, 500 MB de base de datos, 50,000 usuarios al mes',
      base_datos: 'Sí, PostgreSQL',
      dificultad: 'Baja para empezar; RLS requiere práctica',
    },
    verificado_el: VERIFICADO,
  },
  {
    id: 'heroku',
    nombre: 'Heroku (con GitHub Student Developer Pack)',
    tipo: ['backend'],
    recomendada: false,
    ideal_para:
      'Estudiantes con el Student Pack que quieren un servidor y Postgres sin que se borren.',
    plan_gratuito: [
      'Heroku ya no tiene plan gratuito.',
      'Con el Student Pack: $13 de crédito al mes por 24 meses ($312 en total). No se acumula.',
      'Referencia de precios: dyno Eco $5/mes (se duerme a los 30 min), Basic $7/mes (siempre encendido), Postgres Essential-0 $5/mes.',
    ],
    pide_tarjeta: true,
    build_command: 'Lo detecta solo (buildpack de Node)',
    output_dir: null,
    start_command: 'npm start',
    spa_fallback: null,
    pasos: [],
    ventajas: [
      'Plataforma muy madura y con mucha documentación.',
      'El crédito alcanza para un dyno Basic y un Postgres pequeño.',
    ],
    cuidado_con: [
      'Pide tarjeta de crédito o débito para canjear la oferta. Lo que pase de $13 al mes se cobra a esa tarjeta.',
      'Tienes que ser mayor de 18 años para la oferta de Heroku.',
      'El crédito no cubre add-ons de terceros.',
    ],
    docs_url: 'https://www.heroku.com/github-students',
    ejemplo_url: 'https://devcenter.heroku.com/articles/getting-started-with-nodejs',
    fuentes: [
      { texto: 'Heroku para estudiantes', url: 'https://www.heroku.com/github-students' },
      {
        texto: 'Cómo funciona el programa',
        url: 'https://help.heroku.com/Z3RHNRHD',
      },
      { texto: 'Precios', url: 'https://www.heroku.com/pricing' },
      { texto: 'GitHub Student Developer Pack', url: 'https://education.github.com/pack' },
    ],
    backend: {
      tipo_servicio: 'Servidor web y bases de datos (PaaS)',
      duerme: 'Eco sí (30 min); Basic no',
      limites: '$13 de crédito al mes por 24 meses',
      base_datos: 'Heroku Postgres (de pago, cubierto por el crédito)',
      dificultad: 'Media: pide tarjeta y configuración de cuenta',
    },
    verificado_el: VERIFICADO,
  },
]

export const frontendPlatforms = platforms.filter((p) => p.tipo.includes('frontend'))
export const backendPlatforms = platforms.filter((p) => p.tipo.includes('backend'))

export function getPlatform(id) {
  return platforms.find((p) => p.id === id)
}
