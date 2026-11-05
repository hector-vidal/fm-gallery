# fm-gallery

Galería de las soluciones de los retos de Frontend Mentor. Cada reto vive en su propio repositorio `fm-<reto>`; esta galería los reúne con filtros por dificultad y por tecnología y se publica en GitHub Pages, en `https://hector-vidal.github.io/fm-gallery/`.

## Requisitos

- Node 24.22.0, la versión de `.nvmrc`.
- pnpm 11.13.1, el de `packageManager` en `package.json` (Corepack lo instala solo).

## Arranque

```bash
pnpm install   # dependencias y ganchos de git
pnpm run dev   # servidor local en http://localhost:4321/fm-gallery/
```

La galería lee los retos de la API de GitHub al compilarse. Sin token, la API admite 60 peticiones por hora, una por reto y compilación; con muchos retos, pásale el tuyo:

```bash
GITHUB_TOKEN=$(gh auth token) pnpm run dev
```

Cómo se trabaja y dónde está cada documento: [CONTRIBUTING.md](CONTRIBUTING.md). Los pendientes están en [TO-DO.md](TO-DO.md).
