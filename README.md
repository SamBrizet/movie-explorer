# Movie Explorer

Movie Explorer es una aplicacion frontend de descubrimiento cinematografico creada con React y Vite. La experiencia visual combina referencias de Netflix y Apple TV para explorar tendencias, busquedas y favoritos sin backend.

## Descripcion

Incluye home con secciones de populares y trending, busqueda con infinite scroll, detalle de pelicula, favoritos persistentes, skeleton loading, dark mode y animaciones con Framer Motion.

## Tecnologias

- React 19
- Vite
- React Router DOM
- Axios
- Context API
- Custom Hooks
- Framer Motion
- React Icons

## Capturas

- Placeholder: home
- Placeholder: busqueda infinita
- Placeholder: detalle de pelicula

## Instalacion

```bash
npm install
cp .env.example .env
```

Completa `VITE_TMDB_API_KEY` para usar TMDB real. Si no existe la clave, la app usa un dataset mock para compilar y navegar sin romperse.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deploy

Preparado para Netlify.

1. Configura `VITE_TMDB_API_KEY` en el panel de variables de entorno.
2. Usa `npm run build` como build command.
3. Publica la carpeta `dist`.

## Licencia

Proyecto de portafolio para fines demostrativos.
