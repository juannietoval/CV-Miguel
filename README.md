# CV Miguel - Run and deploy to GitHub Pages

This project is a Vite + React app configured to be published on GitHub Pages at:

`https://<github-user>.github.io/CV-Miguel/`

## Run locally

**Prerequisite:** Node.js 20+

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Build production bundle:
   - `npm run build`
4. Type check:
   - `npm run lint`

## Deploy to GitHub Pages (automatic)

This repository includes a workflow at:

- `.github/workflows/deploy-pages.yml`

Deployment runs automatically on push to `main` and can also be launched manually from the Actions tab.

### Required repository setting (one-time)

In GitHub:

1. Open **Settings → Pages**
2. In **Build and deployment**, set **Source** to **GitHub Actions**

After a successful workflow run, the site will be available at:

`https://<github-user>.github.io/CV-Miguel/`
