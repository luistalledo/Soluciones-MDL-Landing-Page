// Animación de entrada para las tarjetas y secciones
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .benefit-card, .testimonial-card, .about-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s, transform 0.8s';
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = 'translateY(40px)';
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.service-card, .benefit-card, .testimonial-card, .about-card').forEach(el => {
        observer.observe(el);
    });

    // Formulario de contacto
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por contactarnos! Pronto te responderemos.');
            form.reset();
        });
    }
});