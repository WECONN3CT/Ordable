// Language Detection & Redirect Script for ORDABLE
// Automatically redirects UK visitors to the English version
// Uses country.is for IP-based geolocation (free & unlimited)

(function() {
    'use strict';

    // Don't redirect if already on English version
    if (window.location.pathname.startsWith('/en/') || window.location.pathname.startsWith('/en')) {
        return;
    }

    // Check if user has manually chosen German
    var languagePreference = localStorage.getItem('ordable_language_preference');
    if (languagePreference === 'de') {
        return;
    }

    // Check if we already detected country (cache for 24h)
    var cachedCountry = sessionStorage.getItem('ordable_country');
    if (cachedCountry) {
        if (cachedCountry === 'GB') {
            redirectToEnglish();
        }
        return;
    }

    // Detect country via IP using country.is (free & unlimited)
    fetch('https://api.country.is')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Cache the result
            sessionStorage.setItem('ordable_country', data.country || 'unknown');

            // Redirect if UK
            if (data.country === 'GB') {
                redirectToEnglish();
            }
        })
        .catch(function(error) {
            // Fallback: check browser language if API fails
            var browserLang = (navigator.language || '').toLowerCase();
            if (browserLang === 'en-gb') {
                redirectToEnglish();
            }
        });

    function redirectToEnglish() {
        var currentPath = window.location.pathname;

        // Map German paths to English paths
        var pathMappings = {
            '/': '/en/',
            '/index.html': '/en/',
            '/leistungen/': '/en/features/',
            '/leistungen': '/en/features/',
            '/vorteile/': '/en/benefits/',
            '/vorteile': '/en/benefits/',
            '/pricing/': '/en/pricing/',
            '/pricing': '/en/pricing/',
            '/story/': '/en/story/',
            '/story': '/en/story/',
            '/enterprise/': '/en/enterprise/',
            '/enterprise': '/en/enterprise/',
            '/anmeldung/': '/en/signup/',
            '/anmeldung': '/en/signup/',
            '/impressum/': '/en/imprint/',
            '/impressum': '/en/imprint/',
            '/datenschutz/': '/en/privacy/',
            '/datenschutz': '/en/privacy/'
        };

        // Find the matching English path
        var newPath = pathMappings[currentPath] || '/en/';

        // Add hash and query string if present
        var newUrl = newPath + window.location.search + window.location.hash;

        // Redirect
        window.location.replace(newUrl);
    }
})();
