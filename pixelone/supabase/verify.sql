-- Pixel One quick verification checks

select 'table_exists_pixel_services' as check_name, to_regclass('public.pixel_services') is not null as ok;
select 'table_exists_pixel_offers' as check_name, to_regclass('public.pixel_offers') is not null as ok;
select 'table_exists_pixel_orders' as check_name, to_regclass('public.pixel_orders') is not null as ok;
select 'table_exists_pixel_disputes' as check_name, to_regclass('public.pixel_disputes') is not null as ok;
select 'table_exists_pixel_discounts_global' as check_name, to_regclass('public.pixel_discounts_global') is not null as ok;
select 'table_exists_pixel_discounts_customer' as check_name, to_regclass('public.pixel_discounts_customer') is not null as ok;
select 'table_exists_pixel_admin_users' as check_name, to_regclass('public.pixel_admin_users') is not null as ok;

select 'function_is_admin_email_exists' as check_name,
       exists (
           select 1
           from pg_proc p
           join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname = 'is_admin_email'
       ) as ok;

select 'rls_enabled_pixel_services' as check_name, relrowsecurity as ok
from pg_class
where oid = 'public.pixel_services'::regclass;

select 'policy_count_pixel_services' as check_name, count(*) >= 2 as ok
from pg_policies
where schemaname = 'public' and tablename = 'pixel_services';

select 'policy_count_pixel_offers' as check_name, count(*) >= 2 as ok
from pg_policies
where schemaname = 'public' and tablename = 'pixel_offers';

select 'policy_count_pixel_orders' as check_name, count(*) >= 2 as ok
from pg_policies
where schemaname = 'public' and tablename = 'pixel_orders';

select 'admin_seed_present' as check_name,
       exists (select 1 from public.pixel_admin_users where lower(email) = 'superadmin@pixelonevisuals.tech') as ok;

select 'global_discount_row_present' as check_name,
       exists (select 1 from public.pixel_discounts_global where id = 'global') as ok;
