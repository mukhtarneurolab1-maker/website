# Mukhtar Lab website (Next.js)

Academic site for Dr. Tanzila Mukhtar / Mukhtar Laboratory.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Supabase for research, publications, awards, resources, and gallery
- Resend for the contact form

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and add the project URL and publishable key.
3. In the Supabase SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
   For an existing project that already ran the old schema, also run `supabase/migration-resources-gallery.sql`.
4. Authentication → Users → add an email and password.
5. Open [http://localhost:3000/admin](http://localhost:3000/admin).

Until a table has published rows, that section of the website keeps the built-in content.
