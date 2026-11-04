# TO-DO

Registro único de pendientes. Una tarea completada se elimina, no se marca.

## Heredado de la investigación FrontendMentor

La investigación se cerró el 2026-10-19 sin desplegar nada. Esta comprobación quedó abierta para hacerla al construir `fm-template`:

- Comprobar si un repositorio creado desde `fm-template` hereda el ajuste de GitHub Pages con origen "GitHub Actions". Si no lo hereda, activarlo por la API: `POST /repos/{owner}/{repo}/pages` con `build_type: workflow` (RF-10).

## Al construir `fm-template`

- Crear el *fine-grained token* del aviso (solo `fm-gallery`, `Contents: Read and write`, caducidad de un año) y guardarlo como secreto `GALLERY_DISPATCH_TOKEN` en el primer reto. Anotar la fecha de caducidad para renovarlo.

## Arranque de producción

- Comprobar que la integración continua falla ante una violación: un *commit* en `dev` que rompa el lint, ver el check en rojo y revertirlo.
- Activar el bot de Renovate: instalar su app en el repositorio, después de que `renovate.json` llegue a `main`.
