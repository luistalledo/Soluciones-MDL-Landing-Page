/**
 * NELVOX - MAIN JAVASCRIPT
 * ═══════════════════════════════════════════
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ═══════════════════════════════════════════
        // LENIS SMOOTH SCROLL
        // ═══════════════════════════════════════════
        const lenis = new Lenis({
            duration: 0.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,      // reemplaza smooth: true
            smoothTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1,     // controla velocidad del wheel
            infinite: false
        });

        let rafId = null;

        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Pausa el loop completo cuando la pestaña no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                lenis.stop();
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            } else {
                lenis.start();
                rafId = requestAnimationFrame(raf);
            }
        });

        // ═══════════════════════════════════════════
        // NAVBAR SCROLL EFFECT
        // ═══════════════════════════════════════════
        const navbar = document.getElementById('navbar');
        let navbarTicking = false;

        function handleNavbarScroll() {
            if (navbarTicking) return;
            navbarTicking = true;

            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                navbarTicking = false;
            });
        }

        lenis.on('scroll', handleNavbarScroll);

        // ═══════════════════════════════════════════
        // SCROLL TO TOP BUTTON
        // ═══════════════════════════════════════════
        const scrollToTopBtn = document.getElementById('scrollToTop');
        let scrollTopTicking = false;

        function handleScrollToTopVisibility() {
            if (scrollTopTicking) return;
            scrollTopTicking = true;

            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 400) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
                scrollTopTicking = false;
            });
        }

        lenis.on('scroll', handleScrollToTopVisibility);

        function handleScrollToTop(e) {
            e.preventDefault();
            e.stopPropagation();
            const isMobile = window.innerWidth <= 768;

            lenis.scrollTo('top', {
                duration: isMobile ? 0 : 1,
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
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });

        // ═══════════════════════════════════════════
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ═══════════════════════════════════════════
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const isMobile = window.innerWidth <= 768;

                    lenis.scrollTo(target, {
                        offset: -76,
                        duration: isMobile ? 0 : 1
                    });
                }
            });
        });

        // Check for hash in URL on page load
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const isMobile = window.innerWidth <= 768;
                setTimeout(() => {
                    lenis.scrollTo(target, {
                        offset: -76,
                        duration: isMobile ? 0 : 1
                    });
                }, 100);
            }
        }

        console.log('NELVOX - Website loaded successfully with Lenis');

        // ═══════════════════════════════════════════
        // HERO CAROUSEL AUTO-ROTATION
        // ═══════════════════════════════════════════
        const carouselImages = document.querySelectorAll('.hero-img');
        let currentSlide = 0;
        let isTransitioning = false;
        let carouselInterval = null;

        const firstImg = carouselImages[0];
        if (firstImg) {
            if (firstImg.complete) {
                firstImg.style.opacity = '1';
                firstImg.style.visibility = 'visible';
            } else {
                firstImg.addEventListener('load', () => {
                    firstImg.style.opacity = '1';
                    firstImg.style.visibility = 'visible';
                }, { once: true });
            }
        }

        function rotateCarousel() {
            if (isTransitioning || document.hidden) return;
            isTransitioning = true;

            const currentImage = carouselImages[currentSlide];
            const nextSlide = (currentSlide + 1) % carouselImages.length;
            const nextImage = carouselImages[nextSlide];

            currentImage.style.opacity = '0';

            setTimeout(() => {
                currentImage.classList.remove('active');
                currentSlide = nextSlide;
                nextImage.classList.add('active');
                nextImage.style.opacity = '1';

                setTimeout(() => {
                    isTransitioning = false;
                }, 400);
            }, 400);
        }

        if (carouselImages.length > 0) {
            carouselInterval = setInterval(rotateCarousel, 7000);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(carouselInterval);
                carouselInterval = null;
            } else if (carouselImages.length > 0 && !carouselInterval) {
                carouselInterval = setInterval(rotateCarousel, 7000);
            }
        });

        // ═══════════════════════════════════════════
        // SERVICE IMAGES — mostrar solo cuando carguen
        // ═══════════════════════════════════════════
        // ═══════════════════════════════════════════
        // SERVICE IMAGES — carga manual con IntersectionObserver
        // ═══════════════════════════════════════════
        document.querySelectorAll('.service-img').forEach(img => {
            const visual = img.closest('.service-visual');
            const overlay = visual?.querySelector('.service-overlay');

            // Ocultar overlay y imagen al inicio
            img.style.opacity = '0';
            if (overlay) overlay.style.opacity = '0';

            // Guardar src real y quitarlo para no cargar hasta que sea necesario
            const realSrc = img.getAttribute('src');
            img.removeAttribute('src');

            const imgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Cargar imagen cuando entra al viewport
                        img.src = realSrc;
                        img.addEventListener('load', () => {
                            img.style.transition = 'opacity 0.5s ease';
                            img.style.opacity = '1';
                            if (overlay) {
                                overlay.style.transition = 'opacity 0.5s ease';
                                overlay.style.opacity = '1';
                            }
                        }, { once: true });
                        imgObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px', // empieza a cargar 200px antes de entrar al viewport
                threshold: 0
            });

            imgObserver.observe(img);
        });

        // ═══════════════════════════════════════════
        // ANIMATED COUNTERS FOR METRICS
        // ═══════════════════════════════════════════
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));

            if (target === 0) {
                element.textContent = 0;
                return;
            }

            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            requestAnimationFrame(updateCounter);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                        counterObserver.unobserve(counter);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        document.querySelectorAll('.counter').forEach(counter => {
            counterObserver.observe(counter);
        });

    }); // fin DOMContentLoaded

})();