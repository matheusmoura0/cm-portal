/**
 * Correio da Manhã - Region Context Manager
 * Handles dynamic region selection, header theming, and link persistence.
 */

const REGIONS = {
    'rio': { name: 'Rio de Janeiro', class: 'pill-rio' },
    'sul': { name: 'Sul Fluminense', class: 'pill-sul' },
    'petropolis': { name: 'Petropolitana', class: 'pill-petropolis' },
    'serrana': { name: 'Serrana', class: 'pill-serrana' },
    'sp': { name: 'São Paulo', class: 'pill-sp' }
};

const DOM_ELEMENTS = {
    pill: '.header-context-pill',
    pillText: '.header-context-pill strong',
    pillDropdown: '.region-dropdown-menu',
    topCity: 'top-city',
    menuRegion: 'menu-region',
    body: 'body'
};

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    const regionKey = getRegionFromUrl();
    const regionData = REGIONS[regionKey] || REGIONS['rio'];

    applyRegionTheme(regionKey, regionData);
    setupDropdownInteraction();
    persistRegionInLinks(regionKey);
}

function getRegionFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('region') || 'rio';
}

function applyRegionTheme(regionKey, regionData) {
    const pill = document.querySelector(DOM_ELEMENTS.pill);
    const pillText = document.querySelector(DOM_ELEMENTS.pillText);
    const topCity = document.getElementById(DOM_ELEMENTS.topCity);
    const menuRegion = document.getElementById(DOM_ELEMENTS.menuRegion);

    if (!pill) return;

    // 1. Update Body Theme (Top Bar Color)
    const allRegionClasses = Object.keys(REGIONS).map(k => `region-${k}`);
    document.body.classList.remove(...allRegionClasses);
    document.body.classList.add(`region-${regionKey}`);

    // 2. Update Header Context Pill
    // Remove all possible region/variant classes
    const allPillClasses = Object.values(REGIONS).map(r => r.class);
    pill.classList.remove(...allPillClasses, 'pill-politica', 'pill-region');
    
    pill.classList.add(regionData.class);
    pillText.textContent = regionData.name;

    // 3. Update Top Bar Location Text
    if (topCity) {
        topCity.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${regionData.name} | 34°C Parcialmente nublado`;
    }

    // 4. Update Main Menu Region Link
    if (menuRegion) {
        menuRegion.textContent = regionData.name;
    }
}

function setupDropdownInteraction() {
    const pill = document.querySelector(DOM_ELEMENTS.pill);
    const dropdown = document.querySelector(DOM_ELEMENTS.pillDropdown);

    if (!pill || !dropdown) return;

    // Handle Article Page Redirection Logic
    const isArticlePage = window.location.pathname.includes('article.html');
    if (isArticlePage) {
        const dropdownLinks = dropdown.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            const regionParam = link.getAttribute('href'); 
            link.href = `index.html${regionParam}`;
        });
    }

    // Toggle Dropdown
    pill.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        pill.classList.toggle('active');
    });

    // Close on Outside Click
    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
        pill.classList.remove('active');
    });
}

function persistRegionInLinks(regionKey) {
    const navLinks = document.querySelectorAll('a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Only modify internal .html links that don't already have query params
        if (href && href.endsWith('.html') && !href.includes('?')) {
            link.href = `${href}?region=${regionKey}`;
        }
    });
}
