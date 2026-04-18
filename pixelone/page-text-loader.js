(function () {
    'use strict';

    var STORAGE_KEY = 'pixelone_lang_v1';
    var URL_LANG_PARAM = 'lang';
    var COOKIE_KEY = 'pixelone_lang_v1';
    var SUPPORTED_LANGS = ['ar'];
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
        void lang;
        return urlLike;
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
        void lang;
    }

    function bindLanguageAwareNavigation(lang) {
        void lang;
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

                if (node.parentElement.closest('[data-i18n-skip]')) {
                    return NodeFilter.FILTER_REJECT;
                }

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
        var url = 'content/' + page + '.' + lang + '.json';
        var response = await fetch(url, { cache: 'no-store' });
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

        // File (base) is the primary source; Supabase (override) is only a fallback.
        return {
            page: base.page || override.page,
            title: base.title || override.title,
            metaDescription: base.metaDescription || override.metaDescription,
            texts: Array.isArray(base.texts) && base.texts.length > 0 ? base.texts : override.texts,
            attributes: Array.isArray(base.attributes) && base.attributes.length > 0 ? base.attributes : override.attributes,
        };
    }

    function createLanguageSwitcher(currentLang) {
        void currentLang;
    }

    function applyLanguageDirection(lang) {
        var html = document.documentElement;
        if (!html) return;

        void lang;
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
    }

    async function initPageTexts() {
        try {
            var page = getPageName();
            var lang = 'ar';

            // Keep all stores in sync so language survives any navigation pattern.
            setStoredLanguage(lang);
            bindLanguageAwareNavigation(lang);

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
                // Mark parent element so visual-system sanitizer skips i18n-managed nodes.
                if (nodes[i].parentElement) {
                    nodes[i].parentElement.dataset.textLoaded = '1';
                }
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