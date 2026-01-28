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
            'Selecione a região': {
                title: 'Correio da Manhã',
                subtitle: 'PORTAL',
                bgColor: '#D32F2F', // Red
                textColor: 'light'
            },
            'Rio de Janeiro': {
                title: 'Correio da Manhã',
                subtitle: 'EDIÇÃO RIO DE JANEIRO',
                bgColor: '#D32F2F', // Red
                textColor: 'light'
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
                subtitle: 'CAMPINAS E REGIÃO',
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
                        // Add display:block inline to ensure it breaks line if needed, matching index.html style
                        subtitleEl.style.display = 'block';
                    } else {
                        if (subtitleEl) subtitleEl.remove();
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

    // 3. LOAD MORE BUTTON LOGIC
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const newsGrid = document.querySelector('.news-grid-2col');

    if (loadMoreBtn && newsGrid) {
        const moreNewsData = [
            { tag: 'ECONOMIA', title: 'Startups do Rio recebem aporte milionário para expansão', excerpt: 'Setor de tecnologia segue em alta com novos investimentos.', date: '15/01/2025', author: 'Ana Costa', img: 'https://placehold.co/400x250/EEE/333?text=ECONOMIA' },
            { tag: 'ESPORTES', title: 'Flamengo anuncia reforço de peso para a temporada', excerpt: 'Novo atacante chega com status de titular absoluto.', date: '15/01/2025', author: 'Carlos Souza', img: 'https://placehold.co/400x250/EEE/333?text=ESPORTES' },
            { tag: 'CULTURA', title: 'Exposição no MAM celebra 100 anos de modernismo', excerpt: 'Mostra reúne obras inéditas de artistas brasileiros.', date: '15/01/2025', author: 'Redação', img: 'https://placehold.co/400x250/EEE/333?text=CULTURA' },
            { tag: 'MUNDO', title: 'Acordo climático avança em conferência internacional', excerpt: 'Países se comprometem com metas mais ambiciosas.', date: '15/01/2025', author: 'Redação', img: 'https://placehold.co/400x250/EEE/333?text=MUNDO' }
        ];

        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading state
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Carregando...';
            loadMoreBtn.disabled = true;

            setTimeout(() => {
                moreNewsData.forEach(news => {
                    const article = document.createElement('article');
                    article.className = 'news-card';
                    article.innerHTML = `
                        <a href="materia.html">
                            <figure class="img-wrap-tag"><span class="tag-floating">${news.tag}</span><img src="${news.img}"></figure>
                            <div class="news-content-wrap">
                                <h4>${news.title}</h4>
                                <p class="excerpt-small">${news.excerpt}</p>
                                <div class="meta-info">${news.author} • ${news.date}</div>
                            </div>
                        </a>
                    `;
                    newsGrid.appendChild(article);
                });

                // Restore button
                loadMoreBtn.innerText = originalText;
                loadMoreBtn.disabled = false;
            }, 500); 
        });
    }
});