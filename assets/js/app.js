// Função para rolar suavemente para uma seção quando um link é clicado
document.querySelectorAll('.leis-ohm a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Adiciona classe de destaque temporário ao link
            anchor.classList.add('highlight');
            setTimeout(() => {
                anchor.classList.remove('highlight');
            }, 1000); // Remove a classe de destaque após 1 segundo
        }
    });
});
