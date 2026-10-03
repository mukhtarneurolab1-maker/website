# Mukhtar Lab

Professional academic website for the Mukhtar Laboratory.

## Overview

Public pages for research, publications, awards, team, gallery, resources, and contact, with a private admin area for content updates.

## Stack

- Next.js (App Router) and TypeScript
- Supabase for content and media
- Resend for contact form delivery

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create a local `.env.local` from `.env.example` and fill in the required values for your environment. Never commit `.env.local` or any secrets.

## Content and admin

Database schema and seed files live under `supabase/`. After the database is configured and an admin user exists, sign in at `/admin` to manage published content.

Until a content table has published rows, the site falls back to built-in seed content.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the project |

Maintenance scripts under `scripts/` are for keep-alive, backup, and restore. They need the appropriate environment variables and should only be run in a trusted environment.

## License

Private project. All rights reserved.
