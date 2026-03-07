# Page Content JSON

Each HTML page has an Arabic JSON file in this folder.

Examples:

- `index.html` -> `content/index.ar.json`
- `about.html` -> `content/about.ar.json`
- `services.html` -> `content/services.ar.json`

## What to edit

Inside each language JSON file:

- `title`: Browser tab title.
- `metaDescription`: SEO description.
- `texts`: Visible page text entries in order.
- `attributes`: Optional selector-based attribute overrides.

## Important

- Do not rename JSON files.
- Keep the same `texts` array length unless you also change the HTML structure.
- If you changed HTML text structure, regenerate JSON files.
- Use the admin dashboard i18n section to save runtime overrides into Supabase.

## Regenerate command

Run from repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\regenerate-page-content.ps1
```
