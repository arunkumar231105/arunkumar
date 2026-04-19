# Arun Kumar — Portfolio Website

Personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Setup

```bash
# Install all dependencies (must use NODE_ENV=development since production env skips devDeps)
NODE_ENV=development npm install --ignore-scripts

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build   # production build
npm run start   # run production build locally
```

Deploy to Vercel: push to GitHub → import in Vercel dashboard. `vercel.json` is already configured.

> **Note:** On Vercel, `npm install` runs in CI mode (installs all deps) automatically — no workaround needed.

## Required files in `/public`

| File | Description |
|------|-------------|
| `arun-kumar.jpeg` | Your profile photo (already copied or add manually) |
| `Arun_Resume.pdf` | Your resume PDF for download button |

## Structure

```
app/
  layout.tsx       # Root layout + OG meta tags + Google Fonts
  page.tsx         # Single page composition
  globals.css      # Tailwind base + custom CSS
components/
  Navbar.tsx       # Sticky nav with active-section highlight
  Hero.tsx         # Full-viewport hero + typewriter + particles
  ParticleCanvas.tsx  # Canvas particle network animation
  About.tsx        # Two-column with photo + bio
  Experience.tsx   # Vertical timeline of work history
  Projects.tsx     # Card grid with hover glow effects
  Skills.tsx       # Grouped skill badges by category
  Certifications.tsx  # Certification card grid
  Contact.tsx      # Contact links + mailto form
  Footer.tsx       # Minimal footer
hooks/
  useInView.ts     # Intersection Observer hook for scroll animations
```

## Customization

- Colors: `tailwind.config.js` → `theme.extend.colors`
- Font: `app/globals.css` Google Fonts import
- Content: edit directly in each component file
- OG tags: `app/layout.tsx` → `metadata` object
