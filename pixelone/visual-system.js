(function () {
    'use strict';

    var SITE_THEME_KEY = 'pixelone-site-theme';

    function getStoredSiteTheme() {
        try {
            return localStorage.getItem(SITE_THEME_KEY);
        } catch (_e) {
            return null;
        }
    }

    function resolveEffectiveSiteTheme() {
        var stored = getStoredSiteTheme();
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        try {
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } catch (_e) {
            return 'dark';
        }
    }

    function applyThemeToDocument(theme) {
        document.documentElement.setAttribute('data-site-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === 'light' ? '#f4f4f5' : '#080808');
        }
    }

    try {
        applyThemeToDocument(resolveEffectiveSiteTheme());
    } catch (_e) {
        applyThemeToDocument('dark');
    }

    var GSAP_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    var SCROLLTRIGGER_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
    var PREMIUM_REFRESH_URL = 'premium-refresh.css';

    function ensurePremiumRefreshStylesheet() {
        if (!document.head) return;
        if (document.querySelector('link[data-premium-refresh="true"]')) return;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = PREMIUM_REFRESH_URL;
        link.dataset.premiumRefresh = 'true';
        document.head.appendChild(link);
    }

    function applySiteTheme(theme, options) {
        var persist = !options || options.persist !== false;
        if (theme !== 'light' && theme !== 'dark') theme = 'dark';
        applyThemeToDocument(theme);
        if (persist) {
            try {
                localStorage.setItem(SITE_THEME_KEY, theme);
            } catch (_e) { /* ignore */ }
        }

        var toggle = document.querySelector('.site-theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
            toggle.setAttribute(
                'title',
                theme === 'light' ? 'الوضع الفاتح — انقر للوضع الداكن' : 'الوضع الداكن — انقر للوضع الفاتح'
            );
        }
    }

    function applyResolvedSiteTheme() {
        applyThemeToDocument(resolveEffectiveSiteTheme());
        var toggle = document.querySelector('.site-theme-toggle');
        if (toggle) {
            var eff = resolveEffectiveSiteTheme();
            toggle.setAttribute('aria-pressed', eff === 'light' ? 'true' : 'false');
        }
    }

    function initSiteThemeControls() {
        var nav = document.querySelector('nav.site-nav');
        var navContainer = nav && (nav.querySelector(':scope > .site-nav-shell') || nav);
        if (!navContainer || navContainer.querySelector('.site-nav-util')) {
            applyResolvedSiteTheme();
            try {
                var mq = window.matchMedia('(prefers-color-scheme: light)');
                if (mq.addEventListener) {
                    mq.addEventListener('change', function () {
                        if (getStoredSiteTheme() === 'light' || getStoredSiteTheme() === 'dark') return;
                        applyResolvedSiteTheme();
                        var t = document.querySelector('.site-theme-toggle');
                        var label = t && t.querySelector('[data-theme-label]');
                        if (label) label.textContent = resolveEffectiveSiteTheme() === 'light' ? 'فاتح' : 'داكن';
                    });
                } else if (mq.addListener) {
                    mq.addListener(function () {
                        if (getStoredSiteTheme() === 'light' || getStoredSiteTheme() === 'dark') return;
                        applyResolvedSiteTheme();
                        var t2 = document.querySelector('.site-theme-toggle');
                        var label2 = t2 && t2.querySelector('[data-theme-label]');
                        if (label2) label2.textContent = resolveEffectiveSiteTheme() === 'light' ? 'فاتح' : 'داكن';
                    });
                }
            } catch (_e) { /* ignore */ }
            return;
        }

        var util = document.createElement('div');
        util.className = 'site-nav-util';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'site-theme-toggle';
        btn.setAttribute('aria-label', 'تبديل سمة الواجهة بين الفاتح والداكن');
        btn.setAttribute(
            'title',
            (resolveEffectiveSiteTheme() === 'light')
                ? 'الوضع الفاتح — انقر للوضع الداكن'
                : 'الوضع الداكن — انقر للوضع الفاتح'
        );
        btn.setAttribute(
            'aria-pressed',
            resolveEffectiveSiteTheme() === 'light' ? 'true' : 'false'
        );
        btn.innerHTML = '<span class="site-theme-toggle__track" aria-hidden="true"><span class="site-theme-toggle__thumb"></span></span><span class="site-theme-toggle__label" data-theme-label></span>';

        function syncLabel() {
            var isLight = resolveEffectiveSiteTheme() === 'light';
            var label = btn.querySelector('[data-theme-label]');
            if (label) {
                label.textContent = isLight ? 'فاتح' : 'داكن';
            }
        }

        btn.addEventListener('click', function () {
            var cur = resolveEffectiveSiteTheme();
            var next = cur === 'light' ? 'dark' : 'light';
            applySiteTheme(next, { persist: true });
            syncLabel();
        });

        btn.addEventListener('dblclick', function (ev) {
            ev.preventDefault();
            try {
                localStorage.removeItem(SITE_THEME_KEY);
            } catch (_e) { /* ignore */ }
            applyResolvedSiteTheme();
            syncLabel();
        });

        util.appendChild(btn);

        var mobile = navContainer.querySelector('.mobile-nav-menu');
        if (mobile) {
            util.appendChild(mobile);
        }

        navContainer.appendChild(util);
        syncLabel();
        applyResolvedSiteTheme();

        try {
            var mqNav = window.matchMedia('(prefers-color-scheme: light)');
            var onOsThemeChange = function () {
                if (getStoredSiteTheme() === 'light' || getStoredSiteTheme() === 'dark') return;
                applyResolvedSiteTheme();
                syncLabel();
            };
            if (mqNav.addEventListener) mqNav.addEventListener('change', onOsThemeChange);
            else if (mqNav.addListener) mqNav.addListener(onOsThemeChange);
        } catch (_e2) { /* ignore */ }
    }

    function loadExternalScript(src) {
        return new Promise(function (resolve, reject) {
            var existing = document.querySelector('script[data-vs-src="' + src + '"]');
            if (existing) {
                if (existing.dataset.loaded === 'true') {
                    resolve();
                    return;
                }
                existing.addEventListener('load', function () { resolve(); }, { once: true });
                existing.addEventListener('error', reject, { once: true });
                return;
            }

            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            script.dataset.vsSrc = src;
            script.addEventListener('load', function () {
                script.dataset.loaded = 'true';
                resolve();
            }, { once: true });
            script.addEventListener('error', reject, { once: true });
            document.head.appendChild(script);
        });
    }

    function getNetworkAwareMinimum() {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        var effectiveType = String((connection && connection.effectiveType) || '').toLowerCase();

        if (connection && connection.saveData) return 520;
        if (effectiveType.indexOf('slow-2g') >= 0 || effectiveType.indexOf('2g') >= 0) return 1350;
        if (effectiveType.indexOf('3g') >= 0) return 980;
        if (effectiveType.indexOf('4g') >= 0) return 700;
        return 860;
    }

    function buildLoaderDom() {
        var existing = document.getElementById('vsLoader');
        if (existing) return existing;

        var loader = document.createElement('div');
        loader.id = 'vsLoader';
        loader.className = 'vs-loader';
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-live', 'polite');
        loader.setAttribute('aria-label', 'Loading Pixel One Visuals');
        loader.innerHTML = [
            '<div class="vs-loader-panel">',
            '  <h2 class="vs-loader-brand">Pixel One Visuals</h2>',
            '  <div class="vs-loader-progress" aria-hidden="true">',
            '      <span class="vs-loader-bar"></span>',
            '  </div>',
            '</div>'
        ].join('');

        document.body.appendChild(loader);
        return loader;
    }

    function buildPageVeil() {
        var veil = document.getElementById('vsPageVeil');
        if (veil) return veil;

        veil = document.createElement('div');
        veil.id = 'vsPageVeil';
        veil.className = 'vs-page-veil';
        veil.setAttribute('aria-hidden', 'true');
        document.body.appendChild(veil);
        return veil;
    }

    function initGlobalHomeButton() {
        if (!document.body) return;
        if (document.getElementById('globalHomeButton')) return;

        var path = normalizePathname(window.location.pathname);
        var hiddenOnPages = {
            '/': true,
            '/pixelone': true,
            '/pixelone/': true,
            '/pixelone/index.html': true,
            '/pixelone/about.html': true,
            '/pixelone/services.html': true,
            '/pixelone/how-we-work.html': true,
            '/pixelone/client-login.html': true,
            '/pixelone/login.html': true,
            '/pixelone/privacy-policy.html': true,
            '/pixelone/refund-policy.html': true,
            '/pixelone/terms-of-service.html': true
        };

        if (hiddenOnPages[path]) {
            return;
        }

        var homeLink = document.createElement('a');
        homeLink.id = 'globalHomeButton';
        homeLink.className = 'global-home-btn';
        homeLink.href = 'index.html';
        homeLink.setAttribute('aria-label', 'الانتقال إلى الصفحة الرئيسية');
        homeLink.setAttribute('data-i18n-skip', '');
        homeLink.innerHTML = [
            '<span class="global-home-btn-icon" aria-hidden="true">⌂</span>',
            '<span class="global-home-btn-text">الصفحة الرئيسية</span>'
        ].join('');

        var currentUrl = new URL(window.location.href);
        var homeUrl = new URL(homeLink.href, currentUrl.href);
        if (normalizePathname(currentUrl.pathname) === normalizePathname(homeUrl.pathname) && !currentUrl.search && !currentUrl.hash) {
            homeLink.classList.add('is-current');
            homeLink.setAttribute('aria-current', 'page');
        }

        document.body.appendChild(homeLink);
    }

    function isSamePageAnchor(url, current) {
        return url.origin === current.origin && url.pathname === current.pathname && url.hash;
    }

    function isInternalHtmlNavigation(url, current) {
        if (url.origin !== current.origin) return false;
        if (url.pathname === current.pathname && !url.search && !url.hash) return false;

        var path = url.pathname.toLowerCase();
        return path.endsWith('.html') || path === '/' || path.endsWith('/pixelone/');
    }

    function initPageTransitions(gsap) {
        var veil = buildPageVeil();
        var navigating = false;

        document.addEventListener('click', function (event) {
            var link = event.target.closest('a[href]');
            if (!link) return;
            if (link.target && link.target.toLowerCase() === '_blank') return;
            if (link.hasAttribute('download')) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            var current = new URL(window.location.href);
            var next;
            try {
                next = new URL(link.href, current.href);
            } catch (_err) {
                return;
            }

            if (isSamePageAnchor(next, current)) return;
            if (!isInternalHtmlNavigation(next, current)) return;
            if (navigating) return;

            event.preventDefault();
            navigating = true;

            gsap.to(veil, {
                autoAlpha: 1,
                duration: 0.36,
                ease: 'power2.out',
                onComplete: function () {
                    window.location.href = next.href;
                }
            });
        });
    }

    function initRevealAnimations(gsap, ScrollTrigger) {
        var targets = Array.from(document.querySelectorAll('section, article, .water-card, .stat-card, .navbar-glass, .dashboard-nav, .msg-box'));
        var uniqueTargets = targets.filter(function (node, idx) {
            return targets.indexOf(node) === idx;
        });

        uniqueTargets.forEach(function (node, index) {
            var delay = (index % 6) * 0.04;
            gsap.from(node, {
                opacity: 0,
                y: 20,
                duration: 0.7,
                delay: delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: node,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    function initTypographyMotion(gsap) {
        var titles = document.querySelectorAll('h1, h2, h3');
        titles.forEach(function (title, idx) {
            gsap.from(title, {
                opacity: 0,
                y: 14,
                duration: 0.55,
                delay: (idx % 5) * 0.03,
                ease: 'power2.out'
            });
        });
    }

    function stripPunctuation(value) {
        var text = String(value || '');
        if (!text) return text;

        return text
            .replace(/[\.,،؛:!?؟…"'«»\(\)\[\]{}]+/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    function shouldSkipSanitize(el, rawText) {
        if (!el) return true;
        if (!rawText) return true;

        // Keep contact and URL-like content intact.
        if (/@|https?:\/\/|www\./i.test(rawText)) return true;

        if (el.closest('a[dir="ltr"], .font-en, [dir="ltr"], .number-font')) return true;

        // Skip elements managed by i18n text loader to avoid stripping punctuation from translated text.
        if (el.hasAttribute('data-i18n') || el.closest('[data-i18n]')) return true;
        if (el.dataset && el.dataset.textLoaded) return true;

        return false;
    }

    function sanitizeArabicCopy() {
        var targets = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
        targets.forEach(function (el) {
            var raw = (el.textContent || '').trim();
            if (shouldSkipSanitize(el, raw)) return;

            var cleaned = stripPunctuation(raw);
            if (cleaned && cleaned !== raw) {
                el.textContent = cleaned;
            }
        });
    }

    function initCopySanitizer() {
        var rafId = null;

        function queueSanitize() {
            if (rafId) return;
            rafId = window.requestAnimationFrame(function () {
                rafId = null;
                sanitizeArabicCopy();
            });
        }

        sanitizeArabicCopy();
        window.setTimeout(sanitizeArabicCopy, 600);
        window.setTimeout(sanitizeArabicCopy, 1400);

        var observer = new MutationObserver(function () {
            queueSanitize();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }

    function cleanHeadingDecorations() {
        var headingNodes = document.querySelectorAll('h1, h2, h3');
        headingNodes.forEach(function (node) {
            if (!node) return;
            if (node.hasAttribute('data-i18n') || node.closest('[data-i18n]')) return;

            var raw = String(node.textContent || '').trim();
            if (!raw) return;

            var cleaned = raw
                .replace(/^[\s\-\|:•●◆◇★☆✦✧▪■►▶❖※]+/g, '')
                .replace(/[\s\-\|:•●◆◇★☆✦✧▪■►▶❖※]+$/g, '')
                .replace(/([!؟?.,،؛:]){2,}$/g, '$1')
                .trim();

            if (cleaned && cleaned !== raw) {
                node.textContent = cleaned;
            }
        });
    }

    function normalizePathname(pathname) {
        var p = String(pathname || '/').toLowerCase();
        if (p === '/index.html') return '/';
        if (p.endsWith('/index.html')) return p.slice(0, -10) || '/';
        if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1);
        return p || '/';
    }

    function initActiveNavState() {
        var navs = Array.from(document.querySelectorAll('nav[aria-label="التنقل الرئيسي"]'));
        if (navs.length === 0) return;

        var currentUrl = new URL(window.location.href);
        var currentPath = normalizePathname(currentUrl.pathname);

        navs.forEach(function (nav) {
            var links = Array.from(nav.querySelectorAll('a[href]')).filter(function (link) {
                if (link.classList.contains('logo-container')) return false;
                if (link.getAttribute('href') === '#') return false;
                return true;
            });

            if (links.length === 0) return;

            var plainLinks = [];
            var hashLinkMap = {};
            var hashTargets = [];

            links.forEach(function (link) {
                link.classList.remove('is-active-link');

                var rawHref = link.getAttribute('href');
                if (!rawHref) return;

                var resolved;
                try {
                    resolved = new URL(rawHref, currentUrl.href);
                } catch (_err) {
                    return;
                }

                var linkPath = normalizePathname(resolved.pathname);
                var linkHash = resolved.hash || '';

                if (linkHash && linkPath === currentPath) {
                    var id = linkHash.slice(1);
                    var target = document.getElementById(id);
                    if (target) {
                        hashLinkMap[id] = hashLinkMap[id] || [];
                        hashLinkMap[id].push(link);
                        hashTargets.push(target);
                    }
                    return;
                }

                if (resolved.origin === currentUrl.origin && linkPath === currentPath) {
                    plainLinks.push(link);
                }
            });

            function setActive(activeLinks) {
                links.forEach(function (link) {
                    link.classList.remove('is-active-link');
                });
                activeLinks.forEach(function (link) {
                    link.classList.add('is-active-link');
                });
            }

            if (Object.keys(hashLinkMap).length > 0) {
                var activeSectionId = null;
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        var id = entry.target.id;
                        if (!id) return;
                        activeSectionId = id;
                    });

                    if (activeSectionId && hashLinkMap[activeSectionId]) {
                        setActive(hashLinkMap[activeSectionId]);
                    }
                }, {
                    root: null,
                    rootMargin: '-30% 0px -55% 0px',
                    threshold: [0.15, 0.35, 0.6],
                });

                hashTargets.forEach(function (target) { observer.observe(target); });

                var initialHash = (window.location.hash || '').replace(/^#/, '');
                if (initialHash && hashLinkMap[initialHash]) {
                    setActive(hashLinkMap[initialHash]);
                } else {
                    var firstTarget = hashTargets[0];
                    if (firstTarget && hashLinkMap[firstTarget.id]) {
                        setActive(hashLinkMap[firstTarget.id]);
                    }
                }

                return;
            }

            if (plainLinks.length > 0) {
                setActive([plainLinks[0]]);
            }
        });
    }

    function runLoaderWithGsap(gsap) {
        var loader = buildLoaderDom();
        var panel = loader.querySelector('.vs-loader-panel');
        var minDuration = getNetworkAwareMinimum();
        var startedAt = Date.now();
        var closed = false;

        document.body.classList.add('vs-loading-active');
        document.body.classList.add('vs-enhanced');

        gsap.set(loader, { autoAlpha: 1 });
        gsap.fromTo(panel,
            { opacity: 0, y: 12, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
        );

        function closeLoader() {
            if (closed) return;
            closed = true;

            var remaining = Math.max(0, minDuration - (Date.now() - startedAt));
            window.setTimeout(function () {
                gsap.to(loader, {
                    autoAlpha: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                    onComplete: function () {
                        loader.remove();
                        document.body.classList.remove('vs-loading-active');
                    }
                });
            }, remaining);
        }

        window.addEventListener('load', closeLoader, { once: true });
        window.setTimeout(closeLoader, 5200);
    }

    function runLoaderFallback() {
        var loader = buildLoaderDom();
        var minDuration = getNetworkAwareMinimum();
        var startedAt = Date.now();
        var closed = false;

        document.body.classList.add('vs-loading-active');
        document.body.classList.add('vs-enhanced');

        function closeLoader() {
            if (closed) return;
            closed = true;

            var remaining = Math.max(0, minDuration - (Date.now() - startedAt));
            window.setTimeout(function () {
                loader.classList.add('is-exit');
                window.setTimeout(function () {
                    loader.remove();
                    document.body.classList.remove('vs-loading-active');
                }, 460);
            }, remaining);
        }

        window.addEventListener('load', closeLoader, { once: true });
        window.setTimeout(closeLoader, 5200);
    }

    async function initVisualSystem() {
        if (!document.body) return;

        ensurePremiumRefreshStylesheet();
        initSiteThemeControls();
        initGlobalHomeButton();
        cleanHeadingDecorations();
        window.setTimeout(cleanHeadingDecorations, 900);

        try {
            await loadExternalScript(GSAP_URL);
            await loadExternalScript(SCROLLTRIGGER_URL);

            var gsap = window.gsap;
            var ScrollTrigger = window.ScrollTrigger;

            if (!gsap || !ScrollTrigger) {
                runLoaderFallback();
                return;
            }

            gsap.registerPlugin(ScrollTrigger);
            runLoaderWithGsap(gsap);
            initPageTransitions(gsap);
            initActiveNavState();
            initRevealAnimations(gsap, ScrollTrigger);
            initTypographyMotion(gsap);
        } catch (_err) {
            runLoaderFallback();
            initActiveNavState();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVisualSystem, { once: true });
    } else {
        initVisualSystem();
    }
})();
