/**
 * MLD SOLUCIONES - MAIN JAVASCRIPT
 * ═══════════════════════════════════════════
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════
    // LENIS SMOOTH SCROLL INITIALIZATION
    // ═══════════════════════════════════════════
    const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ═══════════════════════════════════════════
    // NAVBAR SCROLL EFFECT
    // ═══════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    // Use Lenis scroll event instead of window scroll
    lenis.on('scroll', handleNavbarScroll);

    // ═══════════════════════════════════════════
    // SCROLL TO TOP BUTTON
    // ═══════════════════════════════════════════
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    function handleScrollToTopVisibility() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    lenis.on('scroll', handleScrollToTopVisibility);
    
    function handleScrollToTop(e) {
        e.preventDefault();
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        
        // Force stop any ongoing scroll
        window.scrollTo(0, window.pageYOffset);
        
        lenis.scrollTo('top', {
            duration: isMobile ? 0 : 1.5,
            force: true,
            lock: true
        });
    }
    
    scrollToTopBtn.addEventListener('click', handleScrollToTop);
    scrollToTopBtn.addEventListener('touchend', handleScrollToTop);

    // ═══════════════════════════════════════════
    // INTERSECTION OBSERVER FOR SCROLL REVEAL
    // ═══════════════════════════════════════════
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ═══════════════════════════════════════════
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ═══════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const isMobile = window.innerWidth <= 768;
                lenis.scrollTo(target, {
                    offset: -68,
                    duration: isMobile ? 0 : 1.5
                });
            }
        });
    });

    // ═══════════════════════════════════════════
    // INITIALIZE ON DOM READY
    // ═══════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', function() {
        console.log('MLD Soluciones - Website loaded successfully with Lenis');
        
        // Check for hash in URL on page load
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const isMobile = window.innerWidth <= 768;
                setTimeout(() => {
                    lenis.scrollTo(target, {
                        offset: -68,
                        duration: isMobile ? 0 : 1.5
                    });
                }, 100);
            }
        }
    });

})();
