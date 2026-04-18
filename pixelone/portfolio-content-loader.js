(function () {
    'use strict';

    function isPlainObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    async function loadPortfolioSectionTexts() {
        var section = document.getElementById('portfolio');
        if (!section) {
            return;
        }

        var htmlLang = String(document.documentElement.getAttribute('lang') || 'ar').toLowerCase();
        var candidates = ['content/index.portfolio.' + htmlLang + '.json'];

        if (htmlLang !== 'ar') {
            candidates.push('content/index.portfolio.ar.json');
        }

        var payload = null;

        for (var i = 0; i < candidates.length; i += 1) {
            try {
                var response = await fetch(candidates[i], { cache: 'no-store' });
                if (!response.ok) {
                    continue;
                }

                payload = await response.json();
                break;
            } catch (_err) {
                // Continue to next candidate file.
            }
        }

        if (!payload || !isPlainObject(payload.texts)) {
            return;
        }

        var texts = payload.texts;
        var keyedNodes = section.querySelectorAll('[data-portfolio-key]');

        keyedNodes.forEach(function (node) {
            var key = node.getAttribute('data-portfolio-key');
            if (!key) {
                return;
            }

            if (!Object.prototype.hasOwnProperty.call(texts, key)) {
                return;
            }

            node.textContent = String(texts[key]);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPortfolioSectionTexts, { once: true });
    } else {
        loadPortfolioSectionTexts();
    }
})();
