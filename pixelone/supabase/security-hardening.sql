-- Pixel One security hardening (run in Supabase SQL Editor)
-- This script tightens order insertion so only authenticated users can create orders for themselves.
-- Run only if you want to block anonymous order creation.

begin;

-- Replace permissive insert policy with authenticated self-only insert.
drop policy if exists pixel_orders_insert_public on public.pixel_orders;

drop policy if exists pixel_orders_insert_authenticated_own on public.pixel_orders;
create policy pixel_orders_insert_authenticated_own
on public.pixel_orders
for insert
with check (
    auth.uid() is not null
    and (
        user_id is null
        or user_id = auth.uid()
    )
    and (
        lower(coalesce(user_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
        or lower(coalesce(customer_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
);

commit;
