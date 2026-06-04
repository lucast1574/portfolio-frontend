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
