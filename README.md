# IchaWorks

Portfolio site for IchaWorks (GitHub: [brutaliccus](https://github.com/brutaliccus)).
React + Vite + TypeScript, plain CSS (no runtime CSS framework), self-hosted fonts.

## Edit content
- **All project data:** `src/data/projects.ts` (carousel slides, live sites, GitHub repo cards).
- **Buy Me a Coffee link + brand constants:** `src/config.ts` → replace the `BMC_URL` placeholder.
- **Screenshots:** `public/shots/*.jpg`. Refresh with `node scripts/capture-sites.mjs`
  (uses `playwright-core` + system Chrome; set `CHROME=/path/to/chrome` if needed).
- **Repo descriptions:** `node scripts/fetch-repos.mjs` prints the current GitHub descriptions.

## Develop
```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/ on http://localhost:4173
node scripts/shoot-preview.mjs   # desktop + mobile screenshots into shots/
```

## Deploy (static site — any host works)
The build output in `dist/` is fully static.

- **Cloudflare Pages:** `npx wrangler pages deploy dist --project-name ichaworks`
  (or connect the Git repo: build command `npm run build`, output dir `dist`).
- **Netlify:** `npx netlify deploy --prod --dir dist` (build `npm run build`, publish `dist`).
- **Vercel:** `npx vercel --prod` (framework preset: Vite).
- **GitHub Pages:** push `dist/` with an action such as `actions/deploy-pages`; if served from
  `/<repo>/`, set `base: '/<repo>/'` in `vite.config.ts`.
- **Own server (nginx/Caddy):** copy `dist/` to the web root; it's a single page, no rewrites needed.
