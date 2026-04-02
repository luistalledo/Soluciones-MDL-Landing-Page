/**
 * CONSTANTES GLOBALES
 * Valores centralizados para evitar hardcodeo
 */

export const CONFIG = {
  // Navbar
  NAVBAR: {
    selector: '#navbar',
    scrollThreshold: 50,
    scrolledClass: 'scrolled',
    throttleDelay: 16,
  },

  // Carousel
  CAROUSEL: {
    selector: '.hero-right',
    imageSelector: '.hero-img',
    activeClass: 'active',
    interval: 7000,
    transitionDuration: 400,
  },

  // Reveal animations
  REVEAL: {
    selectors: ['.reveal', '.reveal-left', '.reveal-right'],
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1,
    visibleClass: 'visible',
  },

  // Counters
  COUNTERS: {
    selector: '.counter',
    dataAttribute: 'data-target',
    animationDuration: 2000,
    countedClass: 'counted',
  },

  // Scroll to top
  SCROLL: {
    scrollTopSelector: '#scrollToTop',
    visibleClass: 'visible',
    visibilityThreshold: 400,
  },

  // Performance
  PERFORMANCE: {
    throttleDelay: 16,
    lazyLoadMargin: '200px 0px',
  },
};

// Exportar constantes individuales para fácil acceso
export const SELECTORS = {
  navbar: CONFIG.NAVBAR.selector,
  carousel: CONFIG.CAROUSEL.selector,
  carouselImages: CONFIG.CAROUSEL.imageSelector,
  scrollTop: CONFIG.SCROLL.scrollTopSelector,
};

export const CLASSES = {
  scrolled: CONFIG.NAVBAR.scrolledClass,
  active: CONFIG.CAROUSEL.activeClass,
  visible: CONFIG.REVEAL.visibleClass,
  counted: CONFIG.COUNTERS.countedClass,
};
