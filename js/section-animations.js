// Animaciones únicas para contenido interno de cada sección
document.addEventListener('DOMContentLoaded', function () {
    // Delay para permitir que el navbar se inicialice primero
    setTimeout(function() {
    // Función para agregar animaciones CSS dinámicamente
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animaciones base para elementos internos */
            .animate-content {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-content.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Permitir re-animaciones */
            .visible {
                animation-fill-mode: forwards !important;
            }
            
            /* Reset de animaciones cuando no está visible */
            :not(.visible) {
                animation: none !important;
            }
            
            /* Hero: Contenido con efecto typewriter y zoom */
            .hero .hero-title {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
                transition: all 1s ease-out;
            }
            
            .hero .hero-title.visible {
                opacity: 1;
                transform: scale(1) translateY(0);
                animation: heroTitleZoom 1.2s ease-out;
            }
            
            .hero .hero-sub {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s ease-out 0.3s;
            }
            
            .hero .hero-sub.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            .hero .cta-hero {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
                transition: all 0.6s ease-out 0.6s;
            }
            
            .hero .cta-hero.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
                animation: ctaBounce 0.8s ease-out 0.6s;
            }
            
            @keyframes heroTitleZoom {
                0% {
                    transform: scale(0.8) translateY(20px);
                    opacity: 0;
                }
                70% {
                    transform: scale(1.05) translateY(-5px);
                    opacity: 0.9;
                }
                100% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes ctaBounce {
                0% { transform: translateY(30px) scale(0.9); }
                50% { transform: translateY(-10px) scale(1.05); }
                100% { transform: translateY(0) scale(1); }
            }
            
            /* About: Título desde izquierda, párrafo desde derecha, cards flip */
            .section-bg1 h2 {
                opacity: 0;
                transform: translateX(-80px) rotate(-3deg);
                transition: all 0.8s ease-out;
            }
            
            .section-bg1 h2.visible {
                opacity: 1;
                transform: translateX(0) rotate(0deg);
            }
            
            .section-bg1 p {
                opacity: 0;
                transform: translateX(80px);
                transition: all 0.8s ease-out 0.2s;
            }
            
            .section-bg1 p.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            .section-bg1 .about-card {
                opacity: 1;
                transform: none;
                transition: none;
            }
            
            .section-bg1 .about-card.visible {
                opacity: 1;
                transform: none;
            }
            
            .section-bg1 .about-card:nth-child(1) { transition-delay: 0.4s; }
            .section-bg1 .about-card:nth-child(2) { transition-delay: 0.6s; }
            
            /* Services: Título con efecto typewriter, cards desde abajo con bounce */
            .section-bg2 h2 {
                opacity: 0;
                transform: scale(0.5);
                transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .section-bg2 h2.visible {
                opacity: 1;
                transform: scale(1);
                animation: titleBounce 1s ease-out;
            }
            
            .section-bg2 .service-card {
                opacity: 0;
                transform: translateY(100px) rotate(5deg);
                transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .section-bg2 .service-card.visible {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            
            .section-bg2 .service-card:nth-child(1) { transition-delay: 0.1s; }
            .section-bg2 .service-card:nth-child(2) { transition-delay: 0.2s; }
            .section-bg2 .service-card:nth-child(3) { transition-delay: 0.3s; }
            .section-bg2 .service-card:nth-child(4) { transition-delay: 0.4s; }
            .section-bg2 .service-card:nth-child(5) { transition-delay: 0.5s; }
            .section-bg2 .service-card:nth-child(6) { transition-delay: 0.6s; }
            
            @keyframes titleBounce {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.2); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            /* Benefits: Título con rotación, cards con efecto matrix */
            .section-bg3 h2 {
                opacity: 0;
                transform: rotate(-10deg) scale(0.8) translateY(-30px);
                transition: all 1s ease-out;
            }
            
            .section-bg3 h2.visible {
                opacity: 1;
                transform: rotate(0deg) scale(1) translateY(0);
            }
            
            .section-bg3 .benefit-card {
                opacity: 0;
                transform: perspective(1000px) rotateX(-90deg) translateZ(-100px);
                transition: all 0.8s ease-out;
            }
            
            .section-bg3 .benefit-card.visible {
                opacity: 1;
                transform: perspective(1000px) rotateX(0deg) translateZ(0px);
            }
            
            .section-bg3 .benefit-card:nth-child(1) { transition-delay: 0.2s; }
            .section-bg3 .benefit-card:nth-child(2) { transition-delay: 0.4s; }
            .section-bg3 .benefit-card:nth-child(3) { transition-delay: 0.6s; }
            .section-bg3 .benefit-card:nth-child(4) { transition-delay: 0.8s; }
            
            /* Testimonials: Título ondulante, cards con efecto slide alternado */
            .section-bg4 h2 {
                opacity: 0;
                transform: translateY(-50px) skewX(-10deg);
                transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .section-bg4 h2.visible {
                opacity: 1;
                transform: translateY(0) skewX(0deg);
            }
            
            .section-bg4 .testimonial-card:nth-child(odd) {
                opacity: 0;
                transform: translateX(-150px) rotate(-10deg);
                transition: all 0.8s ease-out;
            }
            
            .section-bg4 .testimonial-card:nth-child(even) {
                opacity: 0;
                transform: translateX(150px) rotate(10deg);
                transition: all 0.8s ease-out;
            }
            
            .section-bg4 .testimonial-card.visible {
                opacity: 1;
                transform: translateX(0) rotate(0deg);
            }
            
            .section-bg4 .testimonial-card:nth-child(1) { transition-delay: 0.2s; }
            .section-bg4 .testimonial-card:nth-child(2) { transition-delay: 0.4s; }
            .section-bg4 .testimonial-card:nth-child(3) { transition-delay: 0.6s; }
            
            /* Contact: Título con efecto glow, formulario desde abajo, info desde arriba */
            .section-bg5 h2 {
                opacity: 0;
                transform: scale(0.7);
                transition: all 1s ease-out;
                filter: blur(5px);
            }
            
            .section-bg5 h2.visible {
                opacity: 1;
                transform: scale(1);
                filter: blur(0px);
                animation: titleGlow 1.2s ease-out;
            }
            
            .section-bg5 .contact-info {
                opacity: 0;
                transform: translateY(-100px) rotateX(30deg);
                transition: all 1s ease-out 0.3s;
            }
            
            .section-bg5 .contact-info.visible {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
            
            .section-bg5 .contact-form-section {
                opacity: 0;
                transform: translateY(100px) scale(0.9);
                transition: all 1s ease-out 0.5s;
            }
            
            .section-bg5 .contact-form-section.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            
            @keyframes titleGlow {
                0% { 
                    transform: scale(0.7);
                    filter: blur(5px);
                    text-shadow: 0 0 20px #3cc6e0;
                }
                50% { 
                    transform: scale(1.1);
                    filter: blur(0px);
                    text-shadow: 0 0 30px #3cc6e0, 0 0 40px #3cc6e0;
                }
                100% { 
                    transform: scale(1);
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
            }
            
            /* Animación para campos de formulario */
            .contact-form .form-group {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s ease-out;
            }
            
            .contact-form.visible .form-group {
                opacity: 1;
                transform: translateX(0);
            }
            
            .contact-form.visible .form-group:nth-child(1) { transition-delay: 0.1s; }
            .contact-form.visible .form-group:nth-child(2) { transition-delay: 0.2s; }
            .contact-form.visible .form-group:nth-child(3) { transition-delay: 0.3s; }
            .contact-form.visible .form-group:nth-child(4) { transition-delay: 0.4s; }
            
            .contact-form .cta-form {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
                transition: all 0.6s ease-out 0.6s;
            }
            
            .contact-form.visible .cta-form {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Agregar estilos de animación
    addAnimationStyles();
    
    // Seleccionar elementos específicos para animar (NO secciones completas)
    const elementsToAnimate = document.querySelectorAll(`
        .hero-title, .hero-sub, .cta-hero,
        .section-bg1 h2, .section-bg1 > p, .about-card,
        .section-bg2 h2, .service-card,
        .section-bg3 h2, .benefit-card,
        .section-bg4 h2, .testimonial-card,
        .section-bg5 h2, .contact-info, .contact-form-section, .contact-form
    `);
    
    // Observer para activar animaciones de contenido (diferente al navbar)
    const animationOptions = {
        threshold: [0.1, 0.3],
        rootMargin: '-50px 0px -150px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pequeño delay para asegurar reset antes de animar
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    console.log('Animando elemento:', entry.target.tagName, entry.target.className);
                }, 50);
            } else {
                // Remover la clase cuando sale de vista para poder re-animar
                entry.target.classList.remove('visible');
                // Force reflow para resetear animaciones
                entry.target.offsetHeight;
            }
        });
    }, animationOptions);
    
    // Observar todos los elementos de contenido
    elementsToAnimate.forEach(element => {
        if (element) {
            animationObserver.observe(element);
        }
    });
    
    // Animar hero inmediatamente con delay escalonado
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.classList.add('visible');
    }, 500);
    
    setTimeout(() => {
        const heroSub = document.querySelector('.hero-sub');
        if (heroSub) heroSub.classList.add('visible');
    }, 800);
    
    setTimeout(() => {
        const heroBtn = document.querySelector('.cta-hero');
        if (heroBtn) heroBtn.classList.add('visible');
    }, 1100);
    
    }, 200); // Fin del setTimeout que envuelve todo
});

