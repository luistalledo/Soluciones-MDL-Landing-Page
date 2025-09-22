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

// ========================================
// CARRUSEL DE IMÁGENES
// ========================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Función para mostrar slide específico
function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remover active de todos los indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Mostrar slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Activar indicador correspondiente
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

// Función para ir al siguiente slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Función para ir al slide anterior
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

// Función para ir a slide específico (desde indicadores)
function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    showSlide(currentSlideIndex);
}

// Auto-play del carrusel (cada 5 segundos)
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play al hacer hover en el carrusel
const carouselContainer = document.querySelector('.image-carousel');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Inicializar carrusel
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});