-- Quote + Invoice Engine migration (safe to re-run)
-- Adds minimal entities and RLS for Pixel One Visuals.

create extension if not exists pgcrypto;

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

create index if not exists idx_pixel_quotes_order_id on public.pixel_quotes (order_id);
create index if not exists idx_pixel_quotes_status on public.pixel_quotes (status);
create index if not exists idx_pixel_quotes_quote_number on public.pixel_quotes (quote_number);
create index if not exists idx_pixel_invoices_order_id on public.pixel_invoices (order_id);
create index if not exists idx_pixel_invoices_quote_id on public.pixel_invoices (quote_id);
create index if not exists idx_pixel_invoices_status on public.pixel_invoices (status);
create index if not exists idx_pixel_invoices_invoice_number on public.pixel_invoices (invoice_number);

alter table public.pixel_quotes enable row level security;
alter table public.pixel_invoices enable row level security;

-- Quotes: clients can insert/select their own (via linked order); admins manage all.
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

-- Invoices: admin creates/manages; clients can only read their own (via linked order).
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