// EMERGENCIA - FORZAR VISIBILIDAD DE TARJETAS ABOUT
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🚨 EMERGENCIA: Forzando visibilidad de tarjetas about...');
        
        const aboutCards = document.querySelectorAll('.about-card');
        aboutCards.forEach((card, index) => {
            console.log(`📋 Procesando tarjeta about ${index + 1}:`, card);
            
            // SIN ANIMACIÓN - SOLO TEXTO VISIBLE
            card.style.cssText = `
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                position: relative !important;
                overflow: visible !important;
                text-align: center !important;
                padding: 2em !important;
                transform: none !important;
            `;
            
            // NO hay animación, solo hacer visible inmediatamente
            card.classList.add('visible');
            console.log(`✅ Tarjeta ${index + 1} - SIN ANIMACIÓN, VISIBLE INMEDIATAMENTE`);
            
            // Verificar contenido y FORZAR VISIBILIDAD
            const title = card.querySelector('h3');
            const text = card.querySelector('p');
            
            if (title) {
                console.log(`  📝 Título: "${title.textContent}"`);
                title.style.cssText = `
                    color: #1a252f !important;
                    text-align: center !important;
                    margin: 0 0 1em 0 !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                `;
            }
            
            if (text) {
                console.log(`  📄 Texto: "${text.textContent}"`);
                text.style.cssText = `
                    color: #2c3e50 !important;
                    text-align: center !important;
                    margin: 0 !important;
                    word-wrap: break-word !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                `;
            }
        });
        
        console.log('✅ EMERGENCIA: Tarjetas about forzadas a ser visibles');
    }, 100);
});