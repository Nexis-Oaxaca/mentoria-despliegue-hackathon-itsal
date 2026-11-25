# Guion de la demo en vivo (menos de 10 minutos)

**Objetivo:** que el grupo vea el ciclo completo: cambio → commit → push → deploy automático → URL pública.

**URL:** https://despliegue-hackathon.joanpagarf09.workers.dev

## Antes de la sesión (en casa)

- [ ] El Worker `despliegue-hackathon` está conectado al repo en **Settings → Builds** (si no, el push no despliega solo; ver README).
- [ ] Haz un push de prueba y confirma que el build sale en verde.
- [ ] Graba un video corto de toda la demo (plan B).
- [ ] Toma capturas de: el formulario de **Builds**, un build en progreso, un build en verde y el sitio con el cambio (plan B).
- [ ] Ten el repo clonado, `npm install` hecho y el editor abierto en `src/data/site.js`.
- [ ] Abre en pestañas: el sitio, el dashboard del Worker (pestaña **Deployments**) y el repo en GitHub.
- [ ] Activa el **Modo presentación** del sitio para el proyector.

## La demo

| Tiempo | Qué hago | Qué digo |
|---|---|---|
| 0:00 | Muestro el sitio en el proyector y recargo `/frontend`. | "Este sitio está en internet, gratis. Fíjense: recargo y no sale 404." |
| 1:00 | Abro `src/data/site.js` y cambio el `subtitulo` (por ejemplo: "Ya lo tienes listo. ¡Hola, ITSAL!"). | "Voy a cambiar un texto, como harían ustedes con su proyecto." |
| 2:00 | `npm run dev` y lo muestro en local (opcional). | "Primero lo pruebo en mi compu." |
| 3:00 | `git add -A && git commit -m "Saludo al ITSAL" && git push` | "Ahora lo subo a GitHub. No toco Cloudflare." |
| 3:30 | Cambio a la pestaña **Deployments → View build history** del Worker. | "Cloudflare vio el push y ya está compilando: clona, `npm install`, `npm run build`, sube `dist/`." |
| 5:00 | Cuando el build sale en verde, recargo el sitio. | "Y listo: el cambio ya está en internet. Eso es todo el ciclo." |
| 6:00 | Abro el sitio en el celular (QR o enlace por WhatsApp). | "Ábranlo ustedes también. Miren cómo se ve el enlace en WhatsApp." |
| 7:00 | Preguntas. | |

## Plan B (si falla el internet o el build)

1. **Sin internet:** pongo el video grabado. Después muestro `npm run build` y la carpeta `dist/` en local con `npm run preview`.
2. **El build falla:** abro el log del build y lo uso como ejemplo de la sección "Problemas comunes". Mientras, despliego desde la terminal con `npm run deploy`.
3. **El push no dispara el build:** el repo no está conectado. Despliego con `npm run deploy` y explico los dos caminos (dashboard contra terminal).

## Después de la demo

- [ ] Regresa el `subtitulo` a "Ya lo tienes listo. Ahora vamos a subirlo." (o déjalo como recuerdo).
