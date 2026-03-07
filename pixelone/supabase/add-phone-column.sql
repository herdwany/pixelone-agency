-- Phone column migration for pixel_user_signups
-- ⚠️  If the table doesn't exist yet, run schema.sql FIRST, then skip this file.
-- This file is ONLY needed if schema.sql was already run before the phone update.

alter table public.pixel_user_signups
    add column if not exists phone text not null default '';

-- Update the trigger function to also sync the phone from user_metadata
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

-- Allow authenticated users to read their own row
drop policy if exists "pixel_user_signups_select_own" on public.pixel_user_signups;
create policy pixel_user_signups_select_own
    on public.pixel_user_signups
    for select
    to authenticated
    using (auth_user_id = auth.uid());

-- Allow authenticated users to update their own phone
drop policy if exists "pixel_user_signups_update_own" on public.pixel_user_signups;
create policy pixel_user_signups_update_own
    on public.pixel_user_signups
    for update
    to authenticated
    using (auth_user_id = auth.uid())
    with check (auth_user_id = auth.uid());
