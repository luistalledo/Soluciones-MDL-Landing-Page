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