# Ciclo de trabajo

## Ramas

El trabajo ocurre en `dev`, y `main` recibe solo fusiones por *pull request* desde `dev`. Su regla de protección exigirá los checks `static` y `tests` (pendiente en [TO-DO](TO-DO.md)). Sin vistas previas por *pull request*: se prueba en local. Las operaciones de git las hace el usuario, nunca un agente.

## Mensajes de *commit*

Conventional Commits validados por commitlint en el gancho `commit-msg`. El tipo va en inglés y el resto en español. Cuando un cambio cumple un requisito, el mensaje cita su identificador.

```text
feat(galeria): filtra los retos por tecnología (RF-03)
fix(rutas): resuelve el enlace de la ficha contra la ruta base
docs(contributing): aclara el ciclo de un pull request
```

## Antes de cerrar un cambio

```sh
pnpm run lint
pnpm run typecheck
pnpm run lint:md
pnpm run test
pnpm run build
```

Es lo mismo que corre la integración continua. El gancho `pre-commit` repite las cuatro primeras, junto con el rastreo de secretos.

## Qué comando usar

| Situación | Comando |
| --- | --- |
| Instalar o actualizar el entorno | `pnpm install` |
| Servidor local en `http://localhost:4321/fm-gallery/` | `pnpm run dev` |
| Ver el sitio compilado | `pnpm run build` y `pnpm run preview` |
| Añadir una dependencia | `pnpm add -E <paquete>@<versión>`, con versión exacta |
| Corregir el Markdown | `pnpm run lint:md:fix` |
| Una prueba concreta | `pnpm exec vitest run -t <nombre>` |

## Pendientes

Todo lo que falta por hacer en el repositorio vive en [TO-DO.md](TO-DO.md); una tarea completada se elimina, no se marca.
