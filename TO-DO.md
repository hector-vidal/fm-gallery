# TO-DO

Registro único de pendientes. Una tarea completada se elimina, no se marca.

## Heredado de la investigación FrontendMentor

La investigación se cerró el 2026-10-19 sin desplegar nada. Estas dos comprobaciones quedaron abiertas para hacerlas al construir `fm-template`:

- Comprobar si un repositorio creado desde `fm-template` hereda el ajuste de GitHub Pages con origen "GitHub Actions". Si no lo hereda, activarlo por la API: `POST /repos/{owner}/{repo}/pages` con `build_type: workflow` (RF-10).
- Comprobar vía Context7 la opción que fija la ruta base de cada variante (`/fm-<reto>/<variante>/`): `base` en Vite y Astro, `basePath` en Next.js con `output: 'export'` y `--base-href` en Angular.

## Al construir `fm-template`

- Fijar los nombres de las claves y los tipos de `challenge.json`, con la lista cerrada de dificultades y tecnologías.
- Fijar el tipo de token de `repository_dispatch` y su permiso mínimo.

## Arranque de producción

- Crear la rama `dev` y proteger `main` con los checks `static` y `tests`. Comprobar que la integración continua pasa en verde y que falla ante una violación.
- Añadir `renovate.json` y activar el bot cuando la integración continua esté en verde.

## Publicación

- Añadir el workflow de despliegue a GitHub Pages y activar Pages con origen "GitHub Actions" (RF-07).
