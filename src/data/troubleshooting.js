// Problemas comunes al desplegar un frontend de Vite y cómo resolverlos.

export const problemas = [
  {
    id: 'node',
    titulo: 'La versión de Node no coincide',
    sintoma:
      'En tu computadora el build funciona, pero en la plataforma falla con errores raros de sintaxis o de dependencias.',
    solucion:
      'Fija tu versión con un archivo .nvmrc (por ejemplo, 24). Cloudflare Workers usa Node 24 por defecto, pero Cloudflare Pages usa Node 22 y no lee "engines" de package.json.',
  },
  {
    id: 'carpeta',
    titulo: 'La carpeta de salida es incorrecta',
    sintoma: 'El deploy "funciona", pero ves una página en blanco, un 404 o la lista de archivos.',
    solucion:
      'En Vite, la carpeta es dist (no build ni public). Revisa el campo de carpeta de salida en la plataforma o en tu archivo de configuración.',
  },
  {
    id: 'mayusculas',
    titulo: 'Mayúsculas y minúsculas en los imports',
    sintoma:
      'En Windows o macOS todo funciona, pero en la plataforma el build falla con "Could not resolve ./components/Navbar.vue".',
    solucion:
      'Los servidores de build usan Linux, que distingue mayúsculas de minúsculas: NavBar.vue y Navbar.vue son archivos distintos. Escribe el import exactamente igual que el nombre del archivo.',
  },
  {
    id: 'imagenes',
    titulo: 'Las imágenes no cargan',
    sintoma: 'En local se ven, pero en el sitio publicado aparecen rotas.',
    solucion:
      'Las imágenes en src/assets se importan desde el código (import logo from "@/assets/logo.png") y Vite les cambia el nombre. Las que están en public/ se usan con ruta absoluta (/logo.png). Si tu sitio vive en una subcarpeta (GitHub Pages), usa import.meta.env.BASE_URL al construir la ruta.',
  },
  {
    id: 'base',
    titulo: 'Página en blanco en GitHub Pages',
    sintoma: 'La consola del navegador muestra 404 para los archivos .js y .css.',
    solucion:
      'Tu sitio vive en usuario.github.io/repo/, pero Vite generó rutas para /. Define base: "/repo/" en vite.config.js.',
  },
  {
    id: 'env',
    titulo: 'Mi variable de entorno sale undefined',
    sintoma: 'import.meta.env.VITE_API_URL funciona en local, pero en producción es undefined.',
    solucion:
      'Las variables VITE_* se escriben dentro del código al momento del build. Configúralas en la plataforma (en la sección de variables del build) y vuelve a desplegar. Revisa también que empiecen con VITE_.',
  },
  {
    id: 'lint',
    titulo: 'El build falla por ESLint',
    sintoma: 'El log del build termina con errores de lint, no de Vite.',
    solucion:
      'En un proyecto de Vite, npm run build no corre ESLint. Si tu script "build" incluye lint (por ejemplo "npm run lint && vite build"), corrige los errores o sepáralos. Corre npm run lint antes de hacer push.',
  },
  {
    id: 'lock',
    titulo: 'Falla al instalar dependencias',
    sintoma: 'npm ci falla porque package.json y package-lock.json no coinciden.',
    solucion:
      'Corre npm install en tu computadora, haz commit del package-lock.json actualizado y vuelve a hacer push.',
  },
  {
    id: 'nombre-worker',
    titulo: 'Cloudflare Workers: el build falla por el nombre',
    sintoma: 'El build se queja de que el nombre del Worker no coincide.',
    solucion:
      'El nombre del proyecto en el dashboard debe ser igual al "name" de tu wrangler.jsonc. Cambia uno de los dos para que coincidan.',
  },
]
