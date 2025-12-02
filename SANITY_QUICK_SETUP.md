# Quick Sanity Setup

## 1. Create a Sanity Project

1. Go to https://www.sanity.io and sign up/login
2. Click "Create new project"
3. Name it (e.g., "My Portfolio")
4. Choose dataset: `production`
5. Click "Create project"

## 2. Get Your Credentials

1. In Sanity Dashboard → Settings → API
2. Copy your **Project ID** (looks like: `abc123xyz`)
3. Note your **Dataset name** (usually `production`)

## 3. Create .env File

Create a `.env` file in the project root:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-02-02
```

Replace `your-project-id-here` with your actual Project ID.

## 4. Configure CORS

1. In Sanity Dashboard → Settings → API → CORS origins
2. Add: `http://localhost:5173`
3. Add your production URL when deploying

## 5. Run Sanity Studio

```bash
npm run studio
```

This will open Sanity Studio at `http://localhost:3333`

## 6. Add Content

In the Studio, create:
- **Hero** - Your name, roles, bio
- **Project** - Portfolio projects
- **Post** - Blog posts
- **Experience** - Work history
- **About** - About page content
- **Contact** - Contact page content

## 7. Test Your Site

```bash
npm run dev
```

Your site will now load data from Sanity! If Sanity isn't configured, it falls back to dummy data.

## Troubleshooting

- **Restart dev server** after creating `.env`
- **Check CORS settings** if you see network errors
- **Verify Project ID** matches your Sanity project
- **Publish documents** in Sanity (not just save as draft)
