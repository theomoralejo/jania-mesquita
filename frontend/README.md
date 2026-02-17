# Frontend (static site)

Deployment notes

- The frontend reads the backend base URL from `import.meta.env.VITE_API_URL` at build time.
- CI (GitHub Actions) uses the repository secret `RENDER_BACKEND_URL` to set `VITE_API_URL` during the build.

Setup for production build on GitHub Pages

1. In your repository settings -> Secrets, add a secret named `RENDER_BACKEND_URL` with the value of your deployed backend (example: `https://jania-backend.onrender.com/api`).
2. Push to `main` — GitHub Actions will build and publish the site (the workflow already uses `VITE_API_URL` from the secret).

If you change the backend URL later, update the secret and re-deploy (push to main).
