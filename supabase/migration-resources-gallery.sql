-- Run once in the Supabase SQL editor on an existing project.
-- Adds Resources and Gallery tables, and retires the unused blogs table.

create table if not exists public.resources (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  summary       text not null default '',
  body          text not null default '',
  url           text,
  link_label    text not null default '',
  citation      text not null default '',
  sort_order    integer not null default 1,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id            uuid primary key default gen_random_uuid(),
  image_url     text not null,
  alt           text not null default '',
  caption       text not null default '',
  sort_order    integer not null default 1,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists resources_sort_idx on public.resources (published, sort_order);
create index if not exists gallery_sort_idx on public.gallery_items (published, sort_order);

drop trigger if exists resources_touch on public.resources;
create trigger resources_touch before update on public.resources
  for each row execute function public.touch_updated_at();

drop trigger if exists gallery_touch on public.gallery_items;
create trigger gallery_touch before update on public.gallery_items
  for each row execute function public.touch_updated_at();

alter table public.resources enable row level security;
alter table public.gallery_items enable row level security;

drop policy if exists "resources are public when published" on public.resources;
create policy "resources are public when published"
  on public.resources for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage resources" on public.resources;
create policy "staff manage resources"
  on public.resources for all to authenticated
  using (true) with check (true);

drop policy if exists "gallery is public when published" on public.gallery_items;
create policy "gallery is public when published"
  on public.gallery_items for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage gallery" on public.gallery_items;
create policy "staff manage gallery"
  on public.gallery_items for all to authenticated
  using (true) with check (true);

-- Optional: remove the unused blogs table after confirming nothing depends on it.
-- drop table if exists public.blogs;

-- After this migration, the tables are empty.
-- Either:
-- 1) Run supabase/seed-resources-gallery.sql, or
-- 2) Open /admin/resources and click "Import built-in resources"
--    (and the same for Gallery).
