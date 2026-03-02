-- Pixel One i18n table + policies
-- Run this file in Supabase SQL Editor for existing projects.

begin;

create table if not exists public.pixel_i18n_pages (
    page text not null,
    lang text not null check (lang in ('ar', 'en', 'fr')),
    title text not null default '',
    meta_description text not null default '',
    texts jsonb not null default '[]'::jsonb,
    attributes jsonb not null default '[]'::jsonb,
    updated_by text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (page, lang)
);

create index if not exists idx_pixel_i18n_pages_page on public.pixel_i18n_pages (page);

alter table public.pixel_i18n_pages enable row level security;

drop trigger if exists trg_pixel_i18n_pages_updated_at on public.pixel_i18n_pages;
create trigger trg_pixel_i18n_pages_updated_at
before update on public.pixel_i18n_pages
for each row execute function public.set_updated_at();

drop policy if exists pixel_i18n_pages_select_public on public.pixel_i18n_pages;
create policy pixel_i18n_pages_select_public
on public.pixel_i18n_pages
for select
using (true);

drop policy if exists pixel_i18n_pages_write_admin on public.pixel_i18n_pages;
create policy pixel_i18n_pages_write_admin
on public.pixel_i18n_pages
for all
using (public.is_admin_email())
with check (public.is_admin_email());

commit;
