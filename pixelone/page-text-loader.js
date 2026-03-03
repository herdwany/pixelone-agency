(function () {
    'use strict';

    var STORAGE_KEY = 'pixelone_lang_v1';
    var URL_LANG_PARAM = 'lang';
    var COOKIE_KEY = 'pixelone_lang_v1';
    var SUPPORTED_LANGS = ['ar', 'en', 'fr'];
    var DEFAULT_LANG = 'ar';
    var I18N_TABLE = 'pixel_i18n_pages';

    function getSafeLanguage(lang) {
        var value = String(lang || '').toLowerCase();
        if (SUPPORTED_LANGS.indexOf(value) >= 0) return value;
        return DEFAULT_LANG;
    }

    function getStoredLanguage() {
        try {
            var localLang = localStorage.getItem(STORAGE_KEY);
            if (localLang) return getSafeLanguage(localLang);
        } catch (_err) {
            // ignore
        }

        var cookieMatch = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_KEY + '=([^;]+)'));
        if (cookieMatch && cookieMatch[1]) {
            try {
                return getSafeLanguage(decodeURIComponent(cookieMatch[1]));
            } catch (_err2) {
                return getSafeLanguage(cookieMatch[1]);
            }
        }

        return DEFAULT_LANG;
    }

    function setStoredLanguage(lang) {
        var safeLang = getSafeLanguage(lang);

        try {
            localStorage.setItem(STORAGE_KEY, safeLang);
        } catch (_err) {
            // ignore
        }

        document.cookie = COOKIE_KEY + '=' + encodeURIComponent(safeLang) + '; path=/; max-age=31536000; samesite=lax';
    }

    function getLanguageFromUrl() {
        try {
            var params = new URLSearchParams(window.location.search || '');
            var value = params.get(URL_LANG_PARAM);
            if (!value) return '';
            return getSafeLanguage(value);
        } catch (_err) {
            return '';
        }
    }

    function withLanguageInUrl(urlLike, lang) {
        try {
            var url = new URL(urlLike, window.location.href);
            url.searchParams.set(URL_LANG_PARAM, getSafeLanguage(lang));
            return url.toString();
        } catch (_err) {
            return urlLike;
        }
    }

    function isSameOriginHttpUrl(urlLike) {
        try {
            var url = new URL(urlLike, window.location.href);
            if (!/^https?:$/i.test(url.protocol)) return false;
            return url.origin === window.location.origin;
        } catch (_err) {
            return false;
        }
    }

    function keepLanguageAcrossLinks(lang) {
        var anchors = document.querySelectorAll('a[href]');
        anchors.forEach(function (anchor) {
            var href = anchor.getAttribute('href');
            if (!href) return;
            if (href.charAt(0) === '#') return;
            if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
            if (!isSameOriginHttpUrl(href)) return;

            anchor.setAttribute('href', withLanguageInUrl(href, lang));
        });
    }

    function bindLanguageAwareNavigation(lang) {
        document.addEventListener('click', function (event) {
            if (event.defaultPrevented) return;
            if (event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
            if (!anchor) return;

            var href = anchor.getAttribute('href') || '';
            if (!href || href.charAt(0) === '#') return;
            if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
            if (!isSameOriginHttpUrl(href)) return;

            anchor.setAttribute('href', withLanguageInUrl(href, lang));
        }, true);

        keepLanguageAcrossLinks(lang);
    }

    function getPageName() {
        var path = window.location.pathname || '/';
        var clean = path.split('?')[0].split('#')[0];
        var fileName = clean.substring(clean.lastIndexOf('/') + 1);
        if (!fileName || fileName === '/') return 'index';
        if (fileName.toLowerCase().endsWith('.html')) {
            return fileName.slice(0, -5).toLowerCase();
        }
        return fileName.toLowerCase();
    }

    function replaceTrimmedText(node, newText) {
        var raw = String(node.nodeValue || '');
        var match = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
        if (!match) {
            node.nodeValue = newText;
            return;
        }
        node.nodeValue = match[1] + newText + match[3];
    }

    function collectTextNodes(root) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;

                var parentTag = node.parentElement.tagName;
                if (parentTag === 'SCRIPT' || parentTag === 'STYLE' || parentTag === 'NOSCRIPT') {
                    return NodeFilter.FILTER_REJECT;
                }

                var value = String(node.nodeValue || '').replace(/\s+/g, ' ').trim();
                if (!value) return NodeFilter.FILTER_REJECT;

                return NodeFilter.FILTER_ACCEPT;
            }
        });

        var nodes = [];
        var current;
        while ((current = walker.nextNode())) {
            nodes.push(current);
        }
        return nodes;
    }

    function applyAttributes(attributes) {
        if (!Array.isArray(attributes)) return;

        attributes.forEach(function (entry) {
            if (!entry || !entry.selector || !entry.attribute) return;
            var element = document.querySelector(entry.selector);
            if (!element) return;
            element.setAttribute(entry.attribute, String(entry.value || ''));
        });
    }

    async function loadLocaleFromFile(page, lang) {
        var localizedUrl = 'content/' + page + '.' + lang + '.json';
        var response = await fetch(localizedUrl, { cache: 'no-store' });
        if (response.ok) return response.json();

        var legacyUrl = 'content/' + page + '.json';
        response = await fetch(legacyUrl, { cache: 'no-store' });
        if (!response.ok) return null;
        return response.json();
    }

    async function loadLocaleOverrideFromSupabase(page, lang) {
        var sb = window._supabase;
        if (!sb || !sb.from) return null;

        try {
            var result = await sb
                .from(I18N_TABLE)
                .select('title,meta_description,texts,attributes')
                .eq('page', page)
                .eq('lang', lang)
                .maybeSingle();

            if (result.error || !result.data) return null;

            return {
                title: result.data.title || '',
                metaDescription: result.data.meta_description || '',
                texts: Array.isArray(result.data.texts) ? result.data.texts : [],
                attributes: Array.isArray(result.data.attributes) ? result.data.attributes : [],
            };
        } catch (_err) {
            return null;
        }
    }

    function mergeLocale(base, override) {
        if (!base && !override) return null;
        if (!base) return override;
        if (!override) return base;

        return {
            page: override.page || base.page,
            title: override.title || base.title,
            metaDescription: override.metaDescription || base.metaDescription,
            texts: Array.isArray(override.texts) && override.texts.length > 0 ? override.texts : base.texts,
            attributes: Array.isArray(override.attributes) && override.attributes.length > 0 ? override.attributes : base.attributes,
        };
    }

    function buildLanguageSwitcher(className) {
        var wrap = document.createElement('div');
        wrap.className = className;

        ['ar', 'en', 'fr'].forEach(function (lang) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'lang-switch-btn';
            btn.dataset.lang = lang;
            btn.textContent = lang.toUpperCase();
            wrap.appendChild(btn);
        });

        return wrap;
    }

    function createLanguageSwitcher(currentLang) {
        var host = document.querySelector('nav[aria-label="التنقل الرئيسي"], nav[aria-label="Main Navigation"], nav');
        if (host && !document.getElementById('langSwitcher')) {
            var wrap = buildLanguageSwitcher('lang-switcher');
            wrap.id = 'langSwitcher';

            var desktopAction = host.querySelector('.site-nav-cta, .hidden.items-center.gap-3.md\\:flex');
            if (desktopAction && desktopAction.parentElement === host) {
                host.insertBefore(wrap, desktopAction);
            } else {
                host.appendChild(wrap);
            }

            var mobilePanel = host.querySelector('.mobile-nav-panel');
            if (mobilePanel) {
                var mobileWrap = buildLanguageSwitcher('lang-switcher mobile');
                mobilePanel.insertBefore(mobileWrap, mobilePanel.firstChild);
            }
        }

        var footer = document.querySelector('footer');
        if (footer && !document.getElementById('footerLangSwitcher')) {
            var footerWrap = buildLanguageSwitcher('lang-switcher footer');
            footerWrap.id = 'footerLangSwitcher';
            var footerHost = footer.querySelector('.mx-auto, .container') || footer;
            footerHost.appendChild(footerWrap);
        }

        function refreshButtons() {
            Array.from(document.querySelectorAll('.lang-switch-btn')).forEach(function (btn) {
                btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
            });
        }

        document.addEventListener('click', function (event) {
            var btn = event.target.closest('.lang-switch-btn');
            if (!btn) return;

            var lang = getSafeLanguage(btn.dataset.lang);
            setStoredLanguage(lang);
            window.location.href = withLanguageInUrl(window.location.href, lang);
        });

        refreshButtons();
    }

    function applyLanguageDirection(lang) {
        var html = document.documentElement;
        if (!html) return;

        if (lang === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
        } else {
            html.setAttribute('lang', lang);
            html.setAttribute('dir', 'ltr');
        }
    }

    async function initPageTexts() {
        try {
            var page = getPageName();
            var langFromUrl = getLanguageFromUrl();
            var lang = getSafeLanguage(langFromUrl || getStoredLanguage());

            // Keep all stores in sync so language survives any navigation pattern.
            setStoredLanguage(lang);
            bindLanguageAwareNavigation(lang);

            if (!langFromUrl) {
                try {
                    var normalizedUrl = withLanguageInUrl(window.location.href, lang);
                    window.history.replaceState(null, '', normalizedUrl);
                } catch (_historyErr) {
                    // ignore
                }
            }

            applyLanguageDirection(lang);

            var locale = await loadLocaleFromFile(page, lang);
            if (!locale) {
                locale = await loadLocaleFromFile(page, DEFAULT_LANG);
            }
            if (!locale) return;

            var override = await loadLocaleOverrideFromSupabase(page, lang);
            var finalPayload = mergeLocale(locale, override);
            if (!finalPayload || !Array.isArray(finalPayload.texts)) return;

            if (typeof finalPayload.title === 'string' && finalPayload.title.trim()) {
                document.title = finalPayload.title.trim();
            }

            if (typeof finalPayload.metaDescription === 'string') {
                var metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute('content', finalPayload.metaDescription);
                }
            }

            applyAttributes(finalPayload.attributes);

            var nodes = collectTextNodes(document.body);
            var len = Math.min(nodes.length, finalPayload.texts.length);
            for (var i = 0; i < len; i += 1) {
                replaceTrimmedText(nodes[i], String(finalPayload.texts[i] || ''));
            }

            createLanguageSwitcher(lang);
        } catch (_err) {
            // Keep page usable if translation files are missing.
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageTexts, { once: true });
    } else {
        initPageTexts();
    }
})();