document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA ATUAL
    const dateElement = document.getElementById('current-date-full');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateString = now.toLocaleDateString('pt-BR', options);
        dateElement.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    // 2. DROPDOWN DE REGIÃO
    const regionBtn = document.getElementById('region-btn');
    const regionList = document.getElementById('region-list');
    const regionTextLabel = document.getElementById('current-region-text');
    const weatherText = document.getElementById('weather-text');
    const topBar = document.querySelector('.top-bar');

    if (regionBtn && regionList) {
        regionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            regionList.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!regionList.contains(e.target) && !regionBtn.contains(e.target)) {
                regionList.classList.remove('active');
            }
        });

        const regionHeaderConfig = {
            'Rio de Janeiro': {
                title: 'Correio da Manhã',
                subtitle: '',
                bgColor: '#fff', // White header for Rio
                textColor: 'dark'
            },
            'Sul Fluminense': {
                title: 'Correio Sul Fluminense',
                subtitle: 'UMA PUBLICAÇÃO DO CORREIO DA MANHÃ',
                bgColor: '#D32F2F', // Red
                textColor: 'light'
            },
            'Petropolitano': {
                title: 'Correio Petropolitano',
                subtitle: 'UMA PUBLICAÇÃO DO CORREIO DA MANHÃ',
                bgColor: '#D32F2F', // Red
                textColor: 'light'
            },
            'Campinas e Região': {
                title: 'Correio da Manhã',
                subtitle: 'ESTADO DE SÃO PAULO',
                bgColor: '#003366', // Dark Blue
                textColor: 'light'
            },
            'Distrito Federal': {
                title: 'Correio da Manhã',
                subtitle: 'EDIÇÃO DISTRITO FEDERAL',
                bgColor: '#0288D1', // Light Blue
                textColor: 'light'
            }
        };

        const regionLinks = regionList.querySelectorAll('a');
        regionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const name = link.getAttribute('data-name');
                const color = link.getAttribute('data-color');
                const temp = link.getAttribute('data-temp');

                if (regionTextLabel && name) regionTextLabel.textContent = name;
                if (weatherText && temp && name) weatherText.innerHTML = `${name}: <strong>${temp}</strong> Parcialmente nublado`;

                // --- HEADER UPDATE LOGIC ---
                const config = regionHeaderConfig[name];
                const mainHeader = document.querySelector('.main-header');
                const logoLink = document.querySelector('.logo');
                const logoH1 = logoLink.querySelector('h1');
                const headerSearch = document.querySelector('.header-search');
                
                if (config && mainHeader && logoH1) {
                    mainHeader.style.backgroundColor = config.bgColor;
                    logoH1.textContent = config.title;

                    // Subtitle handling
                    let subtitleEl = logoLink.querySelector('.header-subtitle');
                    if (config.subtitle) {
                        if (!subtitleEl) {
                            subtitleEl = document.createElement('span');
                            subtitleEl.classList.add('header-subtitle');
                            logoLink.appendChild(subtitleEl);
                        }
                        subtitleEl.textContent = config.subtitle;
                        subtitleEl.style.display = 'block';
                    } else {
                        if (subtitleEl) subtitleEl.style.display = 'none';
                    }

                    // Theme handling (Light/Dark text)
                    if (config.textColor === 'light') {
                        logoLink.classList.add('light-theme');
                        if(headerSearch) headerSearch.classList.add('light-theme');
                    } else {
                        logoLink.classList.remove('light-theme');
                        if(headerSearch) headerSearch.classList.remove('light-theme');
                    }
                }

                // Top Bar Color Update (Independent of header, keeps original logic or adapts)
                // Maintaining original logic partially but prioritizing header config colors if needed
                // Top Bar Color Update
                if (color) {
                     let applyColor = color;
                     // Override for specific regions to match the Red Header
                     if (name === 'Sul Fluminense' || name === 'Petropolitano') {
                         applyColor = '#D32F2F';
                     }

                     document.documentElement.style.setProperty('--cm-red', applyColor);
                     if(topBar) topBar.style.backgroundColor = applyColor;
                     if(regionBtn) regionBtn.style.backgroundColor = applyColor;
                }
                
                // Specific fix for Rio (Standard) to ensure it returns to white/red
                if (name === 'Rio de Janeiro') {
                     if(topBar) topBar.style.backgroundColor = '#D32F2F'; // Reset to default red
                     if(regionBtn) regionBtn.style.backgroundColor = '#D32F2F';
                     document.documentElement.style.setProperty('--cm-red', '#D32F2F');
                }


                // Update Nav Bar Region and Dropdown
                const navRegionLink = document.getElementById('nav-region-link');
                const navRegionDropdown = document.getElementById('nav-region-dropdown');

                const subRegions = {
                    'Rio de Janeiro': ['Capital', 'Baixada Fluminense', 'Niterói e São Gonçalo', 'Interior'],
                    'Sul Fluminense': ['Angra dos Reis', 'Barra do Piraí', 'Barra Mansa', 'Itatiaia', 'Paraty', 'Pinheiral', 'Piraí', 'Porto Real', 'Quatis', 'Volta Redonda', 'Resende', 'Rio Claro', 'Valença', 'Vassouras'],
                    'Petropolitano': ['Petrópolis', 'Teresópolis', 'Região Serrana'],
                    'Campinas e Região': ['Estado de São Paulo', 'Região Metropolitana di Campinas', 'Campinas', 'Interior de São Paulo'],
                    'Distrito Federal': ['Brasília', 'Taguatinga', 'Plano Piloto']
                };

                if (navRegionLink && name) {
                    // Update main link text, keeping the arrow
                    let displayNavName = name;
                    if (name === 'Sul Fluminense') displayNavName = 'Região do Vale';
                    
                    navRegionLink.innerHTML = `${displayNavName} <span class="arrow-down">⌄</span>`;
                }

                if (navRegionDropdown && subRegions[name]) {
                    // Clear existing items
                    navRegionDropdown.innerHTML = '';
                    // Add new items
                    subRegions[name].forEach(sub => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = 'editoria.html';
                        a.textContent = sub;
                        li.appendChild(a);
                        navRegionDropdown.appendChild(li);
                    });
                }

                regionList.classList.remove('active');
            });
        });
    }
});