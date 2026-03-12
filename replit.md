# Jack Pitts Health Foundation Website

## Overview
A full-stack web application for the Jack Pitts Health Foundation charity golf tournament. The site is a premium, story-driven experience that honors Jack Pitts' legacy as a football pioneer, civil rights figure, and community health champion.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, wouter (routing)
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui
- **Fonts**: Playfair Display (display), Bebas Neue/Oswald (athletic/labels), Lora (body)

## Design System
- **Color Palette**: Forest Green (#1a6b3a), Deep Cream (#f5f0e8), Warm Gold (#c9973a), Near Black (#0d1f0f)
- **Aesthetic**: "ESPN documentary meets The Masters" — editorial sports legacy style
- **Animations**: Framer Motion throughout (scroll animations, parallax, float effects, counters)

## Project Structure
```
client/src/
  pages/          Home, Schedule, Gallery, Sponsorship, Registration
  components/     Navbar, Footer, PageHeader, ui/ (shadcn)
  hooks/          use-gallery (gallery CRUD)
  lib/            queryClient
server/
  routes.ts       API routes (/api/gallery)
  storage.ts      Database storage interface
  db.ts           Drizzle database connection
shared/
  schema.ts       Drizzle schema (gallery_items table)
  routes.ts       Shared API route definitions
```

## Key Features
- Animated hero with anime-style Jack Pitts illustrations
- "The Legend" feature story section with Duffy Daugherty quote
- Animated stats counter bar (touchdowns, championships, etc.)
- Awards & Honors timeline cards
- "A Catalyst for Change" full-width quote section
- Photo gallery with API-backed CRUD
- Sponsorship tiers (Platinum $10k through Hole Sponsor $125)
- Registration with pricing and mail-in instructions
- Legacy footer blurb across all pages

## Anime Illustrations (4 images)
1. Trophy raise → Home hero
2. Golf swing → Schedule page watermark
3. Putting stance → Registration page
4. Celebration fist pump → Home "Catalyst for Change" section + Sponsorship hero

## Routes
- `/` — Home (hero, legend, stats, awards, catalyst, mission)
- `/schedule` — Event timeline
- `/gallery` — Photo gallery with add functionality
- `/sponsorship` — Sponsorship tiers with celebration illustration
- `/registration` — Pricing, how-to-register, about the honoree

## Deployment
- Configured for Netlify (netlify.toml + _redirects)
- Build command: `npm run build`
- Publish directory: `dist/public`

## Exports
- Navbar and Footer use named exports: `{ Navbar }`, `{ Footer }`
- PageHeader uses named export: `{ PageHeader }`
- All page components use default exports
