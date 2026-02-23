Deployment steps — Backend (Render) + Frontend (GitHub Pages)

Quick summary

- Backend: deploy to Render (with managed PostgreSQL). The repo already contains `render.yaml` + `backend/Dockerfile` to help Render auto-provision the service and DB.
- Frontend: the GH Actions workflow reads `RENDER_BACKEND_URL` secret and sets `VITE_API_URL` at build time.

Steps (create Render service)

1. Go to https://dashboard.render.com and create a new Web Service.
   - Connect your GitHub repository and choose `main` branch.
   - Render will detect `render.yaml` and can create the `jania-backend` service and `jania-db` Postgres database.
   - If Render asks, confirm the settings (region, plan). The manifest uses `free`/`starter`.

2. After the service is created, open the service details and copy the public URL of the backend.
   - The backend public API base should look like: `https://<your-service>.onrender.com`.
   - The API endpoints are rooted at `/api` (e.g. `https://<your-service>.onrender.com/api/blog/posts`).

3. In the Render dashboard add any production environment variables you need (SMTP, JWT_SECRET, etc.).
   - Required: `JWT_SECRET` (set to a secure random string).
   - Optionally set `SMTP_*` if you plan to use email features.
   - `FRONTEND_URL` is already set in `render.yaml` but you can change it if needed.

4. Run database migrations and seed (once service is live):
   - You can run `npx prisma migrate deploy` against the production `DATABASE_URL` (Render's shell or locally with the `DATABASE_URL` env var set).
   - Or use the Render shell (Instance → Shell) to run `npx prisma migrate deploy && npm run prisma:generate && npm run seed`.

Steps (update frontend)

1. In your GitHub repository settings -> Secrets, add a secret named `RENDER_BACKEND_URL` with value `https://<your-service>.onrender.com/api`.
2. Push to `main` (or re-run the workflow) — GitHub Actions will build the frontend with `VITE_API_URL` set to the secret and publish the site to GitHub Pages.

Notes & recommendations

- Use the managed Postgres (recommended) instead of SQLite for production — `render.yaml` configures a Postgres `jania-db`.
- Keep a secure `JWT_SECRET` in Render's environment variables.
- If you want me to finish the steps that require your Render/GitHub access (create service, set secrets), I can provide exact commands and the values to paste.
