-- Mukhtar Lab content tables
-- Run once in the Supabase SQL editor, then run seed.sql.

create table if not exists public.research_items (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  card_title        text not null default '',
  card_summary      text not null default '',
  subtitle          text not null default '',
  question          text not null default '',
  body              text not null default '',
  extra_line        text default '',
  image_url         text,
  image_caption     text not null default '',
  accent            text not null default 'cyan',
  sort_order        integer not null default 1,
  published         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists public.publications (
  id            uuid primary key default gen_random_uuid(),
  authors       text not null default '',
  title         text not null,
  venue         text not null default '',
  year_label    text default '',
  note          text default '',
  doi_url       text,
  image_url     text,
  category      text not null default 'first',
  featured      boolean not null default false,
  sort_order    integer not null default 1,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.awards (
  id            uuid primary key default gen_random_uuid(),
  year_label    text default '',
  title         text not null,
  detail        text default '',
  category      text not null default 'fellowship',
  sort_order    integer not null default 1,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.blogs (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null default '',
  body          text not null default '',
  cover_url     text,
  published     boolean not null default false,
  published_at  date not null default current_date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists research_sort_idx on public.research_items (published, sort_order);
create index if not exists publications_sort_idx on public.publications (published, category, sort_order);
create index if not exists awards_sort_idx on public.awards (published, category, sort_order);
create index if not exists blogs_published_idx on public.blogs (published, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists research_touch on public.research_items;
create trigger research_touch before update on public.research_items
  for each row execute function public.touch_updated_at();

drop trigger if exists publications_touch on public.publications;
create trigger publications_touch before update on public.publications
  for each row execute function public.touch_updated_at();

drop trigger if exists awards_touch on public.awards;
create trigger awards_touch before update on public.awards
  for each row execute function public.touch_updated_at();

drop trigger if exists blogs_touch on public.blogs;
create trigger blogs_touch before update on public.blogs
  for each row execute function public.touch_updated_at();

alter table public.research_items enable row level security;
alter table public.publications enable row level security;
alter table public.awards enable row level security;
alter table public.blogs enable row level security;

drop policy if exists "research is public when published" on public.research_items;
create policy "research is public when published"
  on public.research_items for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage research" on public.research_items;
create policy "staff manage research"
  on public.research_items for all to authenticated
  using (true) with check (true);

drop policy if exists "publications are public when published" on public.publications;
create policy "publications are public when published"
  on public.publications for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage publications" on public.publications;
create policy "staff manage publications"
  on public.publications for all to authenticated
  using (true) with check (true);

drop policy if exists "awards are public when published" on public.awards;
create policy "awards are public when published"
  on public.awards for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage awards" on public.awards;
create policy "staff manage awards"
  on public.awards for all to authenticated
  using (true) with check (true);

drop policy if exists "blogs are public when published" on public.blogs;
create policy "blogs are public when published"
  on public.blogs for select to anon, authenticated
  using (published or auth.role() = 'authenticated');

drop policy if exists "staff manage blogs" on public.blogs;
create policy "staff manage blogs"
  on public.blogs for all to authenticated
  using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media is publicly readable" on storage.objects;
create policy "media is publicly readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "staff upload media" on storage.objects;
create policy "staff upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

drop policy if exists "staff update media" on storage.objects;
create policy "staff update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "staff delete media" on storage.objects;
create policy "staff delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
