document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Dropdown de Regiões
    const regionBtn = document.querySelector('.region-pill');
    const regionDropdown = document.querySelector('.region-dropdown');

    if(regionBtn && regionDropdown) {
        regionBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de fechar imediatamente
            regionDropdown.classList.toggle('active');
        });

        // Fechar ao clicar em qualquer lugar fora
        document.addEventListener('click', () => {
            regionDropdown.classList.remove('active');
        });
    }

    // (Opcional) Atualizar o texto do botão ao escolher uma região
    const regionLinks = document.querySelectorAll('.region-dropdown a');
    const regionLabel = document.querySelector('.region-pill span');
    
    regionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // Atualiza Texto
            if(regionLabel) {
                regionLabel.textContent = e.currentTarget.textContent; // Pega o texto limpo, sem a bolinha se possível, mas aqui pega tudo. Ajustaremos se precisar.
                // Mas o textContent do link inclui a bolinha (span), então vai ficar "• Rio de Janeiro". 
                // O original tinha "Rio de Janeiro ▾". 
                // O textContent do link é "\n                                    \n                                    Rio de Janeiro\n                                ".
                // Vamos pegar apenas o texto do nó de texto, ignorando o span .dot
                 const textNode = Array.from(e.currentTarget.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
                 if(textNode) {
                     regionLabel.textContent = textNode.textContent.trim();
                 }
            }

            // Atualiza Cores
            const color = e.currentTarget.getAttribute('data-color');
            if(color) {
                // Atualiza variável global
                document.documentElement.style.setProperty('--cm-red', color);
                // Atualiza cor do botão (caso tenha style inline)
                if(regionBtn) regionBtn.style.backgroundColor = color;
            }
            
            // Fecha dropdown
            regionDropdown.classList.remove('active');
        });
    });
    // Lógica do Carousel de Colunistas
    const colTrack = document.getElementById('colTrack');
    const colPrev = document.getElementById('colPrev');
    const colNext = document.getElementById('colNext');

    if(colTrack && colPrev && colNext) {
        colPrev.addEventListener('click', () => {
            colTrack.scrollBy({
                left: -340, // 320 card + 20 gap
                behavior: 'smooth'
            });
        });

        colNext.addEventListener('click', () => {
            colTrack.scrollBy({
                left: 340,
                behavior: 'smooth'
            });
        });
    }

});