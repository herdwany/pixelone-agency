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

    function getPageTextMode() {
        var body = document.body;
        if (!body) return 'auto';
        var mode = String(body.getAttribute('data-page-text-mode') || '').toLowerCase();
        if (mode === 'off' || mode === 'seo-only') return mode;
        return 'auto';
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

    function ensureMetaTag(attributeName, attributeValue) {
        var selector = 'meta[' + attributeName + '="' + attributeValue + '"]';
        var node = document.querySelector(selector);
        if (node) return node;

        node = document.createElement('meta');
        node.setAttribute(attributeName, attributeValue);
        document.head.appendChild(node);
        return node;
    }

    function upsertMetaContent(attributeName, attributeValue, content) {
        var value = String(content || '').trim();
        if (!value) return;

        var meta = ensureMetaTag(attributeName, attributeValue);
        meta.setAttribute('content', value);
    }

    function upsertCanonical(href) {
        var value = String(href || '').trim();
        if (!value) return;

        var canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', value);
    }

    function getCurrentCanonicalFallback() {
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && canonical.getAttribute('href')) {
            return canonical.getAttribute('href');
        }
        return window.location.href;
    }

    function applySeoPayload(payload) {
        if (!payload) return;

        var seo = payload.seo && typeof payload.seo === 'object' ? payload.seo : {};

        var title = String(seo.title || payload.title || '').trim();
        var description = String(seo.description || payload.metaDescription || '').trim();
        var keywords = String(seo.keywords || '').trim();
        var canonicalUrl = String(seo.canonical || getCurrentCanonicalFallback() || '').trim();
        var ogUrl = String(seo.ogUrl || canonicalUrl || '').trim();
        var ogImage = String(seo.ogImage || '').trim();
        var ogImageAlt = String(seo.ogImageAlt || '').trim();
        var ogType = String(seo.ogType || 'website').trim();
        var ogLocale = String(seo.ogLocale || 'ar_MA').trim();
        var siteName = String(seo.siteName || 'Pixel One Visuals').trim();
        var twitterCard = String(seo.twitterCard || 'summary_large_image').trim();

        if (title) {
            document.title = title;
            upsertMetaContent('property', 'og:title', String(seo.ogTitle || title).trim());
            upsertMetaContent('name', 'twitter:title', String(seo.twitterTitle || title).trim());
        }

        if (description) {
            upsertMetaContent('name', 'description', description);
            upsertMetaContent('property', 'og:description', String(seo.ogDescription || description).trim());
            upsertMetaContent('name', 'twitter:description', String(seo.twitterDescription || description).trim());
        }

        if (keywords) {
            upsertMetaContent('name', 'keywords', keywords);
        }

        if (canonicalUrl) {
            upsertCanonical(canonicalUrl);
        }

        if (ogUrl) {
            upsertMetaContent('property', 'og:url', ogUrl);
        }

        upsertMetaContent('property', 'og:type', ogType);
        upsertMetaContent('property', 'og:locale', ogLocale);
        upsertMetaContent('property', 'og:site_name', siteName);
        upsertMetaContent('name', 'twitter:card', twitterCard);

        if (ogImage) {
            upsertMetaContent('property', 'og:image', ogImage);
            upsertMetaContent('property', 'og:image:secure_url', ogImage);
            upsertMetaContent('name', 'twitter:image', String(seo.twitterImage || ogImage).trim());
        }

        if (ogImageAlt) {
            upsertMetaContent('property', 'og:image:alt', ogImageAlt);
            upsertMetaContent('name', 'twitter:image:alt', ogImageAlt);
        }
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
            seo: base.seo || override.seo || null,
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
            var mode = getPageTextMode();
            if (mode === 'off') return;

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

            applySeoPayload(finalPayload);

            applyAttributes(finalPayload.attributes);

            if (mode === 'seo-only') {
                createLanguageSwitcher(lang);
                return;
            }

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
