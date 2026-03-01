# Pixel One Auth Email Templates

Paste each HTML file into the matching template in Supabase:
`Authentication -> Email Templates`.

## Action templates

- `confirm-sign-up.html` -> Confirm sign up
- `invite-user.html` -> Invite user
- `magic-link.html` -> Magic link
- `change-email-address.html` -> Change email address
- `reset-password.html` -> Reset password
- `reauthentication.html` -> Reauthentication

## Security templates

- `security-password-changed.html` -> Password changed
- `security-email-address-changed.html` -> Email address changed
- `security-phone-number-changed.html` -> Phone number changed
- `security-identity-linked.html` -> Identity linked
- `security-identity-unlinked.html` -> Identity unlinked
- `security-mfa-added.html` -> MFA method added
- `security-mfa-removed.html` -> MFA method removed

## Supabase variables commonly used

- `{{ .ConfirmationURL }}` action link
- `{{ .Email }}` user email
- `{{ .SiteURL }}` project site URL

Note: Some security templates may expose additional variables depending on Supabase updates.
