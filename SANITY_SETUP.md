# Sanity CMS Setup Guide

This guide will help you configure Sanity CMS for your portfolio website.

## Step 1: Create a Sanity Account and Project

1. Go to [https://www.sanity.io](https://www.sanity.io) and sign up for a free account
2. Once logged in, click "Create new project"
3. Fill in:
   - **Project name**: Your portfolio name (e.g., "My Portfolio")
   - **Dataset name**: `production` (or your preferred name)
   - **Plan**: Free tier is fine for development
4. Click "Create project"

## Step 2: Get Your Project Credentials

1. After creating the project, go to **Settings** → **API** → **CORS origins**
2. Add your development URL: `http://localhost:5173` (Vite default port)
3. Add your production URL when ready
4. Go to **Settings** → **API** → **Project settings**
5. Copy your **Project ID** (looks like: `abc123xyz`)
6. Note your **Dataset name** (usually `production`)

## Step 3: Install Sanity CLI (if not already installed)

```bash
npm install -g @sanity/cli
```

## Step 4: Configure Environment Variables

1. Create a `.env` file in the root of your project:

```bash
cp .env.example .env
```

2. Open `.env` and fill in your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-02-02
```

Replace `your-project-id-here` with your actual Project ID from Step 2.

## Step 5: Install Sanity Studio Dependencies

The project already has `next-sanity` installed, but you may need to install Sanity Studio:

```bash
npm install sanity @sanity/vision
```

## Step 6: Set Up Sanity Studio

The Sanity Studio is configured to run at `/studio`. You have two options:

### Option A: Run Studio Separately (Recommended for Development)

Add this script to your `package.json`:

```json
{
  "scripts": {
    "studio": "sanity dev --port 3333"
  }
}
```

Then run:
```bash
npm run studio
```

Access the studio at: `http://localhost:3333`

### Option B: Integrate Studio into Your App

If you want the studio accessible at `/studio` in your app, you'll need to set up a separate route. This requires additional configuration.

## Step 7: Deploy Your Schemas

1. Make sure you're logged into Sanity CLI:
```bash
sanity login
```

2. Deploy your schemas:
```bash
sanity schema deploy
```

## Step 8: Start Adding Content

1. Open Sanity Studio (either via `npm run studio` or at `/studio` if integrated)
2. You'll see the following content types:
   - **Hero** - Home page hero section
   - **Project** - Portfolio projects
   - **Post** - Blog posts
   - **Experience** - Work experience
   - **About** - About page content
   - **Contact** - Contact page content

3. Start creating content:
   - Create a **Hero** document with your name, roles, and bio
   - Add **Projects** with images, descriptions, and tags
   - Write **Posts** for your blog
   - Add **Experience** entries with company info and technologies
   - Configure **About** page with travel photos
   - Set up **Contact** page content

## Step 9: Test Your Integration

1. Start your development server:
```bash
npm run dev
```

2. Visit your pages - they should now load data from Sanity
3. If Sanity is not configured, the app will fall back to dummy data

## Troubleshooting

### "Project ID not found" error
- Make sure your `.env` file exists and has the correct `VITE_SANITY_PROJECT_ID`
- Restart your dev server after creating/updating `.env`
- Check that the Project ID matches your Sanity project

### CORS errors
- Go to Sanity Dashboard → Settings → API → CORS origins
- Add `http://localhost:5173` (or your dev port)
- Add your production domain when deploying

### Studio not loading
- Make sure you've installed Sanity CLI: `npm install -g @sanity/cli`
- Try running `sanity login` to authenticate
- Check that your `sanity.config.ts` and `sanity.cli.ts` files are correct

### Data not appearing
- Check browser console for errors
- Verify your environment variables are loaded (check Network tab)
- Make sure you've published documents in Sanity Studio (draft vs published)
- Check that your dataset name matches in `.env` and Sanity dashboard

## Content Types Reference

### Hero
- `name`: Your full name
- `roles`: Array of role titles (e.g., ["Frontend Developer", "UI/UX Designer"])
- `bio`: Short bio text
- `profileImage`: Profile picture (optional)

### Project
- `title`: Project name
- `slug`: URL-friendly identifier
- `description`: Project description
- `mainImage`: Project screenshot
- `link`: Project URL (optional)
- `tags`: Array of technology tags (e.g., ["react", "nextjs", "tailwind"])

### Post
- `title`: Blog post title
- `slug`: URL-friendly identifier
- `publishedAt`: Publication date
- `overview`: Short description
- `body`: Full post content (rich text)

### Experience
- `company`: Company name
- `companyLogo`: Company logo image (optional)
- `role`: Job title
- `duration`: Time period (e.g., "June 2020 - Present")
- `description`: Job description
- `technologies`: Array of tech used (e.g., ["React", "TypeScript"])

### About
- `heading`: Page heading
- `bio`: About text
- `travelPhotos`: Array of travel photos with location and image

### Contact
- `heading`: Page heading
- `description`: Contact description text

## Next Steps

- Add more content to your Sanity project
- Customize schemas if needed in `src/sanity/schemaTypes/`
- Set up environment variables for production
- Deploy your site and update CORS settings





