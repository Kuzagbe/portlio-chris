# Migration from Next.js to Vite + React

## Completed Migration Steps

### 1. Project Structure
- ✅ Created `src/` directory structure
- ✅ Moved all components to `src/components/`
- ✅ Created `src/pages/` for route pages
- ✅ Moved types, lib, and sanity configs to `src/`

### 2. Configuration Files
- ✅ Created `vite.config.ts` with React plugin and path aliases
- ✅ Created `index.html` as entry point
- ✅ Updated `tsconfig.json` for Vite (removed Next.js plugins)
- ✅ Updated `package.json` scripts (dev, build, preview)
- ✅ Created `src/vite-env.d.ts` for Vite types

### 3. Component Conversions
- ✅ Removed all `"use client"` directives (not needed in Vite)
- ✅ Replaced `next/image` with regular `<img>` tags
- ✅ Replaced `next/link` with `react-router-dom` `Link` component
- ✅ Updated all `href` props to `to` props for React Router
- ✅ Fixed all Image component usages (removed `fill` prop, added width/height classes)

### 4. Routing
- ✅ Created `src/App.tsx` with React Router setup
- ✅ Created `src/main.tsx` as entry point with BrowserRouter
- ✅ Converted all page components (Home, About, Projects, Blog, Contact)
- ✅ Set up routes in App.tsx

### 5. Styling
- ✅ Moved `globals.css` to `src/index.css`
- ✅ Added Inter font import via Google Fonts
- ✅ Maintained all Tailwind CSS configuration

### 6. Dependencies
- ✅ Installed Vite and React Router
- ✅ Kept all existing dependencies (framer-motion, next-themes, etc.)
- ✅ Removed Next.js from dependencies

## Running the Project

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Notes
- All components have been converted to work with Vite
- React Router is used for client-side routing
- Theme provider (next-themes) still works
- All animations and interactions preserved
- Sanity CMS integration maintained

## Cleanup (Post-Migration)

### Removed Next.js Artifacts
- ✅ Removed `app/` directory (Next.js App Router structure)
- ✅ Removed root-level `components/`, `lib/`, `sanity/`, and `types/` directories (duplicates)
- ✅ Removed `next.config.ts` and `next-env.d.ts` config files
- ✅ Removed unused template SVG files from `public/`

### Updated Configuration
- ✅ Updated ESLint config for Vite/React (removed Next.js ESLint config)
- ✅ Updated `package.json` devDependencies (removed `eslint-config-next`, added proper ESLint plugins)
- ✅ Updated Sanity config imports to point to `src/sanity/`
- ✅ Updated environment variable handling to support both Vite (`import.meta.env`) and Node.js (`process.env`)
- ✅ Updated README.md with current project information

### Project Structure
The project now has a clean Vite structure:
- All source code in `src/`
- All components use `@/` path alias
- Sanity config files at root reference `src/sanity/`
- No duplicate directories or files


