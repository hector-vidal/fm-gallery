# Cómo contribuir

Puerta de entrada al repositorio, y funciona como índice: lo que ya está escrito en otro documento no se repite aquí, se enlaza.

| Qué necesitas | Dónde está |
| --- | --- |
| Arrancar el proyecto | [README.md](README.md) |
| Ramas, mensajes de *commit* y qué comando usar | [WORKFLOW.md](WORKFLOW.md) |

## El ciclo, en corto

1. Sal de `dev`.
2. Escribe el cambio y su prueba.
3. La lista de "Antes de cerrar un cambio" de [WORKFLOW.md](WORKFLOW.md), en verde.
4. Anota el cambio en [CHANGELOG.md](CHANGELOG.md), bajo `[No publicado]`, si lo nota quien visita la galería.
5. Borra de [TO-DO.md](TO-DO.md) la tarea que acabas de completar. Se borra, no se tacha.
6. Abre el *pull request* de `dev` contra `main`.

Las operaciones de git las hace una persona. Un agente de IA no crea ramas, no hace *commit*, no fusiona y no etiqueta.

## Qué se espera de un *pull request*

Un cambio por *pull request*: si el título necesita un "y", probablemente son dos. La descripción dice **qué cambia y por qué**; el cómo ya está en el diff. Un cambio visible en la galería trae una captura antes y después.

## Cómo se anota un cambio en el registro

Cada cambio que note quien visita la galería añade una línea a `CHANGELOG.md`, bajo `[No publicado]` y bajo `Añadido`, `Cambiado`, `Corregido` o `Seguridad`, escrita desde su punto de vista:

```text
Bien: Los retos se pueden filtrar por tecnología.
Mal:  feat(galeria): add technology filter
```

Un cambio que nadie fuera del proyecto puede notar (un refactor interno, subir una dependencia) no lleva línea: el historial de git ya lo registra.
