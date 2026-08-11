# Ai Solutions

Enterprise AI Solutions & Business Automation

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- React Three Fiber / Three.js
- shadcn/ui primitives
- React Hook Form + Zod

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t ai-solutions .
docker run -p 3000:3000 ai-solutions
```

Or with compose:

```bash
docker compose up -d
```

## Deployment (Coolify)

1. Add a new service in Coolify with the `Dockerfile` build pack.
2. Set the port to `3000`.
3. The healthcheck endpoint is at `/api/health`.
4. No additional environment variables are required for production.
5. Deploy.

## Production Environment Variables

| Variable | Required | Default |
|---|---|---|
| `NODE_ENV` | No | `production` |
| `PORT` | No | `3000` |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/health/   # Healthcheck endpoint
│   ├── case-studies/[slug]/   # Full case study pages
│   ├── privacy-policy/        # Privacy policy
│   ├── terms/                 # Terms of service
│   ├── layout.tsx    # Root layout (with JSON-LD Organization schema)
│   ├── page.tsx      # Home page
│   ├── opengraph-image.tsx    # 1200x630 OG card (edge runtime)
│   ├── loading.tsx   # Loading screen
│   ├── not-found.tsx # 404 page
│   ├── robots.ts     # robots.txt
│   └── sitemap.ts    # sitemap.xml
├── components/
│   ├── motion/       # Reusable animation primitives
│   ├── ui/           # Base UI components
│   ├── layout/       # Nav, Footer, Command Palette
│   ├── sections/     # Page sections
│   └── three/        # Three.js scenes
├── hooks/            # Custom hooks
├── lib/              # Utilities, constants, metadata
└── types/            # TypeScript types
```

## Routes

| Path | Description |
|---|---|
| `/` | Home (14 section components) |
| `/case-studies/automated-underwriting-engine` | Insurance case study |
| `/case-studies/supply-chain-forecasting` | Manufacturing case study |
| `/case-studies/intelligent-document-processing` | Financial services case study |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |
| `/api/health` | Healthcheck (returns `{status, commitSha}`) |
| `/opengraph-image.png` | Generated OG card (1200x630) |

## License

All rights reserved. &copy; Ai Solutions