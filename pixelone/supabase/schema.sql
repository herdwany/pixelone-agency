-- Pixel One Supabase Schema + RLS
-- Run this file in Supabase SQL Editor (in order).

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Helpers
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create table if not exists public.pixel_admin_users (
    email text primary key,
    created_at timestamptz not null default now()
);

create or replace function public.is_admin_email()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.pixel_admin_users au
        where lower(au.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

grant execute on function public.is_admin_email() to anon, authenticated;

-- ------------------------------------------------------------
-- Core tables
-- ------------------------------------------------------------
create table if not exists public.pixel_services (
    id text primary key,
    title_ar text not null,
    description_ar text not null default '',
    price text not null,
    category text not null default 'service',
    is_coming_soon boolean not null default false,
    popularity integer not null default 999,
    enabled boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.pixel_offers (
    id text primary key,
    title text not null,
    description text not null default '',
    badge text not null default '',
    target text not null default 'all' check (target in ('all', 'customer')),
    target_email text not null default '',
    enabled boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.pixel_orders (
    id text primary key,
    service_name text not null,
    customer_name text not null,
    customer_phone text not null,
    customer_email text not null,
    specs text not null default '',
    status text not null default 'received',
    support_email text,
    created_at timestamptz not null default now(),
    last_update_at timestamptz not null default now(),
    user_id uuid,
    user_email text,
    final_price text,
    discount_code text
);

create table if not exists public.pixel_disputes (
    id text primary key,
    order_id text not null,
    client_email text not null,
    amount numeric(12, 2) not null default 0,
    currency text not null default 'MAD',
    channel text not null default 'other',
    status text not null default 'open',
    reason text not null,
    notes text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.pixel_discounts_global (
    id text primary key,
    enabled boolean not null default false,
    code text not null default '',
    discount_type text not null default 'percent' check (discount_type in ('percent', 'fixed')),
    discount_value numeric(12, 2) not null default 0,
    ends_at timestamptz,
    updated_at timestamptz not null default now()
);

create table if not exists public.pixel_discounts_customer (
    id text primary key,
    email text not null,
    code text not null,
    discount_type text not null default 'percent' check (discount_type in ('percent', 'fixed')),
    discount_value numeric(12, 2) not null default 0,
    ends_at timestamptz,
    enabled boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

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

create index if not exists idx_pixel_services_popularity on public.pixel_services (popularity);
create index if not exists idx_pixel_services_enabled on public.pixel_services (enabled);
create index if not exists idx_pixel_offers_enabled on public.pixel_offers (enabled);
create index if not exists idx_pixel_offers_target_email on public.pixel_offers (lower(target_email));
create index if not exists idx_pixel_orders_user_email on public.pixel_orders (lower(user_email));
create index if not exists idx_pixel_discounts_customer_email on public.pixel_discounts_customer (lower(email));
create index if not exists idx_pixel_i18n_pages_page on public.pixel_i18n_pages (page);

-- Triggers for updated_at maintenance

drop trigger if exists trg_pixel_services_updated_at on public.pixel_services;
create trigger trg_pixel_services_updated_at
before update on public.pixel_services
for each row execute function public.set_updated_at();

drop trigger if exists trg_pixel_offers_updated_at on public.pixel_offers;
create trigger trg_pixel_offers_updated_at
before update on public.pixel_offers
for each row execute function public.set_updated_at();

drop trigger if exists trg_pixel_disputes_updated_at on public.pixel_disputes;
create trigger trg_pixel_disputes_updated_at
before update on public.pixel_disputes
for each row execute function public.set_updated_at();

drop trigger if exists trg_pixel_discounts_customer_updated_at on public.pixel_discounts_customer;
create trigger trg_pixel_discounts_customer_updated_at
before update on public.pixel_discounts_customer
for each row execute function public.set_updated_at();

drop trigger if exists trg_pixel_i18n_pages_updated_at on public.pixel_i18n_pages;
create trigger trg_pixel_i18n_pages_updated_at
before update on public.pixel_i18n_pages
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.pixel_admin_users enable row level security;
alter table public.pixel_services enable row level security;
alter table public.pixel_offers enable row level security;
alter table public.pixel_orders enable row level security;
alter table public.pixel_disputes enable row level security;
alter table public.pixel_discounts_global enable row level security;
alter table public.pixel_discounts_customer enable row level security;
alter table public.pixel_i18n_pages enable row level security;

-- admin_users

drop policy if exists pixel_admin_users_select_admin on public.pixel_admin_users;
create policy pixel_admin_users_select_admin
on public.pixel_admin_users
for select
using (public.is_admin_email());

drop policy if exists pixel_admin_users_mutation_admin on public.pixel_admin_users;
create policy pixel_admin_users_mutation_admin
on public.pixel_admin_users
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- services

drop policy if exists pixel_services_select_public_enabled on public.pixel_services;
create policy pixel_services_select_public_enabled
on public.pixel_services
for select
using (enabled = true);

drop policy if exists pixel_services_select_admin_all on public.pixel_services;
create policy pixel_services_select_admin_all
on public.pixel_services
for select
using (public.is_admin_email());

drop policy if exists pixel_services_write_admin on public.pixel_services;
create policy pixel_services_write_admin
on public.pixel_services
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- offers

drop policy if exists pixel_offers_select_public on public.pixel_offers;
create policy pixel_offers_select_public
on public.pixel_offers
for select
using (
    enabled = true
    and (
        target = 'all'
        or lower(target_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
);

drop policy if exists pixel_offers_select_admin_all on public.pixel_offers;
create policy pixel_offers_select_admin_all
on public.pixel_offers
for select
using (public.is_admin_email());

drop policy if exists pixel_offers_write_admin on public.pixel_offers;
create policy pixel_offers_write_admin
on public.pixel_offers
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- orders

drop policy if exists pixel_orders_insert_public on public.pixel_orders;
create policy pixel_orders_insert_public
on public.pixel_orders
for insert
with check (true);

drop policy if exists pixel_orders_select_own_or_admin on public.pixel_orders;
create policy pixel_orders_select_own_or_admin
on public.pixel_orders
for select
using (
    public.is_admin_email()
    or (
        auth.uid() is not null
        and (
            user_id = auth.uid()
            or lower(coalesce(user_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
        )
    )
);

drop policy if exists pixel_orders_update_admin on public.pixel_orders;
create policy pixel_orders_update_admin
on public.pixel_orders
for update
using (public.is_admin_email())
with check (public.is_admin_email());

drop policy if exists pixel_orders_delete_admin on public.pixel_orders;
create policy pixel_orders_delete_admin
on public.pixel_orders
for delete
using (public.is_admin_email());

-- disputes

drop policy if exists pixel_disputes_select_admin on public.pixel_disputes;
create policy pixel_disputes_select_admin
on public.pixel_disputes
for select
using (public.is_admin_email());

drop policy if exists pixel_disputes_write_admin on public.pixel_disputes;
create policy pixel_disputes_write_admin
on public.pixel_disputes
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- discounts_global

drop policy if exists pixel_discounts_global_select_public on public.pixel_discounts_global;
create policy pixel_discounts_global_select_public
on public.pixel_discounts_global
for select
using (true);

drop policy if exists pixel_discounts_global_write_admin on public.pixel_discounts_global;
create policy pixel_discounts_global_write_admin
on public.pixel_discounts_global
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- discounts_customer

drop policy if exists pixel_discounts_customer_select_owner_or_admin on public.pixel_discounts_customer;
create policy pixel_discounts_customer_select_owner_or_admin
on public.pixel_discounts_customer
for select
using (
    public.is_admin_email()
    or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

drop policy if exists pixel_discounts_customer_write_admin on public.pixel_discounts_customer;
create policy pixel_discounts_customer_write_admin
on public.pixel_discounts_customer
for all
using (public.is_admin_email())
with check (public.is_admin_email());

-- i18n pages

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

-- ------------------------------------------------------------
-- Seed data (safe upserts)
-- ------------------------------------------------------------
insert into public.pixel_admin_users (email)
values
    ('superadmin@pixelonevisuals.tech'),
    ('support@pixelonevisuals.tech'),
    ('contact@pixelonevisuals.tech')
on conflict (email) do nothing;

insert into public.pixel_discounts_global (id, enabled, code, discount_type, discount_value)
values ('global', false, '', 'percent', 0)
on conflict (id) do nothing;

insert into public.pixel_services (id, title_ar, description_ar, price, category, is_coming_soon, popularity, enabled)
values
    ('svc-social-fixed', 'Social Media Static Designs', 'Professional ad posts for Instagram/Facebook/LinkedIn.', '60', 'social', false, 1, true),
    ('svc-logo', 'Professional Logo Design', 'Clear logo usable across platforms with transparent export.', '150', 'branding', false, 2, true),
    ('svc-banners', 'Digital Banners & Ads', 'Campaign-ready banners in publish-ready sizes.', '80', 'ads', false, 3, true),
    ('svc-pitch', 'Pitch Deck Design', 'Business/investor slides with strong visual hierarchy.', '200', 'business', false, 4, true),
    ('svc-reels', 'Short Video (Reels/TikTok)', 'Fast lightweight edit for short-form daily content.', '120', 'video', false, 5, true),
    ('svc-design-pro', 'Professional Design Service', 'Advanced design package for identity and content.', '500', 'design', false, 6, true),
    ('svc-video-short', 'Short Videos (< 1 min)', 'High-quality short video editing for social platforms.', '300', 'video', false, 7, true),
    ('svc-video-advanced', 'Advanced Promo Video (Soon)', 'Complex production-grade video service coming soon.', 'Soon', 'video-advanced', true, 8, true),
    ('svc-web-landing', 'Web & Landing Page Design (Soon)', 'Soon: high-converting landing pages and websites.', '1500', 'web', true, 9, true)
on conflict (id) do update set
    title_ar = excluded.title_ar,
    description_ar = excluded.description_ar,
    price = excluded.price,
    category = excluded.category,
    is_coming_soon = excluded.is_coming_soon,
    popularity = excluded.popularity,
    enabled = excluded.enabled,
    updated_at = now();

insert into public.pixel_offers (id, title, description, badge, target, target_email, enabled)
values ('offer-welcome-10', 'Welcome Offer', 'Special discount for first-time clients.', 'WELCOME10', 'all', '', true)
on conflict (id) do update set
    title = excluded.title,
    description = excluded.description,
    badge = excluded.badge,
    target = excluded.target,
    target_email = excluded.target_email,
    enabled = excluded.enabled,
    updated_at = now();
