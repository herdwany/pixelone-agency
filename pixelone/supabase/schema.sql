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

create table if not exists public.pixel_user_signups (
    auth_user_id uuid primary key,
    full_name text not null default '',
    email text not null default '',
    phone text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.sync_pixel_user_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.pixel_user_signups (auth_user_id, full_name, email, phone, created_at, updated_at)
    values (
        new.id,
        coalesce(
            nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''),
            split_part(coalesce(new.email, ''), '@', 1),
            ''
        ),
        coalesce(new.email, ''),
        coalesce(nullif(trim(coalesce(new.raw_user_meta_data ->> 'phone', '')), ''), ''),
        coalesce(new.created_at, now()),
        now()
    )
    on conflict (auth_user_id) do update
    set
        full_name = excluded.full_name,
        email = excluded.email,
        phone = excluded.phone,
        created_at = excluded.created_at,
        updated_at = now();

    return new;
end;
$$;

drop trigger if exists trg_auth_users_sync_pixel_signup on auth.users;
create trigger trg_auth_users_sync_pixel_signup
after insert on auth.users
for each row execute function public.sync_pixel_user_signup();

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

create table if not exists public.pixel_portfolio_items (
    id text primary key,
    title_ar text not null,
    description_ar text not null default '',
    category text not null default 'web' check (category in ('web', 'design', 'video', 'custom')),
    card_style text not null default 'standard' check (card_style in ('standard', 'cta')),
    is_static_card boolean not null default false,
    media_type text not null default 'image' check (media_type in ('image', 'placeholder')),
    image_url text,
    image_alt_ar text,
    badge_text_ar text not null default '',
    action_type text not null default 'external_link' check (action_type in ('external_link', 'internal_link', 'open_order_modal')),
    action_label_ar text not null default '',
    action_url text not null default '',
    open_in_new_tab boolean not null default true,
    order_service_name_ar text not null default '',
    sort_order integer not null default 999,
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

create table if not exists public.pixel_quotes (
    id uuid primary key default gen_random_uuid(),
    order_id text not null references public.pixel_orders(id) on delete cascade,
    quote_number text not null unique,
    status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired', 'converted')),
    subtotal numeric(12, 2) not null default 0,
    discount_value numeric(12, 2) not null default 0,
    total numeric(12, 2) not null default 0,
    currency text not null default 'MAD' check (currency = 'MAD'),
    valid_until timestamptz,
    notes text not null default '',
    created_at timestamptz not null default now()
);

create table if not exists public.pixel_invoices (
    id uuid primary key default gen_random_uuid(),
    order_id text not null references public.pixel_orders(id) on delete cascade,
    quote_id uuid not null references public.pixel_quotes(id) on delete cascade,
    invoice_number text not null unique,
    status text not null default 'unpaid' check (status in ('unpaid', 'paid', 'cancelled')),
    total numeric(12, 2) not null default 0,
    issued_at timestamptz not null default now(),
    due_date timestamptz,
    created_at timestamptz not null default now()
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
create index if not exists idx_pixel_portfolio_items_sort_order on public.pixel_portfolio_items (sort_order);
create index if not exists idx_pixel_portfolio_items_enabled on public.pixel_portfolio_items (enabled);
create index if not exists idx_pixel_portfolio_items_category on public.pixel_portfolio_items (category);
create index if not exists idx_pixel_offers_enabled on public.pixel_offers (enabled);
create index if not exists idx_pixel_offers_target_email on public.pixel_offers (lower(target_email));
create index if not exists idx_pixel_orders_user_email on public.pixel_orders (lower(user_email));
create index if not exists idx_pixel_quotes_order_id on public.pixel_quotes (order_id);
create index if not exists idx_pixel_quotes_status on public.pixel_quotes (status);
create index if not exists idx_pixel_quotes_quote_number on public.pixel_quotes (quote_number);
create index if not exists idx_pixel_invoices_order_id on public.pixel_invoices (order_id);
create index if not exists idx_pixel_invoices_quote_id on public.pixel_invoices (quote_id);
create index if not exists idx_pixel_invoices_status on public.pixel_invoices (status);
create index if not exists idx_pixel_invoices_invoice_number on public.pixel_invoices (invoice_number);
create index if not exists idx_pixel_user_signups_email on public.pixel_user_signups (lower(email));
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

drop trigger if exists trg_pixel_portfolio_items_updated_at on public.pixel_portfolio_items;
create trigger trg_pixel_portfolio_items_updated_at
before update on public.pixel_portfolio_items
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
alter table public.pixel_user_signups enable row level security;
alter table public.pixel_services enable row level security;
alter table public.pixel_portfolio_items enable row level security;
alter table public.pixel_offers enable row level security;
alter table public.pixel_orders enable row level security;
alter table public.pixel_quotes enable row level security;
alter table public.pixel_invoices enable row level security;
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

drop policy if exists pixel_user_signups_select_admin on public.pixel_user_signups;
create policy pixel_user_signups_select_admin
on public.pixel_user_signups
for select
using (public.is_admin_email());

drop policy if exists pixel_user_signups_mutation_admin on public.pixel_user_signups;
create policy pixel_user_signups_mutation_admin
on public.pixel_user_signups
for all
using (public.is_admin_email())
with check (public.is_admin_email());

drop policy if exists pixel_user_signups_select_own on public.pixel_user_signups;
create policy pixel_user_signups_select_own
on public.pixel_user_signups
for select
to authenticated
using (auth_user_id = auth.uid());

drop policy if exists pixel_user_signups_update_own on public.pixel_user_signups;
create policy pixel_user_signups_update_own
on public.pixel_user_signups
for update
to authenticated
using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

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

-- portfolio items

drop policy if exists pixel_portfolio_items_select_public_enabled on public.pixel_portfolio_items;
create policy pixel_portfolio_items_select_public_enabled
on public.pixel_portfolio_items
for select
using (enabled = true);

drop policy if exists pixel_portfolio_items_select_admin_all on public.pixel_portfolio_items;
create policy pixel_portfolio_items_select_admin_all
on public.pixel_portfolio_items
for select
using (public.is_admin_email());

drop policy if exists pixel_portfolio_items_write_admin on public.pixel_portfolio_items;
create policy pixel_portfolio_items_write_admin
on public.pixel_portfolio_items
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

-- quotes

drop policy if exists pixel_quotes_insert_owner_or_admin on public.pixel_quotes;
create policy pixel_quotes_insert_owner_or_admin
on public.pixel_quotes
for insert
with check (
    public.is_admin_email()
    or (
        auth.uid() is null
        and exists (
            select 1
            from public.pixel_orders o
            where o.id = order_id
        )
    )
    or (
        auth.uid() is not null
        and exists (
            select 1
            from public.pixel_orders o
            where o.id = order_id
              and (
                  o.user_id = auth.uid()
                  or lower(coalesce(o.user_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
              )
        )
    )
);

drop policy if exists pixel_quotes_select_owner_or_admin on public.pixel_quotes;
create policy pixel_quotes_select_owner_or_admin
on public.pixel_quotes
for select
using (
    public.is_admin_email()
    or (
        auth.uid() is not null
        and exists (
            select 1
            from public.pixel_orders o
            where o.id = order_id
              and (
                  o.user_id = auth.uid()
                  or lower(coalesce(o.user_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
              )
        )
    )
);

drop policy if exists pixel_quotes_update_admin on public.pixel_quotes;
create policy pixel_quotes_update_admin
on public.pixel_quotes
for update
using (public.is_admin_email())
with check (public.is_admin_email());

drop policy if exists pixel_quotes_delete_admin on public.pixel_quotes;
create policy pixel_quotes_delete_admin
on public.pixel_quotes
for delete
using (public.is_admin_email());

-- invoices

drop policy if exists pixel_invoices_insert_admin on public.pixel_invoices;
create policy pixel_invoices_insert_admin
on public.pixel_invoices
for insert
with check (public.is_admin_email());

drop policy if exists pixel_invoices_select_owner_or_admin on public.pixel_invoices;
create policy pixel_invoices_select_owner_or_admin
on public.pixel_invoices
for select
using (
    public.is_admin_email()
    or (
        auth.uid() is not null
        and exists (
            select 1
            from public.pixel_orders o
            where o.id = order_id
              and (
                  o.user_id = auth.uid()
                  or lower(coalesce(o.user_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
              )
        )
    )
);

drop policy if exists pixel_invoices_update_admin on public.pixel_invoices;
create policy pixel_invoices_update_admin
on public.pixel_invoices
for update
using (public.is_admin_email())
with check (public.is_admin_email());

drop policy if exists pixel_invoices_delete_admin on public.pixel_invoices;
create policy pixel_invoices_delete_admin
on public.pixel_invoices
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
    ('svc-banner-design', 'تصميم بانر إعلاني (Banner Design)', 'تصميم مخصص وجاهز للإعلانات الممولة (يجذب النقرات).', '100', 'تصميم إعلاني', false, 1, true),
    ('svc-reels-tiktok', 'مونتاج الفيديوهات القصيرة (Reels / TikToks)', 'مونتاج ديناميكي سريع مواكب للتريند مع نصوص جذابة (Captions).', '150', 'مونتاج فيديو', false, 2, true),
    ('svc-digital-qr-menu', 'تصميم المنيو الرقمي QR (Digital QR Menu)', 'منيو رقمي فاخر للمطاعم والمقاهي يفتح بمسحة هاتف ويعكس رقي المكان.', '300', 'تصميم ضيافة', false, 3, true),
    ('svc-brand-identity-basic', 'الهوية البصرية الأساسية (Basic Brand Identity)', 'تصميم شعار احترافي + تحديد ألوان العلامة + صور البروفايل والغلاف.', '400', 'هوية بصرية', false, 4, true),
    ('svc-social-management', 'إدارة السوشيال ميديا (Social Media Management)', 'راحة بال تامة: 12 تصميماً فخماً شهرياً + كتابة النصوص لإبقاء حسابك نشطاً وجذاباً.', '900', 'إدارة محتوى', false, 5, true)
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
