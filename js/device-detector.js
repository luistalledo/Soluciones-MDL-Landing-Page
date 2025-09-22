// DETECTOR DE DISPOSITIVOS - MLD Soluciones
// Este script detecta si el usuario está en un dispositivo móvil y lo redirige automáticamente

(function() {
    'use strict';
    
    // Función para detectar dispositivos móviles
    function isMobileDevice() {
        // Detectar por User Agent (más agresivo)
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'mobile', 'android', 'iphone', 'ipad', 'ipod', 
            'blackberry', 'windows phone', 'opera mini', 
            'iemobile', 'wpdesktop', 'kindle', 'silk', 'ebb'
        ];
        
        const isMobileUA = mobileKeywords.some(keyword => 
            userAgent.includes(keyword)
        );
        
        // Detectar por tamaño de pantalla (más específico)
        const isMobileScreen = window.innerWidth <= 768 || 
                              (window.innerWidth <= 1024 && window.innerHeight <= 768);
        
        // Detectar por eventos touch
        const isTouchDevice = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0 ||
                             navigator.msMaxTouchPoints > 0;
        
        // Si el User Agent dice que es móvil, es móvil (prioridad alta)
        if (isMobileUA) {
            return true;
        }
        
        // Si es táctil Y pantalla pequeña, es móvil
        if (isTouchDevice && isMobileScreen) {
            return true;
        }
        
        // Si es pantalla muy pequeña (menos de 480px), definitivamente móvil
        if (window.innerWidth <= 480) {
            return true;
        }
        
        return false;
    }
    
    // Función para obtener parámetros URL
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Función para verificar si ya estamos en la versión móvil
    function isOnMobilePage() {
        return window.location.pathname.includes('index-mobile.html') ||
               window.location.pathname.includes('mobile');
    }
    
    // Función para verificar si el usuario forzó la versión desktop
    function isDesktopForced() {
        return getURLParameter('desktop') === 'true' ||
               localStorage.getItem('forceDesktop') === 'true';
    }
    
    // Función principal de redirección
    function handleMobileRedirection() {
        // Si ya estamos en móvil, no hacer nada
        if (isOnMobilePage()) {
            return;
        }
        
        // Si el usuario forzó desktop, respetar su elección
        if (isDesktopForced()) {
            return;
        }
        
        // Si es dispositivo móvil, redirigir
        if (isMobileDevice()) {
            // Preservar parámetros URL si los hay
            const currentParams = window.location.search;
            const hash = window.location.hash;
            
            // Construir URL de redirección
            let redirectURL = window.location.pathname.replace('index.html', 'index-mobile.html');
            
            // Si estamos en la raíz, agregar index-mobile.html
            if (redirectURL === '/' || redirectURL.endsWith('/')) {
                redirectURL += 'index-mobile.html';
            }
            
            // Agregar parámetros y hash si existen
            redirectURL += currentParams + hash;
            
            // Redirigir
            window.location.href = redirectURL;
            return;
        }
    }
    
    // Función para crear botón de scroll to top
    function createScrollToTopButton() {
        // Solo crear en la versión desktop
        if (isOnMobilePage()) {
            return;
        }
        
        // Crear botón para volver arriba
        const scrollButton = document.createElement('button');
        scrollButton.setAttribute('data-scroll-top', 'true');
        scrollButton.innerHTML = `
            <i class="material-icons">keyboard_arrow_up</i>
        `;
        scrollButton.title = 'Volver al inicio';
        
        // Estilos del botón scroll to top
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3cc6e0, #42a5f5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(60, 198, 224, 0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateY(20px);
        `;
        
        // Mostrar/ocultar según scroll
        function toggleScrollButton() {
            if (window.scrollY > 300) {
                scrollButton.style.opacity = '0.8';
                scrollButton.style.transform = 'translateY(0)';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.transform = 'translateY(20px)';
            }
        }
        
        // Efectos hover
        scrollButton.addEventListener('mouseenter', function() {
            if (window.scrollY > 300) {
                this.style.opacity = '1';
                this.style.transform = 'translateY(-2px) scale(1.1)';
                this.style.boxShadow = '0 6px 20px rgba(60, 198, 224, 0.4)';
            }
        });
        
        scrollButton.addEventListener('mouseleave', function() {
            if (window.scrollY > 300) {
                this.style.opacity = '0.8';
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(60, 198, 224, 0.3)';
            }
        });
        
        // Click handler - scroll to top
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Agregar al DOM
        document.body.appendChild(scrollButton);
        
        // Escuchar scroll para mostrar/ocultar
        window.addEventListener('scroll', toggleScrollButton);
        
        // Verificación inicial
        toggleScrollButton();
    }
    
    // Función para crear switcher en móvil (a desktop)
    function createDesktopSwitcher() {
        // Solo crear en la versión móvil
        if (!isOnMobilePage()) {
            return;
        }
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createDesktopSwitcherElement);
        } else {
            createDesktopSwitcherElement();
        }
    }
    
    function createDesktopSwitcherElement() {
        // Crear botón para cambiar a desktop
        const switcherButton = document.createElement('button');
        switcherButton.innerHTML = `
            <i class="material-icons">desktop_windows</i>
            <span>Ver versión escritorio</span>
        `;
        
        // Estilos del botón móvil
        switcherButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            color: #2c3e50;
            border: 2px solid rgba(60, 198, 224, 0.3);
            border-radius: 25px;
            padding: 10px 16px;
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            opacity: 0.9;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        `;
        
        // Click handler
        switcherButton.addEventListener('click', function() {
            localStorage.setItem('forceDesktop', 'true');
            
            const currentParams = window.location.search;
            const hash = window.location.hash;
            let desktopURL = window.location.pathname.replace('index-mobile.html', 'index.html');
            
            // Agregar parámetro para forzar desktop
            const urlParams = new URLSearchParams(currentParams);
            urlParams.set('desktop', 'true');
            
            window.location.href = desktopURL + '?' + urlParams.toString() + hash;
        });
        
        // Agregar al DOM
        document.body.appendChild(switcherButton);
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            handleMobileRedirection();
            createScrollToTopButton();
            createDesktopSwitcher();
        });
    } else {
        handleMobileRedirection();
        createScrollToTopButton();
        createDesktopSwitcher();
    }
    
    // También ejecutar inmediatamente para redirecciones rápidas
    handleMobileRedirection();
    
    // Función para limpiar botón scroll si se detecta que ya no es necesario
    function cleanupScrollButton() {
        if (!isOnMobilePage() && isMobileDevice() && !isDesktopForced()) {
            // Remover botón si existe
            const existingButton = document.querySelector('button[data-scroll-top]');
            if (existingButton) {
                existingButton.remove();
            }
            
            // Redirigir si es necesario
            setTimeout(() => {
                handleMobileRedirection();
            }, 500);
        }
    }
    
    // Monitorear cambios de ventana
    window.addEventListener('resize', function() {
        setTimeout(cleanupScrollButton, 300);
    });
    
    // Limpiar forzado de desktop después de 24 horas
    setTimeout(function() {
        localStorage.removeItem('forceDesktop');
    }, 24 * 60 * 60 * 1000);
    
})();