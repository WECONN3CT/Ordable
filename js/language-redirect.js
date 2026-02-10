// Language Detection & Redirect Script for ORDABLE
// Automatically redirects international visitors to their language version
// Uses country.is for IP-based geolocation (free & unlimited)

(function() {
    'use strict';

    // Don't redirect if already on a translated version
    if (window.location.pathname.startsWith('/en/') ||
        window.location.pathname.startsWith('/en') ||
        window.location.pathname.startsWith('/fr/') ||
        window.location.pathname.startsWith('/fr')) {
        return;
    }

    // Check if user has manually chosen German
    var languagePreference = localStorage.getItem('ordable_language_preference');
    if (languagePreference === 'de') {
        return;
    }

    // Check if we already detected country (cache for session)
    var cachedCountry = sessionStorage.getItem('ordable_country');
    if (cachedCountry) {
        if (cachedCountry === 'GB') {
            redirectToLanguage('en');
        } else if (cachedCountry === 'FR') {
            redirectToLanguage('fr');
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

            // Redirect based on country
            if (data.country === 'GB') {
                redirectToLanguage('en');
            } else if (data.country === 'FR') {
                redirectToLanguage('fr');
            }
        })
        .catch(function(error) {
            // Fallback: check browser language if API fails
            var browserLang = (navigator.language || '').toLowerCase();
            if (browserLang === 'en-gb' || browserLang === 'en') {
                redirectToLanguage('en');
            } else if (browserLang === 'fr-fr' || browserLang === 'fr') {
                redirectToLanguage('fr');
            }
        });

    function redirectToLanguage(lang) {
        var currentPath = window.location.pathname;

        // Map German paths to translated paths
        var pathMappings = {
            '/': '/' + lang + '/',
            '/index.html': '/' + lang + '/',
            '/leistungen/': '/' + lang + '/features/',
            '/leistungen': '/' + lang + '/features/',
            '/vorteile/': '/' + lang + '/benefits/',
            '/vorteile': '/' + lang + '/benefits/',
            '/pricing/': '/' + lang + '/pricing/',
            '/pricing': '/' + lang + '/pricing/',
            '/story/': '/' + lang + '/story/',
            '/story': '/' + lang + '/story/',
            '/enterprise/': '/' + lang + '/enterprise/',
            '/enterprise': '/' + lang + '/enterprise/',
            '/anmeldung/': '/' + lang + '/signup/',
            '/anmeldung': '/' + lang + '/signup/',
            '/impressum/': '/' + lang + '/imprint/',
            '/impressum': '/' + lang + '/imprint/',
            '/datenschutz/': '/' + lang + '/privacy/',
            '/datenschutz': '/' + lang + '/privacy/'
        };

        // Find the matching translated path
        var newPath = pathMappings[currentPath] || '/' + lang + '/';

        // Add hash and query string if present
        var newUrl = newPath + window.location.search + window.location.hash;

        // Redirect
        window.location.replace(newUrl);
    }
})();
