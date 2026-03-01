(function () {
    'use strict';

    var GSAP_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    var SCROLLTRIGGER_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

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
            initRevealAnimations(gsap, ScrollTrigger);
            initTypographyMotion(gsap);
        } catch (_err) {
            runLoaderFallback();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVisualSystem, { once: true });
    } else {
        initVisualSystem();
    }
})();
