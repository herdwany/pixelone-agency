# Pixel One Visual QA Checklist

Use this checklist before each production release.

## Devices

1. Desktop: 1440x900 and 1920x1080
2. Tablet: 768x1024 and 820x1180
3. Mobile: 360x800 and 390x844

## Navigation And Header

1. Header layout is aligned and not overlapping content on all pages.
2. Desktop nav links are visible and clickable.
3. Mobile hamburger opens and closes correctly.
4. Mobile menu panel does not go off-screen.
5. Mobile menu links navigate correctly.
6. Header does not remain awkwardly sticky while scrolling mobile content.
7. Focus ring is visible when tabbing through header controls.

## Layout And Spacing

1. Main sections have consistent top and bottom spacing across pages.
2. Cards keep consistent padding and border radius.
3. No text or card is clipped on 320px to 430px widths.
4. No horizontal scroll appears on body.
5. Grid blocks stack correctly at tablet and mobile breakpoints.

## Typography And Readability

1. Hero and page titles scale correctly without wrapping into broken lines.
2. Paragraph text remains readable with enough line-height.
3. Arabic copy does not overflow buttons or badges.
4. CTA button labels remain fully visible in all breakpoints.

## Core User Flows

1. Home to Services and Home to FAQ work correctly.
2. Client login page opens and CTA moves to login form.
3. Public policy pages open with valid navigation links.
4. Dashboard pages still load after authentication.

## Accessibility And Motion

1. Test with reduced motion enabled in OS/browser.
2. Animated elements still appear (no invisible sections).
3. Keyboard-only navigation works for menu and main links.
4. Color contrast remains readable on dark backgrounds.

## SEO And Rendering Spot Checks

1. Canonical URL exists in each public page.
2. Meta description exists in each public page.
3. robots.txt and sitemap.xml are reachable without challenge.
4. OG title/description/url match the page purpose.

## Final Pass

1. Hard refresh and cache purge done.
2. Re-test two pages from a second device and second network.
3. Capture screenshots for desktop, tablet, and mobile home page.
4. Approve release only when all items pass.
