-- Pixel One post-setup SQL (safe to re-run)
-- Use this after tables already exist.

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

create table if not exists public.pixel_invite_audit (
    id bigint generated always as identity primary key,
    inviter_email text not null,
    invited_email text not null,
    invited_role text not null default 'client' check (invited_role in ('client', 'admin')),
    created_at timestamptz not null default now()
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

-- ------------------------------------------------------------
-- Optional indexes (safe)
-- ------------------------------------------------------------
create index if not exists idx_pixel_services_popularity on public.pixel_services (popularity);
create index if not exists idx_pixel_services_enabled on public.pixel_services (enabled);
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
create index if not exists idx_pixel_discounts_customer_email on public.pixel_discounts_customer (lower(email));
create index if not exists idx_pixel_invite_audit_created_at on public.pixel_invite_audit (created_at desc);

-- ------------------------------------------------------------
-- Triggers (safe recreate)
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.pixel_admin_users enable row level security;
alter table public.pixel_services enable row level security;
alter table public.pixel_offers enable row level security;
alter table public.pixel_orders enable row level security;
alter table public.pixel_quotes enable row level security;
alter table public.pixel_invoices enable row level security;
alter table public.pixel_disputes enable row level security;
alter table public.pixel_discounts_global enable row level security;
alter table public.pixel_discounts_customer enable row level security;
alter table public.pixel_invite_audit enable row level security;

-- pixel_admin_users

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

-- pixel_services

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

-- pixel_offers

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

-- pixel_orders

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

-- pixel_quotes

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

-- pixel_invoices

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

-- pixel_disputes

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

-- pixel_discounts_global

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

-- pixel_discounts_customer

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

-- pixel_invite_audit

drop policy if exists pixel_invite_audit_select_admin on public.pixel_invite_audit;
create policy pixel_invite_audit_select_admin
on public.pixel_invite_audit
for select
using (public.is_admin_email());

drop policy if exists pixel_invite_audit_insert_admin on public.pixel_invite_audit;
create policy pixel_invite_audit_insert_admin
on public.pixel_invite_audit
for insert
with check (public.is_admin_email());

-- ------------------------------------------------------------
-- Seed essentials
-- ------------------------------------------------------------
insert into public.pixel_admin_users (email)
values
    ('superadmin@pixelonevisuals.tech'),
    ('support@pixelonevisuals.tech'),
    ('contact@pixelonevisuals.tech')
on conflict (email) do nothing;

insert into public.pixel_discounts_global (id, enabled, code, discount_type, discount_value)
values ('global', false, '', 'percent', 0)
on conflict (id) do update set
    enabled = excluded.enabled,
    code = excluded.code,
    discount_type = excluded.discount_type,
    discount_value = excluded.discount_value,
    updated_at = now();
