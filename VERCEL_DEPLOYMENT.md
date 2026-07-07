# SafeLab Frontend - Vercel Deployment

This version is prepared to be deployed as a Vercel Vite static frontend connected to the SafeLab backend deployed on Render.

## Recommended Vercel settings

- Framework Preset: Vite
- Root Directory: leave empty if `package.json` is in the repository root
- Install Command: `npm install --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: `dist`

The repository also includes `vercel.json`, `.npmrc`, `.node-version`, and `.nvmrc` so Vercel can infer the same configuration.

## Environment variables

Add these variables in Vercel Project Settings > Environment Variables:

```env
VITE_API_BASE_URL=https://safelab-platform-api.onrender.com/api/v1
VITE_APP_NAME=SafeLab
VITE_DEFAULT_LOCALE=es
VITE_USE_REMOTE_API=true
```

## Backend CORS

After Vercel gives you the final frontend URL, add it to the backend environment variable on Render:

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://YOUR-FRONTEND.vercel.app
```

Then redeploy the backend manually in Render so the new CORS value is applied.

## SPA routes

`vercel.json` rewrites all frontend routes to `index.html`, so direct refreshes such as `/sensor-monitoring/live-readings` or `/dashboard-overview/laboratory-dashboard` work correctly.
