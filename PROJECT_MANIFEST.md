# PROJECT MANIFEST: Pixel One Visuals
## Complete Codebase Analysis & Architecture Reference

**Last Updated**: April 24, 2026  
**Project Status**: Production  
**Language**: Arabic Primary (RTL), English Secondary  
**Type**: Full-Stack Digital Agency Website with Quote/Invoice Engine

---

## TABLE OF CONTENTS
1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [File Structure & Organization](#file-structure--organization)
5. [Core Systems & Modules](#core-systems--modules)
6. [Database & Supabase](#database--supabase)
7. [Frontend UI/UX System](#frontend-uiux-system)
8. [Critical Business Flows](#critical-business-flows)
9. [Authentication & Authorization](#authentication--authorization)
10. [Design System & Styling](#design-system--styling)
11. [Responsive Layout & RTL Behavior](#responsive-layout--rtl-behavior)
12. [Performance & SEO](#performance--seo)
13. [Critical Files & Dependencies](#critical-files--dependencies)
14. [Sensitive Areas & Warnings](#sensitive-areas--warnings)
15. [Design Issues & Improvement Opportunities](#design-issues--improvement-opportunities)
16. [Deployment & Configuration](#deployment--configuration)

---

## EXECUTIVE SUMMARY

**Pixel One Visuals** is a premium digital agency website serving clients in Morocco and the Gulf states. It combines:
- **Public-facing website** with service pages, portfolio, and lead generation
- **Full-stack ordering system** with Supabase backend
- **Quote/Invoice engine** for document generation and tracking
- **Dual dashboard system** (client + admin) for order management
- **Multi-language content** (Arabic primary, English metadata, French localization ready)
- **Premium design system** with dark/light theme switching
- **Security-first architecture** with role-based access control (RBAC)

**Core Value Proposition**: Streamlined visual design and content creation services with clear pricing, fast turnaround, and transparent workflows.

---

## TECHNOLOGY STACK

### Frontend
- **Framework**: Vanilla JavaScript (no framework dependencies)
- **CSS**: CSS Grid/Flexbox + Custom Properties
- **Animation**: GSAP 3.12+ (loaded from CDN, optional)
- **UI Framework**: Tailwind CSS (v3, via CDN)
- **Fonts**:
  - **Arabic**: IBM Plex Sans Arabic (Google Fonts)
  - **English Display**: Alexandria (Google Fonts)
  - **Fallback**: Changa (Arabic headline), Caveat (loader)
- **Icons**: Inline SVG (no icon library)
- **Content Loading**: Vanilla fetch API with JSON payloads
- **SEO**: Schema.org structured data (JSON-LD)

### Backend
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Authentication**: Supabase Auth (Email/Password, Google OAuth, Magic Links)
- **API**: Supabase REST API (via supabase-js v2 SDK)
- **Functions**: PostgreSQL triggers for automation
- **File Storage**: Not currently used (document delivery is URL-based)

### Third-Party Integrations
- **PDF Generation**: jsPDF (loaded on-demand from CDN)
- **Webhooks**: Flow Sokt (https://flow.sokt.io/) for automation
- **Search**: Not implemented (static content)
- **Analytics**: Cloudflare Insights (configured in _headers)
- **Email**: Not directly integrated (WhatsApp-primary communication)

### Deployment
- **Host**: Netlify (based on _headers and _redirects configuration)
- **CDN**: Cloudflare (HSTS, CSP, security headers configured)
- **DNS**: Custom domain pixelonevisuals.tech with www redirect
- **HTTPS**: Required (automatic redirect from http://)

---

## PROJECT ARCHITECTURE

### High-Level System Flow

```
┌─────────────────────────────────────────────────────────┐
│         PUBLIC WEBSITE (index, services, etc.)          │
├─────────────────────────────────────────────────────────┤
│  Order Flow:                                            │
│  Service Card → Order Modal → Submit → Webhook → DB    │
└─────────────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────────────┐
│    AUTHENTICATION (Login / Client-Login / Signup)       │
│    - Supabase Auth (Email/Password/Google)              │
│    - Role Detection (Client / Admin)                    │
└─────────────────────────────────────────────────────────┘
            ↓
┌────────────────┬──────────────────┐
│  CLIENT DASH   │   ADMIN DASH     │
├────────────────┼──────────────────┤
│ My Orders      │ Create Quotes    │
│ My Quotes      │ Create Invoices  │
│ My Invoices    │ Manage Discounts │
│ My Profile     │ Invite Users     │
│ PDF Download   │ Dispute Handling │
└────────────────┴──────────────────┘
            ↓
┌─────────────────────────────────────────────────────────┐
│     SUPABASE DATABASE & RLS SECURITY                    │
│  - pixel_orders / pixel_quotes / pixel_invoices         │
│  - pixel_admin_users / pixel_user_signups               │
│  - pixel_services / pixel_portfolio_items               │
│  - pixel_discounts_* / pixel_disputes                   │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Vanilla JS + Supabase**: No framework overhead, direct API calls
2. **Client-side PDF generation**: Reduces server load, instant downloads
3. **Content from JSON files**: Static Arabic translation, loaded on demand
4. **Email-based RBAC**: Admin role detected from `pixel_admin_users` table
5. **Fallback to localStorage**: Works when Supabase is unreachable
6. **RTL-first CSS**: All layouts optimized for Arabic, English as secondary

---

## FILE STRUCTURE & ORGANIZATION

### Root Directory
```
pixelone-agency/
├── pixelone/                      # Main website root
│   ├── index.html                 # Homepage (hero + services + portfolio)
│   ├── services.html              # Services listing page
│   ├── service-*.html             # Service detail pages (11 pages)
│   ├── about.html                 # About/Brand page
│   ├── how-we-work.html           # Process/Workflow page
│   ├── client-login.html          # Client login redirect
│   ├── login.html                 # Main auth page
│   ├── auth-callback.html         # OAuth callback handler
│   ├── dashboard.html             # Client dashboard
│   ├── admin-dashboard.html       # Admin dashboard
│   ├── privacy-policy.html        # Legal page
│   ├── refund-policy.html         # Legal page
│   ├── terms-of-service.html      # Legal page
│   │
│   ├── style.css                  # Base styling (2400+ lines)
│   ├── premium-refresh.css        # Enhanced styling (1400+ lines)
│   ├── tw.min.css                 # Tailwind cache (minified)
│   │
│   ├── app.js                     # Main app logic (2000+ lines)
│   ├── page-text-loader.js        # Arabic text injection
│   ├── portfolio-content-loader.js# Portfolio section texting
│   ├── visual-system.js           # Theme switching + GSAP loader
│   │
│   ├── site-settings.json         # Brand/contact configuration
│   ├── robots.txt                 # SEO configuration
│   ├── sitemap.xml                # SEO configuration
│   ├── _headers                   # Netlify/security headers
│   ├── _redirects                 # URL redirects
│   │
│   ├── content/                   # Multilingual JSON content
│   │   ├── index.ar.json          # Home page text
│   │   ├── services.ar.json       # Services page text
│   │   ├── dashboard.ar.json      # Dashboard UI text
│   │   ├── service-*.ar.json      # Service detail texts
│   │   └── ... (23 total JSON files)
│   │
│   ├── supabase/                  # Database schema & functions
│   │   ├── schema.sql             # Main database schema
│   │   ├── quote-invoice-engine.sql
│   │   ├── post-setup-rls.sql
│   │   ├── security-hardening.sql
│   │   ├── verify.sql
│   │   ├── i18n.sql
│   │   ├── add-phone-column.sql
│   │   ├── update-services-arabic.sql
│   │   └── email-templates/       # Email template configs
│   │
│   ├── icone/                     # Favicon assets
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── favicon-96x96.png
│   │   ├── apple-touch-icon.png
│   │   └── site.webmanifest
│   │
│   ├── og/                        # OG image assets (empty folder)
│   │
│   ├── barbershop/                # Demo: Barbershop site
│   ├── car/                       # Demo: Car agency site
│   ├── food/                      # Demo: Restaurant site
│   ├── Medical/                   # Demo: Medical site
│   ├── Property/                  # Demo: Real estate site
│   │
│   └── google73c643ad179fa5b1.html# Google verification file
│
├── scripts/                       # Utility scripts
│   └── regenerate-page-content.ps1  # PowerShell: Regenerate content
│
├── temp_scripts/                  # Temporary development scripts
│   ├── update_copy.js
│   ├── update_services.js
│   └── tw-input.css
│
├── README.md                      # Project overview
├── RELEASE_VISUAL_CHECKLIST.md   # QA checklist
├── CNAME                          # DNS configuration
├── lh.json, lh2.json, lh3.json   # Lighthouse reports (failed)
└── PROJECT_MANIFEST.md           # This file
```

### Page Hierarchy
```
PUBLIC PAGES (indexed):
├── index.html              (Homepage - entry point)
├── services.html           (Service catalog)
├── service-*.html          (Service details - 11 pages)
├── about.html              (Brand story)
├── how-we-work.html        (Process)
├── privacy-policy.html
├── refund-policy.html
├── terms-of-service.html

AUTHENTICATION PAGES (noindex):
├── login.html              (Main login page)
├── client-login.html       (Redirect to login)
├── auth-callback.html      (OAuth handler)

PROTECTED PAGES (noindex):
├── dashboard.html          (Client dashboard)
├── admin-dashboard.html    (Admin dashboard)

DEMO/PORTFOLIO PAGES:
├── /barbershop/index.html
├── /car/index.html
├── /food/index.html
├── /Medical/index.html
├── /Property/index.html
```

---

## CORE SYSTEMS & MODULES

### 1. Supabase Integration (`app.js` - main orchestrator)
- **Configuration**: Runtime-injected Supabase URL/Key
- **Client**: `window._supabase` (global Supabase client)
- **Fallback**: localStorage when database unavailable
- **Key exports**: Functions for orders, quotes, invoices, discounts

### 2. Order Management System
**Constants**:
- `ORDER_STATUS_OPTIONS`: ['تم استلام الطلب', 'مقبول', 'يحتاج تعديلات', 'قيد التنفيذ', 'مكتمل']
- `ORDER_STORAGE_FALLBACK_KEY`: 'pixelone_orders_v1'

**Flow**:
1. User selects service from homepage
2. Order modal opens with service details
3. User fills name, phone, email, project details
4. Submit → validation → creates order in DB
5. Webhook triggered (Flow Sokt)
6. User receives WhatsApp message with order details

### 3. Quote/Invoice Engine
**Tables**:
- `pixel_quotes`: Generated from orders, tracks status (draft→sent→accepted→converted)
- `pixel_invoices`: Generated from accepted quotes, tracks payment

**Workflow**:
1. Order created → Auto-generates quote (if enabled)
2. Admin can view/edit quote in admin dashboard
3. Send quote to client
4. Client accepts quote → Converts to invoice
5. Invoice tracked for payment

**Available at**: 
```javascript
window.pixelOneQuoteInvoiceApi.createQuoteFromOrder(orderId)
window.pixelOneQuoteInvoiceApi.convertQuoteToInvoice(quoteId)
window.pixelOneQuoteInvoiceApi.generateDocumentPDF(type, id)
window.pixelOneQuoteInvoiceApi.buildSecureDocumentUrl(type, id)
```

### 4. Authentication System
**Types**:
- Email/Password (Supabase Auth)
- Google OAuth (via Supabase)
- Magic Links (email-based passwordless)

**Role Detection**:
```javascript
const isAdmin = await _supabase.rpc('is_admin_email');
```

**Session Persistence**:
- Post-auth redirect stored in localStorage (`pixelone_post_auth_redirect_v1`)
- Pending order intent stored (`pixelone_pending_order_intent_v1`)

### 5. Discount System
**Global Discount**: Single active code (percent or fixed)
**Customer Discounts**: Per-customer rules in `pixel_discounts_customer`

**Configuration in site-settings.json**:
```json
{
  "discounts": {
    "global": {
      "enabled": false,
      "code": "",
      "type": "percent",
      "value": 0,
      "endsAt": ""
    }
  }
}
```

### 6. Admin Invite System
- Allows admins to invite new users
- Invitation logged in `pixel_invite_audit` table
- Role-based: client or admin
- Email sent via Edge Function

### 7. Multilingual Content System
**Supported Languages**: Arabic (ar) - English metadata
**Storage**: JSON files in `/content/*.ar.json`
**Loading**: `page-text-loader.js` fetches and injects text

**Key Files**:
- `index.ar.json`: Homepage text
- `services.ar.json`: Services page text
- `service-*.ar.json`: Service detail pages
- `dashboard.ar.json`: Dashboard UI labels
- `admin-dashboard.ar.json`: Admin dashboard labels

### 8. Portfolio System
**Tables**: `pixel_portfolio_items`
**Types**:
- Web projects (link to /car, /barbershop, /food, etc.)
- Design showcases (link to service pages)
- Video previews
- CTA cards

**Loaded from**:
- Database (primary) OR
- Fallback array in `app.js` (DEFAULT_PORTFOLIO_ITEMS)

### 9. Services Management
**Table**: `pixel_services`
**Properties per service**:
- id, title_ar, description_ar, price
- category, is_coming_soon, popularity, enabled
- Service routing via `SERVICE_DETAIL_ROUTES` map

**Default Services** (11 total):
1. Social Media Post (30 MAD)
2. Logo Design (80 MAD)
3. Digital Banner (50 MAD)
4. Presentation (150 MAD)
5. Short Video (60 MAD)
6. Monthly Content Package (450 MAD)
7. Brand Identity (300 MAD) - Coming Soon
8. Professional Design (for custom)
9. Short Videos Premium
10. Advanced Promo Video
11. Web Landing Page

---

## DATABASE & SUPABASE

### Core Tables (12 total)

#### 1. `pixel_services`
```sql
id TEXT PRIMARY KEY
title_ar TEXT NOT NULL
description_ar TEXT
price TEXT
category TEXT
is_coming_soon BOOLEAN
popularity INTEGER
enabled BOOLEAN
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 2. `pixel_orders`
```sql
id TEXT PRIMARY KEY (format: PO-XXXXXX)
service_name TEXT
customer_name TEXT
customer_phone TEXT
customer_email TEXT
specs TEXT
status TEXT (validated against ORDER_STATUS_OPTIONS)
final_price TEXT
discount_code TEXT
user_id UUID (references auth.users)
user_email TEXT
created_at TIMESTAMPTZ
last_update_at TIMESTAMPTZ
support_email TEXT
```

#### 3. `pixel_quotes`
```sql
id UUID PRIMARY KEY
order_id TEXT FK → pixel_orders
quote_number TEXT UNIQUE
status TEXT ('draft'|'sent'|'accepted'|'rejected'|'expired'|'converted')
subtotal NUMERIC(12,2)
discount_value NUMERIC(12,2)
total NUMERIC(12,2)
currency TEXT ('MAD')
valid_until TIMESTAMPTZ
notes TEXT
created_at TIMESTAMPTZ
```

#### 4. `pixel_invoices`
```sql
id UUID PRIMARY KEY
order_id TEXT FK → pixel_orders
quote_id UUID FK → pixel_quotes
invoice_number TEXT UNIQUE
status TEXT ('unpaid'|'paid'|'cancelled')
total NUMERIC(12,2)
issued_at TIMESTAMPTZ
due_date TIMESTAMPTZ
created_at TIMESTAMPTZ
```

#### 5. `pixel_portfolio_items`
```sql
id TEXT PRIMARY KEY
title_ar TEXT
description_ar TEXT
category TEXT ('web'|'design'|'video'|'custom')
card_style TEXT ('standard'|'cta')
media_type TEXT ('image'|'placeholder')
image_url TEXT
badge_text_ar TEXT
action_type TEXT ('external_link'|'internal_link'|'open_order_modal')
action_label_ar TEXT
action_url TEXT
sort_order INTEGER
enabled BOOLEAN
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 6. `pixel_offers`
```sql
id TEXT PRIMARY KEY
title TEXT
description TEXT
badge TEXT
target TEXT ('all'|'customer')
target_email TEXT
enabled BOOLEAN
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 7. `pixel_admin_users`
```sql
email TEXT PRIMARY KEY
created_at TIMESTAMPTZ
```

#### 8. `pixel_user_signups`
```sql
auth_user_id UUID PRIMARY KEY FK → auth.users
full_name TEXT
email TEXT
phone TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 9. `pixel_disputes`
```sql
id TEXT PRIMARY KEY
order_id TEXT
client_email TEXT
amount NUMERIC(12,2)
currency TEXT ('MAD')
channel TEXT ('whatsapp'|'email'|'other')
status TEXT ('open'|'resolved'|'closed')
reason TEXT
notes TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 10. `pixel_discounts_global`
```sql
id TEXT PRIMARY KEY
enabled BOOLEAN
code TEXT
discount_type TEXT ('percent'|'fixed')
discount_value NUMERIC(12,2)
ends_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

#### 11. `pixel_discounts_customer`
```sql
id TEXT PRIMARY KEY
customer_email TEXT
code TEXT
discount_type TEXT
discount_value NUMERIC(12,2)
expires_at TIMESTAMPTZ
created_at TIMESTAMPTZ
```

#### 12. `pixel_invite_audit`
```sql
id TEXT PRIMARY KEY
invited_by_email TEXT
invited_email TEXT
role TEXT
created_at TIMESTAMPTZ
status TEXT ('pending'|'accepted'|'declined')
```

#### Additional: `pixel_i18n_pages`
For managing translated page content in database (optional, currently uses JSON files).

### Row-Level Security (RLS)
**Applied to all tables**:
- Clients can only view/modify their own orders, quotes, invoices
- Admins can view/modify all data
- Inserts are restricted by email validation

**Key RLS Functions**:
- `is_admin_email()`: Checks if current user is admin
- `auth.jwt()`: Gets current user email from JWT

### Triggers & Automation
1. `trg_auth_users_sync_pixel_signup`: Syncs Supabase Auth users to `pixel_user_signups`
2. `set_updated_at`: Updates timestamp on every modification

---

## FRONTEND UI/UX SYSTEM

### Visual Design Philosophy
**Theme**: Premium Dark + Optional Light Mode
**Mood**: Obsidian luxury with vibrant red accents
**Target**: Professional agencies in Morocco/Gulf
**Language**: Arabic-first, English-secondary

### Color System
**Dark Mode** (default):
- Background: #060606 (obsidian black)
- Surface: #0C0C0C → #181818 (nested depths)
- Primary: #D91A1A (vivid red)
- Primary Hover: #EF3333 (lighter red)
- Text: #FFFFFF (pure white)
- Text Secondary: rgba(242, 242, 243, 0.7) (soft white)
- Borders: rgba(255, 255, 255, 0.05-0.14) (subtle to medium)

**Light Mode** (if enabled):
- Background: #F4F4F5 (light gray)
- Surface: #FFFFFF (white)
- Primary: #B51C1C (darker red for contrast)
- Text: #121214 (dark gray)
- Borders: rgba(10, 10, 12, 0.1-0.16)

### Typography System
**Font Stack**:
- **Arabic**: IBM Plex Sans Arabic (primary body)
- **English**: Alexandria (display) + Changa (fallback)
- **Fallback**: System fonts

**Scale** (CSS custom properties):
```css
--text-h1: clamp(1.92rem, 4vw, 2.35rem)
--text-h2: clamp(1.32rem, 2.15vw, 1.6rem)
--text-h3: clamp(1.06rem, 1.44vw, 1.18rem)
--text-body: 0.98rem
```

**Line Heights**:
- Headings: 1.21
- Body: 1.85
- Global: 1.6

### Spacing System
**CSS Custom Properties**:
```css
--sp-8: 0.5rem
--sp-12: 0.75rem
--sp-16: 1rem
--sp-24: 1.5rem
--sp-32: 2rem
--sp-48: 3rem
--sp-64: 4rem
```

**Mobile-first Padding**:
```css
body {
  padding-inline: var(--sp-12);   /* 0.75rem */
}
@media (min-width: 600px) {
  padding-inline: var(--sp-24);   /* 1.5rem */
}
@media (min-width: 1024px) {
  padding-inline: var(--sp-48);   /* 3rem */
}
```

### Component Design
**Buttons**:
- Primary: `.btn-filled-red` (red background, white text)
- Secondary: Glass effect with borders
- States: hover (scale +2px, glow), active (opacity), focus-visible (ring)
- Sizes: sm (px-3 py-2), md (px-5 py-3), lg (px-6 py-4)

**Cards**:
- `.water-card`: Glassmorphic effect (backdrop blur + border)
- Padding: 1.5rem to 2.5rem
- Border-radius: 1.125rem to 1.65rem
- Box-shadow: `0 24px 64px rgba(0,0,0,0.45)`

**Forms**:
- `.input-luxury`: Full-width input with glass effect
- Focus: Red ring (ring-2 ring-brand-red/50)
- Validation: Green checkmarks, red error messages
- Select: Styled with same glass effect

**Navigation**:
- Navbar glass effect with blur
- Logo: Large "P" with Pixel One text
- Mobile: Hamburger menu with slide-out panel
- Sticky: On scroll (can be disabled with class)

**Modal**:
- Full-screen overlay with blur backdrop
- Center-aligned, max-width: 42rem
- Close button (✕) top-right
- Z-index: 2000

### Animation System
**GSAP Animations** (loaded on demand):
- ScrollTrigger for revealing on scroll
- Staggered animations for lists
- Parallax effects (optional)

**Native CSS Animations**:
- Fade-up: `@keyframes fadeUp` (opacity 0→1, translateY 2rem→0)
- Fade-in: Simple opacity transition
- Pulse: Breathing effect for active elements
- Duration: 0.28s to 0.5s (--transition-normal, --transition-smooth)
- Easing: ease, cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Accessibility
- Focus rings visible on all interactive elements
- Skip link at top: `.skip-link`
- ARIA labels on buttons, inputs, modals
- `aria-live` regions for status messages
- Color contrast maintained (WCAG AA)
- Keyboard-only navigation supported

---

## CRITICAL BUSINESS FLOWS

### 1. Order Creation Flow
```
User on Service Page
    ↓
Click "اطلب الآن" (Order Now)
    ↓
Order Modal Opens
    ├─ Service name pre-filled
    ├─ Price displayed
    └─ Discount code option
    ↓
User fills form:
  - Full name
  - WhatsApp number
  - Project name
  - Specifications (optional)
  - Email
    ↓
Validation:
  - Email required
  - Phone required
  - Name required
    ↓
On Submit:
  - Order created in DB
  - Status: "تم استلام الطلب" (received)
  - Webhook triggered → Flow Sokt
  - WhatsApp message sent to user
  - Success message shown
    ↓
Post-Order:
  - User can track order
  - Admin receives notification
  - Quote can be generated
```

### 2. Authentication Flow (Client)
```
User on Login Page
    ↓
Choose method:
  A) Email/Password
  B) Google OAuth
  C) Magic Link
    ↓
Credentials sent to Supabase Auth
    ↓
Validation:
  - Email must exist in auth.users
  - Check pixel_admin_users → NOT admin
    ↓
Session created:
  - JWT stored in localStorage
  - Session token set
    ↓
Page redirects to:
  - Saved destination OR
  - /dashboard.html
    ↓
Dashboard loads:
  - Fetch user's orders, quotes, invoices
  - Display in tables
  - Allow profile updates
```

### 3. Admin Authentication Flow
```
User attempts login
    ↓
Credentials validated against auth.users
    ↓
Check: is_admin_email() function
    ↓
If ADMIN:
  - Redirect to admin-dashboard.html
  - Load all orders (not filtered)
  - Show admin controls:
    - Create quotes
    - Create invoices
    - Manage discounts
    - Invite new users
    ↓
If NOT ADMIN:
  - Treated as client
  - Redirect to dashboard.html
  - Filter to own orders only
```

### 4. Quote Generation & PDF Flow
```
Admin in admin dashboard
    ↓
Select order
    ↓
Click "Create Quote"
    ↓
Quote created in DB:
  - Status: "draft"
  - Assigned quote number (QT-XXXXX)
  - Price calculated
    ↓
Admin can:
  - Edit quote details
  - Add notes
  - Set expiration date
    ↓
Admin clicks "Send Quote"
    ↓
Quote status → "sent"
    ↓
Client receives notification
    ↓
Client in dashboard:
  - Views quote
  - Downloads PDF (client-side jsPDF)
  - Accepts or rejects
    ↓
If ACCEPTED:
  - Quote status → "accepted"
  - Invoice created
  - Status → "unpaid"
  - Secure link generated
```

### 5. Discount Application Flow
```
Global discount configured in DB
    ↓
User enters code at checkout
    ↓
Validation:
  - Code matches
  - Discount enabled
  - Not expired
    ↓
If valid:
  - Calculate discount amount (percent or fixed)
  - Update final_price in order
  - Display new total
    ↓
Customer-specific discounts:
  - Checked by email
  - Applied automatically if no global code
```

### 6. Dispute Resolution Flow
```
Client creates dispute (if applicable)
    ↓
Filed in pixel_disputes table:
  - order_id
  - client_email
  - amount
  - reason
  - channel (WhatsApp/Email/Other)
    ↓
Status: "open"
    ↓
Admin notified
    ↓
Admin can:
  - Review dispute
  - Add notes
  - Update status → "resolved" or "closed"
    ↓
Client notified of resolution
```

---

## AUTHENTICATION & AUTHORIZATION

### Supabase Auth Configuration
- **URL**: https://grdjidvagrxavuwykqjf.supabase.co
- **Publishable Key**: sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS
- **Session**: JWT in localStorage (`sb-{project-id}-auth-token`)

### User Roles
**Role 1: Client**
- Can view own orders
- Can download own quotes/invoices
- Can update profile (phone, password)
- Cannot manage other clients' data
- Cannot create or edit quotes

**Role 2: Admin**
- Can view ALL orders
- Can create/edit quotes
- Can create/edit invoices
- Can manage discounts
- Can invite new users
- Can view audit logs
- Detected by email in `pixel_admin_users` table

### Admin Email List (from site-settings.json)
```json
"adminEmails": [
  "superadmin@pixelonevisuals.tech",
  "support@pixelonevisuals.tech",
  "contact@pixelonevisuals.tech"
]
```

### Session Management
- **Login Page**: `/login.html` (main entry)
- **Client Login Redirect**: `/client-login.html` (redirects to /login.html)
- **OAuth Callback**: `/auth-callback.html` (handles Google OAuth redirect)
- **Post-Auth Redirect**: Stored in localStorage key `pixelone_post_auth_redirect_v1`
- **Logout**: Clears session, redirects to index.html

### Password Security
- Handled by Supabase Auth (bcrypt, no plain text stored)
- Recovery: Email-based password reset link
- MFA: Can be enabled in Supabase dashboard

---

## DESIGN SYSTEM & STYLING

### CSS Architecture
**File 1: `style.css` (2400+ lines)**
- All semantic HTML styling
- Dark/light theme variables
- Component classes (.btn-filled-red, .water-card, .input-luxury, etc.)
- Grid/Flexbox layouts
- Responsive breakpoints

**File 2: `premium-refresh.css` (1400+ lines)**
- Enhanced styling for premium appearance
- Additional animations
- Optional luxury effects (can be disabled)
- More aggressive use of gradients/effects

**File 3: `tw.min.css` (Tailwind)**
- Utility classes for quick adjustments
- Loaded from Tailwind CDN
- Used alongside custom CSS (no conflicts)

### Theme Switching
**Mechanism**:
```html
<html data-site-theme="dark">  <!-- or "light" -->
```

**Implementation**:
- `visual-system.js` detects OS preference (`prefers-color-scheme`)
- Stored in localStorage: `pixelone-site-theme`
- Applied immediately on page load

**CSS Variables by Theme**:
- Dark mode: 60+ custom properties
- Light mode: Same properties, different values

### Responsive Breakpoints
```css
/* Mobile-first */
320px - Base styles (all)
600px - Tablet small
768px - Tablet medium
820px - iPad
1024px - Desktop
1440px - Large desktop
1920px - XL screens
```

**Key breakpoints in code**:
- `hidden md:flex` → Hidden on mobile, visible on desktop
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` → Responsive grids
- `px-6 md:px-8 lg:px-12` → Responsive padding

### RTL Behavior
**HTML attribute**: `dir="rtl"` on `<html>`
**CSS tweaks**:
- `inset-inline-start` instead of `left`
- `inset-inline-end` instead of `right`
- `padding-inline` instead of `padding-left/right`
- `margin-inline` instead of `margin-left/right`
- `text-align: end` for RTL text

**Flexbox RTL**:
- `flex-row-reverse` used where needed
- Gap still works correctly

**Grid RTL**:
- Auto-reverse columns not needed (CSS Grid handles RTL)
- `grid-auto-flow: dense` may need adjustment

### Critical Classes (Must Not Break)
```css
.btn-filled-red         /* Primary CTA button */
.water-card             /* Glassmorphic card */
.input-luxury           /* Form input styling */
.navbar-glass           /* Navigation bar */
.modal-overlay          /* Modal backdrop */
.page-hero              /* Hero section */
.dashboard-layout       /* Dashboard wrapper */
.animate-fade-up        /* Entry animation */
.surface-card           /* Secondary card */
.dashboard-nav          /* Dashboard navigation */
.global-home-btn        /* Floating home button */
```

### Dangerous Modifications (Can Break Layout)
- Changing `--sp-*` spacing variables → affects entire layout
- Modifying `.page-frame` padding → breaks page centering
- Changing `body padding-inline` → affects mobile UX
- Modifying `@media (min-width: ...)` breakpoints → breaks responsive
- Changing flexbox `flex-row-reverse` → breaks RTL

---

## RESPONSIVE LAYOUT & RTL BEHAVIOR

### Mobile Layout (320px - 600px)
- Single column layout
- Large touch targets (48px minimum)
- Hamburger menu for navigation
- Stacked form inputs
- Bottom FAB for home button
- Safe area insets for notches

### Tablet Layout (600px - 1024px)
- Two-column grid for some sections
- Sidebar navigation optional
- Form inputs in 2-column grid (if space)
- Medium padding (1.5rem)

### Desktop Layout (1024px+)
- Three-column+ layouts
- Horizontal navigation bar
- Wide form layouts
- Large padding (2rem-3rem)
- Fixed navigation sidebar (optional)

### RTL-Specific Considerations
1. **Text Direction**: All Arabic text should be `dir="rtl"`
2. **Icons**: Check if SVG needs mirroring (usually no)
3. **Lists**: Numbers should be on right (auto in RTL)
4. **Buttons**: Icon + text alignment (icon on right in RTL)
5. **Modals**: Close button on left (visual LTR habit)
6. **Forms**: Labels align right, inputs full-width

### Safe Area Support
```css
.global-home-btn {
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
}
```
Used for iPhone notch/home indicator compatibility.

---

## PERFORMANCE & SEO

### Performance Optimizations
1. **CSS minified**: Both style.css and premium-refresh.css
2. **Fonts preconnected**: `link rel="preconnect" href="https://fonts.googleapis.com"`
3. **Lazy loading**: Images via `loading="lazy"`
4. **GSAP on-demand**: Only loaded when needed
5. **jsPDF on-demand**: Loaded only for PDF generation
6. **No framework overhead**: Pure vanilla JS
7. **Caching headers**: Set in `_headers` file (300s for robots.txt, etc.)

### SEO Implementation
**Meta Tags** (all pages):
- `<title>` (50-60 chars, Arabic/English mix)
- `<meta name="description">` (150-160 chars)
- `<meta name="robots">` content="index, follow" (or noindex for protected pages)
- Canonical URL (absolute)
- OG tags (title, description, image, URL)
- Twitter Card tags
- Theme color meta tag

**Schema.org Structured Data**:
- Organization schema on homepage
- Service schema on services.html
- BreadcrumbList (optional)
- JSON-LD format (embedded in HTML)

**Sitemap & Robots**:
- `sitemap.xml`: Lists all public pages
- `robots.txt`: Allows all, points to sitemap
- Cache: 300 seconds (5 min revalidate)

**OG Images**:
- 1200x630px PNG format
- One image per service type
- Stored in `/og/` directory
- Absolute URLs in meta tags

### SEO Issues Found
- Lighthouse reports failed (local server issue, not production)
- Some pages might not be discoverable yet (new site)
- No backlinks established (external SEO needed)
- Mobile-friendliness: Looks good, needs testing

---

## CRITICAL FILES & DEPENDENCIES

### MUST NOT BREAK (Core Functionality)

| File | Impact | Why |
|------|--------|-----|
| `app.js` | CRITICAL | Main app orchestrator - all business logic |
| `style.css` | CRITICAL | Base styling for all pages |
| `premium-refresh.css` | CRITICAL | Enhanced styling - if removed, site loses premium look |
| `supabase/schema.sql` | CRITICAL | Database schema - production data |
| `visual-system.js` | HIGH | Theme switching, dark/light mode |
| `page-text-loader.js` | HIGH | Arabic text injection system |
| `index.html` | CRITICAL | Homepage - entry point for 80% of traffic |
| `services.html` | HIGH | Services catalog - conversion page |
| `dashboard.html` | CRITICAL | Client access - business critical |
| `admin-dashboard.html` | CRITICAL | Admin operations - revenue critical |
| `login.html` | CRITICAL | Authentication gateway |

### DEPENDENCIES (External)

```html
<!-- Must be loaded, in order -->
<script src="https://cdn.tailwindcss.com" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" defer></script>

<!-- Optional but recommended -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- On-demand for PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>

<!-- Fonts (critical) -->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Alexandria:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Safe to Modify
```
✓ Demo site HTML files (/barbershop, /car, /food, etc.)
✓ Portfolio item configurations
✓ Service descriptions
✓ Content JSON files (*.ar.json)
✓ Site settings (site-settings.json)
✓ Favicon images
✓ OG images
✓ Temporary scripts in /temp_scripts
```

### Sensitive Areas (Requires Testing)
```
⚠ Database schema changes
⚠ Authentication flow modifications
⚠ Order status workflow changes
⚠ Pricing calculations
⚠ PDF generation logic
⚠ Admin dashboard permissions
⚠ Responsive breakpoints
⚠ RTL CSS tweaks
```

---

## SENSITIVE AREAS & WARNINGS

### 🚨 DO NOT MODIFY WITHOUT BACKUP
1. **Supabase RLS policies**: If changed incorrectly, data becomes inaccessible
2. **Order ID generation**: Currently uses custom format (PO-XXXXX) - changing breaks existing orders
3. **Quote/Invoice status enums**: Hardcoded in multiple places - sync required
4. **Admin email list**: Site-settings.json - changing affects access
5. **Service pricing**: Changes affect all quotes calculated after modification
6. **Discount calculation logic**: Double-check math - revenue-affecting
7. **WhatsApp number**: Site-settings.json - affects order notifications

### ⚠️ TESTING REQUIRED BEFORE PRODUCTION
- Any dashboard logic change
- Authentication flow modification
- Quote/invoice generation changes
- RLS policy updates
- Theme or responsive layout changes
- Mobile layout on actual devices (not just browser DevTools)
- RTL layout in real browsers (not just Chrome RTL mode)
- Admin user invitation flow
- Discount code application

### 🔒 PRODUCTION SAFEGUARDS
- All admin operations logged to `pixel_invite_audit` table
- Orders immutable after creation (only status updated)
- Quotes versioned (each change creates new row)
- Disputes tracked separately (not order modifications)
- User permissions checked on every DB call
- HTTPS enforced (redirect in _redirects)
- CSP headers configured (in _headers)

---

## DESIGN ISSUES & IMPROVEMENT OPPORTUNITIES

### Current Design Strengths
✅ **Premium Dark Theme**: Professional, cohesive, modern  
✅ **RTL-First CSS**: Proper right-to-left support throughout  
✅ **Responsive Mobile**: Works well on small screens  
✅ **Typography Hierarchy**: Clear H1/H2/H3 scale  
✅ **Glassmorphism**: Modern aesthetic, well-implemented  
✅ **Accessibility**: Focus rings, skip links, ARIA labels  
✅ **Fast Performance**: No framework overhead  

### Design Issues Found

#### 1. **Typography Oversizing on Desktop**
- **Issue**: H1 uses `clamp(1.92rem, 4vw, 2.35rem)` - at 1920px gets too large
- **Impact**: Hero text wraps awkwardly, looks unpolished
- **Fix**: Reduce max to `2rem`, adjust vw to `3vw`
- **Location**: `premium-refresh.css` lines ~60-65

#### 2. **Hero Section Spacing Imbalance**
- **Issue**: Top padding 4rem, bottom 2rem - asymmetric
- **Impact**: Section looks bottom-heavy on desktop
- **Fix**: Balance to 3rem both top/bottom
- **Location**: `style.css` `.page-hero` class

#### 3. **Mobile Button Text Cutoff**
- **Issue**: CTA buttons in order modal might be cut off on 320px screens
- **Impact**: "تأكيد وإرسال الطلب الآن" (22 chars) wraps to 2 lines, looks cramped
- **Fix**: Reduce padding, use smaller font at breakpoint 320px
- **Location**: `.btn-filled-red` class

#### 4. **Card Inconsistent Padding**
- **Issue**: Some cards use `p-4`, others `p-6`, others `p-8` - no system
- **Impact**: Layout looks scattered, hard to maintain
- **Fix**: Adopt spacing system: all service cards → `p-6` (1.5rem)
- **Location**: All `.water-card` instances in HTML

#### 5. **Form Labels Missing Consistency**
- **Issue**: Some labels are bold, others not; color varies
- **Impact**: Form hierarchy unclear, especially on mobile
- **Fix**: Create `.form-label` class with consistent styling
- **Location**: All `<label>` tags in modals/forms

#### 6. **Modal Z-Index Conflict**
- **Issue**: Modal z-index is 2000, but navbar might be higher in some cases
- **Impact**: On scroll, navbar can appear above modal
- **Fix**: Ensure modal is highest: z-index 9999
- **Location**: `.modal-overlay` in `style.css`

#### 7. **Color Contrast Issues in Light Mode**
- **Issue**: Light mode text on light background might be hard to read
- **Impact**: Accessibility failure on WCAG AA
- **Fix**: Test color ratios, increase contrast values
- **Location**: Light mode color vars in `premium-refresh.css`

#### 8. **Inconsistent Border Radius**
- **Issue**: Cards use `rounded-2xl` (1.125rem), buttons `rounded-lg` (0.5rem)
- **Impact**: Inconsistent brand feel
- **Fix**: Standardize to 1.125rem for all components
- **Location**: Multiple HTML files

#### 9. **Dashboard Table Mobile UX**
- **Issue**: Tables on mobile show "no scrollbar" class but overflow hidden
- **Impact**: Data on right is cut off, users can't see all fields
- **Fix**: Switch to horizontal scroll with gradient fade on mobile
- **Location**: `dashboard.html` table structure

#### 10. **Logo "P" Size Inconsistency**
- **Issue**: Logo "P" is `text-3xl` (1.875rem) in nav, but `text-2xl` (1.5rem) on some pages
- **Impact**: Brand inconsistency across site
- **Fix**: Create `.logo-p` class with fixed size
- **Location**: All navbar sections

### Opportunities for Enhancement

#### 1. **Animations** ⭐
- Currently only fade-up on load
- **Add**: Hover animations on cards (scale + shadow)
- **Add**: Scroll-triggered reveals (GSAP ScrollTrigger)
- **Add**: Button hover states (pulse effect on red buttons)
- **Impact**: Increases perceived polish and interactivity

#### 2. **Dark/Light Mode Toggle** ⭐
- Theme switching exists but no UI toggle button
- **Add**: Theme switcher button in navbar (sun/moon icon)
- **Add**: Smooth transition between themes
- **Add**: Persist preference to localStorage
- **Impact**: Better UX, accessibility for users with light preference

#### 3. **Skeleton Loading States** ⭐
- Currently shows placeholder text while loading
- **Add**: Skeleton screens for dashboard tables
- **Add**: Gradient animation during load
- **Impact**: Perceived performance improvement

#### 4. **Search/Filter** ⭐
- Dashboard has no way to find old orders
- **Add**: Search by order ID in dashboard
- **Add**: Filter by status, date range
- **Impact**: Better UX for power users with many orders

#### 5. **Breadcrumbs** ⭐
- Service pages don't show navigation path
- **Add**: Home > Services > Logo Design breadcrumb
- **Add**: Functional navigation via breadcrumbs
- **Impact**: Better SiteNav structure, improved UX

#### 6. **Toast Notifications** ⭐
- Currently shows messages in a box, disappears slow
- **Add**: Slide-in toast notifications (top-right)
- **Add**: Auto-dismiss after 4 seconds
- **Add**: Different colors for success/error/info
- **Impact**: Modern UX, better feedback

#### 7. **Print-Friendly CSS** ⭐
- PDF generation works but print styles don't
- **Add**: `@media print` styles
- **Add**: Hide navigation, buttons for print
- **Add**: Optimize colors for print
- **Impact**: Users can print quotes/invoices directly

#### 8. **Accessibility Improvements**
- **Add**: Focus indicators more visible
- **Add**: Reduced motion support (@prefers-reduced-motion)
- **Add**: High contrast mode detection
- **Impact**: WCAG AAA compliance

#### 9. **Performance Optimization**
- **Add**: Image lazy loading (already present, verify)
- **Add**: Service Worker for offline fallback
- **Add**: Progressive Web App (PWA) support
- **Add**: Gzip compression (check _headers)
- **Impact**: Faster loads, offline functionality

#### 10. **Mobile Navigation Improvement**
- **Add**: Swipe gesture to close mobile menu
- **Add**: Smooth scroll animation
- **Add**: Active link highlighting
- **Impact**: Better mobile UX

---

## DEPLOYMENT & CONFIGURATION

### Hosting Platform
**Netlify** (verified by _redirects, _headers files)
- Automatic deployment on git push
- SSL/HTTPS enforced
- CDN edge caching
- Redirect rules configured

### Environment Configuration

**Supabase Runtime Injection**:
```javascript
const runtimeSupabaseConfig = window.__PIXELONE_SUPABASE__ || {};
const SUPABASE_URL = runtimeSupabaseConfig.url || 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = runtimeSupabaseConfig.publishableKey || '...';
```

This allows overriding Supabase credentials without code changes.

### DNS Configuration
**File**: `CNAME` (contains: `pixelonevisuals.tech`)

**Redirect Rules**:
```
http://pixelonevisuals.tech/* → https://www.pixelonevisuals.tech/:splat (301)
https://pixelonevisuals.tech/* → https://www.pixelonevisuals.tech/:splat (301)
```

### Security Headers (_headers file)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: (camera, microphone, etc. disabled)
Content-Security-Policy: (configured for supabase.co, CDN, self)
```

### Cache Control
```
/robots.txt          → Cache-Control: public, max-age=300 (5 min)
/sitemap.xml         → Cache-Control: public, max-age=300 (5 min)
/*                   → Default (check Netlify config)
```

### Build & Deployment
**No Build Step Required**:
- Pure HTML/CSS/JS
- No npm packages needed
- No TypeScript compilation
- Direct deployment of files

**Deployment Command**: None (static files)
**Build Output**: `pixelone/` directory

### Monitoring & Logging
- **Cloudflare Insights**: Enabled (configured in _headers)
- **Supabase Logging**: Check Supabase dashboard for:
  - Failed auth attempts
  - Database errors
  - RLS policy violations
- **Client Errors**: No error tracking configured (recommend Sentry or Rollbar)

### Backup Strategy
**Data Backups**:
- Supabase automatic backups (nightly)
- Manual export available in Supabase dashboard
- Order data: Immutable after creation (safe)

**Code Backups**:
- Git repository (GitHub/GitLab)
- Netlify deployment history

### Maintenance Tasks
- [ ] Monitor Supabase usage (free tier limits)
- [ ] Review admin audit logs monthly
- [ ] Update fonts periodically (Google Fonts)
- [ ] Test login flow (auth can break silently)
- [ ] Verify email notifications (WhatsApp webhook)
- [ ] Check mobile layout on real devices (quarterly)

---

## SUMMARY: QUICK REFERENCE

### Key Statistics
- **HTML Files**: 17 main pages
- **CSS**: 2 main files (3800+ lines total)
- **JavaScript**: ~2500 lines (app.js is main file)
- **JSON Content Files**: 23 Arabic translation files
- **Database Tables**: 12 core + auth system
- **Services Offered**: 11 (7 available, 4 coming soon)
- **Admin Emails**: 3 configured

### Critical Paths
- **Public Entry**: `/index.html`
- **Checkout Flow**: Service Card → Order Modal → DB
- **Client Access**: `/login.html` → `/dashboard.html`
- **Admin Access**: `/login.html` (email check) → `/admin-dashboard.html`
- **Quote Generation**: Admin Dashboard → Create Quote → PDF Download

### Must Know
1. **All text is in Arabic** - English only in metadata/buttons
2. **RTL layout** - Don't change `dir="rtl"` or break flexbox
3. **Supabase RLS** - Admin/Client roles enforced at DB level
4. **Orders immutable** - Can't delete orders, only change status
5. **Discount system** - Global OR per-customer, not both
6. **Mobile-first CSS** - Base styles apply to all devices

### Next Steps for Improvement
1. Fix design issues listed above (typography, spacing, contrast)
2. Add theme toggle button in navbar
3. Implement search/filter in dashboard
4. Add toast notifications for better UX
5. Create print-friendly CSS
6. Add animations (hover, scroll-reveal)
7. Optimize images (WebP, lazy load)
8. Add PWA support
9. Set up error tracking (Sentry)
10. Monitor Supabase usage

---

## FILE MODIFICATION HISTORY

**Created**: 2026-04-24  
**Author**: Senior Front-End Engineer, UI/UX Architect, Codebase Analyst  
**Purpose**: Complete codebase reference for safe modifications

---

*End of PROJECT_MANIFEST.md*
