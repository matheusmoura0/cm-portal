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

        const regionLinks = regionList.querySelectorAll('a');
        regionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const name = link.getAttribute('data-name');
                const color = link.getAttribute('data-color');
                const temp = link.getAttribute('data-temp');

                if (regionTextLabel && name) regionTextLabel.textContent = name;
                if (weatherText && temp && name) weatherText.innerHTML = `${name}: <strong>${temp}</strong> Parcialmente nublado`;

                if (color) {
                    document.documentElement.style.setProperty('--cm-red', color);
                    if(topBar) topBar.style.backgroundColor = color;
                    regionBtn.style.backgroundColor = color;
                }
                regionList.classList.remove('active');
            });
        });
    }
});