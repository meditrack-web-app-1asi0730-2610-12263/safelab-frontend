# SafeLab Frontend deployment on Vercel

This version is prepared to avoid the npm install crash reported in Vercel by using **pnpm** through Corepack.

## Vercel project settings

- Framework Preset: `Vite`
- Root Directory: leave empty if `package.json` is in the repository root
- Install Command: `corepack enable && pnpm install --no-frozen-lockfile`
- Build Command: `pnpm run build`
- Output Directory: `dist`

## Environment variables

```env
VITE_API_BASE_URL=https://safelab-platform-api.onrender.com/api/v1
VITE_APP_NAME=SafeLab
VITE_DEFAULT_LOCALE=es
VITE_USE_REMOTE_API=true
```

Do not add PostgreSQL credentials in the frontend. The frontend only consumes the backend API.

## Backend CORS

After Vercel gives you the frontend URL, add it in Render backend environment variable:

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.vercel.app
```

Then redeploy the backend manually.
