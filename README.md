# Portfolio Frontend

Next.js 14 (App Router) + Tailwind + Framer Motion. Estética espacial.

- Auto-detecta locale del browser (es / en)
- Login oculto via **Konami code** (↑↑↓↓←→←→BA) → `/login`
- Admin panel en `/admin`

## Variables
- `NEXT_PUBLIC_API_URL` → URL del backend GraphQL (ej. `https://api.santillan.pro/graphql`)

## Local
```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql npm run dev
```

## SEO, idiomas y canal

La portada `/` es la versión estable en español; `/en` ofrece el mismo portafolio
en inglés. Las dos incluyen canonical, hreflang recíproco, sitemap, tarjeta social
y JSON-LD de Person, ProfilePage, WebSite e ItemList, usando el orden real de la API.
El nombre público es Lucas Santillan; no se fabrican métricas, credenciales ni reseñas.
La etiqueta pública de Search Console se conserva en el layout. Administración y
login mantienen `noindex` y quedan fuera del sitemap.

`CreatorChannel` muestra el canal aprobado `@lucast5740`, también enlazado desde
redes y datos estructurados. La sección no carga reproductores de terceros.
`portfolio-motion.css` define trayectorias orbitales y un control para pausar;
el contenido principal permanece visible sin JavaScript y el modo de movimiento
reducido desactiva las animaciones decorativas. Siempre SVG, nunca emojis.
