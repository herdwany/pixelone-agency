# pixelone-agency

## Quote + Invoice Engine (MVP)

This repository now includes a lightweight Quote (Devis) + Invoice engine integrated with existing orders.

### Added entities

- `pixel_quotes`
- `pixel_invoices`

### Migration files

- `pixelone/supabase/quote-invoice-engine.sql` (incremental migration)
- `pixelone/supabase/schema.sql` (base schema updated)
- `pixelone/supabase/post-setup-rls.sql` (post-setup/RLS updated)
- `pixelone/supabase/verify.sql` (verification checks updated)

### Runtime API facade

Available in browser as:

- `window.pixelOneQuoteInvoiceApi.createQuoteFromOrder(orderId)`
- `window.pixelOneQuoteInvoiceApi.convertQuoteToInvoice(quoteId)`
- `window.pixelOneQuoteInvoiceApi.generateDocumentPDF(type, id)`
- `window.pixelOneQuoteInvoiceApi.buildSecureDocumentUrl(type, id)`

### User flows

- Order creation auto-generates quote.
- Accepted quote can be converted to invoice.
- Admin dashboard includes quote/invoice sections and manual order creation.
- Client dashboard includes My Quotes / My Invoices with secure links and PDF download.

### Notes

- PDF generation is client-side using `jsPDF` loaded on-demand from CDN.
- Secure document links include token + role-based access checks.