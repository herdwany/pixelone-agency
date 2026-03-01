# invite-user Edge Function

Secure invite endpoint for Pixel One.

## What it does

- Verifies caller session from bearer token.
- Checks caller is admin via `pixel_admin_users`.
- Sends Supabase invite email using service role key.
- If role is `admin`, upserts invited email into `pixel_admin_users`.

## Required secrets

Set these in Supabase project secrets:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Deploy

```bash
supabase functions deploy invite-user --project-ref YOUR_PROJECT_REF
```

## Invoke (frontend)

Use `supabase.functions.invoke('invite-user', { body: { email, role, redirectTo } })`.

## Body

```json
{
  "email": "new.user@domain.com",
  "role": "client",
  "redirectTo": "https://your-site.com/login.html"
}
```
