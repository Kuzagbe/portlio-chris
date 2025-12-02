# Deployment Guide

## Netlify Deployment

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Node version:** `20`

3. **Add Environment Variables:**
   In Netlify dashboard → Site settings → Environment variables, add:
   - `VITE_SANITY_PROJECT_ID` = `dllxpw15`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_VERSION` = `2024-02-02`

4. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. **Set environment variables:**
   ```bash
   netlify env:set VITE_SANITY_PROJECT_ID dllxpw15
   netlify env:set VITE_SANITY_DATASET production
   netlify env:set VITE_SANITY_API_VERSION 2024-02-02
   ```

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (same as above)

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Add Environment Variables:**
   In Vercel dashboard → Settings → Environment Variables, add:
   - `VITE_SANITY_PROJECT_ID` = `dllxpw15`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_VERSION` = `2024-02-02`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables:**
   ```bash
   vercel env add VITE_SANITY_PROJECT_ID
   vercel env add VITE_SANITY_DATASET
   vercel env add VITE_SANITY_API_VERSION
   ```

## Important Notes

- **Environment Variables:** Make sure to add all `VITE_*` environment variables in your deployment platform
- **Build Output:** The build creates a `dist` folder with all static files
- **SPA Routing:** The `netlify.toml` includes a redirect rule for React Router to work correctly
- **Sanity Studio:** The Sanity Studio runs separately on port 3334 and is not deployed with the main site

## Post-Deployment

After deployment, verify:
1. ✅ Site loads correctly
2. ✅ All pages are accessible
3. ✅ Sanity data is loading (check browser console for errors)
4. ✅ Images and assets load properly

