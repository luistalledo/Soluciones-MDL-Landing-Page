// JAVASCRIPT ESPECÍFICO PARA MÓVILES - MLD Soluciones

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel móvil
    initializeMobileCarousel();
    
    // Inicializar formulario móvil
    initializeMobileForm();
    
    // Agregar efectos de scroll suave
    initializeSmoothScroll();
    
    // Inicializar animaciones móviles
    initializeMobileAnimations();
});

/* ==========================================
   CARRUSEL MÓVIL
   ========================================== */

let currentSlide = 0;
let slideInterval;

function initializeMobileCarousel() {
    const slides = document.querySelectorAll('.mobile-slide');
    const dots = document.querySelectorAll('.mobile-dot');
    const prevBtn = document.querySelector('.mobile-prev');
    const nextBtn = document.querySelector('.mobile-next');
    
    if (!slides.length) return;
    
    // Inicializar primer slide
    showSlide(0);
    
    // Auto-play del carrusel
    startAutoPlay();
    
    // Event listeners para controles
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            previousSlide();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // Pausar auto-play cuando el usuario toca el carrusel
    const carouselContainer = document.querySelector('.mobile-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', stopAutoPlay);
        carouselContainer.addEventListener('touchend', () => {
            setTimeout(startAutoPlay, 3000); // Reanudar después de 3 segundos
        });
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.mobile-slide');
    const dots = document.querySelectorAll('.mobile-dot');
    
    // Remover clases activas
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Establecer slide actual
    currentSlide = index;
    
    // Agregar clases activas
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.mobile-slide');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    const slides = document.querySelectorAll('.mobile-slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/* ==========================================
   FORMULARIO MÓVIL
   ========================================== */

function initializeMobileForm() {
    const form = document.querySelector('.mobile-contact-form form');
    const inputs = document.querySelectorAll('.mobile-form-group input, .mobile-form-group textarea');
    
    if (!form) return;
    
    // Agregar efectos focus a los inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Marcar como focused si ya tiene contenido
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.mobile-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="material-icons">hourglass_empty</i> Enviando...';
        submitBtn.disabled = true;
        
        // Enviar formulario (Formspree manejará el envío real)
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showMobileAlert('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                form.reset();
                // Remover clases focused
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            showMobileAlert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        })
        .finally(() => {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

function showMobileAlert(message, type = 'info') {
    // Crear elemento de alerta móvil
    const alert = document.createElement('div');
    alert.className = `mobile-alert mobile-alert-${type}`;
    alert.innerHTML = `
        <div class="mobile-alert-content">
            <span class="mobile-alert-icon material-icons">
                ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
            </span>
            <span class="mobile-alert-text">${message}</span>
        </div>
    `;
    
    // Estilos CSS inline para la alerta
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        left: 1rem;
        right: 1rem;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.95)' : 
                     type === 'error' ? 'rgba(244, 67, 54, 0.95)' : 
                     'rgba(33, 150, 243, 0.95)'};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    alert.querySelector('.mobile-alert-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.8rem;
    `;
    
    alert.querySelector('.mobile-alert-text').style.cssText = `
        flex: 1;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    // Agregar al DOM
    document.body.appendChild(alert);
    
    // Animar entrada
    setTimeout(() => {
        alert.style.transform = 'translateY(0)';
        alert.style.opacity = '1';
    }, 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        alert.style.transform = 'translateY(-100px)';
        alert.style.opacity = '0';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 5000);
}

/* ==========================================
   SCROLL SUAVE MÓVIL
   ========================================== */

function initializeSmoothScroll() {
    // Scroll suave para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.mobile-navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   ANIMACIONES MÓVILES
   ========================================== */

function initializeMobileAnimations() {
    // Observer para animaciones en scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll(`
        .mobile-about,
        .mobile-services,
        .mobile-contact,
        .mobile-carousel,
        .mobile-service-item,
        .mobile-contact-info,
        .mobile-contact-form
    `);
    
    elementsToAnimate.forEach(element => {
        // Configurar estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        // Observar elemento
        observer.observe(element);
    });
    
    // Animación especial para service items con delay
    const serviceItems = document.querySelectorAll('.mobile-service-item');
    serviceItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ==========================================
   UTILIDADES MÓVILES
   ========================================== */

// Función para manejar orientación de pantalla
function handleOrientationChange() {
    // Recalcular dimensiones del carrusel si es necesario
    const carouselContainer = document.querySelector('.mobile-carousel-container');
    if (carouselContainer) {
        // Forzar recálculo después del cambio de orientación
        setTimeout(() => {
            const currentActiveSlide = document.querySelector('.mobile-slide.active');
            if (currentActiveSlide) {
                currentActiveSlide.style.height = 'auto';
                setTimeout(() => {
                    currentActiveSlide.style.height = '';
                }, 100);
            }
        }, 300);
    }
}

// Detectar cambios de orientación
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Prevenir zoom en iOS cuando se hace doble tap
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Optimización para scroll en móviles
let ticking = false;

function updateScrollEffects() {
    // Aquí podrías agregar efectos adicionales basados en scroll
    // Por ejemplo, cambiar opacidad del navbar
    const navbar = document.querySelector('.mobile-navbar');
    if (navbar && window.scrollY > 100) {
        navbar.style.background = 'rgba(60, 198, 224, 0.98)';
    } else if (navbar) {
        navbar.style.background = 'rgba(60, 198, 224, 0.95)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

/* ==========================================
   INICIALIZACIÓN FINAL
   ========================================== */

// Asegurar que todo esté cargado correctamente
window.addEventListener('load', function() {
    // Ocultar cualquier loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Animar entrada inicial del hero
    const hero = document.querySelector('.mobile-hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Manejo de errores global para móviles
window.addEventListener('error', function(e) {
    console.error('Error en versión móvil:', e.error);
    // Opcionalmente mostrar mensaje de error al usuario
    // showMobileAlert('Ocurrió un error. Por favor recarga la página.', 'error');
});