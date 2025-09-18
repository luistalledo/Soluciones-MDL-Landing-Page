document.addEventListener('DOMContentLoaded', () => {
    // Desplazamiento suave para la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de entrada para secciones y tarjetas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('service-card') || entry.target.classList.contains('pricing-card')) {
                    entry.target.classList.add('animate-in');
                } else if (entry.target.tagName === 'SECTION') {
                    entry.target.classList.add('section-in');
                }
            } else {
                if (entry.target.classList.contains('service-card') || entry.target.classList.contains('pricing-card')) {
                    entry.target.classList.remove('animate-in');
                } else if (entry.target.tagName === 'SECTION') {
                    entry.target.classList.remove('section-in');
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section, .service-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
    // Animar la sección principal al cargar
    const hero = document.querySelector('.hero-section');
    if (hero) {
        setTimeout(() => hero.classList.add('section-in'), 100);
    }

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Aquí puedes agregar la lógica para enviar los datos del formulario a un servidor.
            // Por ahora, solo mostraremos un mensaje de éxito.

            const name = document.getElementById('name').value;
            alert(`¡Gracias, ${name}! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.`);

            // Opcional: limpiar el formulario después de enviar
            contactForm.reset();
        });
    }
});