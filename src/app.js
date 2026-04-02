/**
 * APP.JS - PUNTO DE ENTRADA
 * Orquesta todos los componentes de la aplicación
 * 
 * Este es el archivo principal que se importa en index.html
 */

import { CONFIG } from './constants.js';
import { Logger } from './services/logger.js';

// Componentes
import { NavbarController } from './components/navbar/navbar.js';
import { CarouselController } from './components/carousel/carousel.js';
import { RevealObserver } from './components/reveal/reveal.js';
import { ScrollTopButton } from './components/scroll-top/scroll-top.js';
import { CounterAnimation } from './components/counter/counter.js';

/**
 * NELVOX App
 * Gestor central de la aplicación
 */
class App {
  constructor() {
    this.components = [];
    this.isInitialized = false;

    Logger.info('🚀 NELVOX Landing Page - Initializing', {
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    if (this.isInitialized) {
      Logger.warn('App already initialized');
      return;
    }

    try {
      // Esperar a que el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    } catch (error) {
      Logger.error('App initialization failed', {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  /**
   * Configura todos los componentes
   */
  setup() {
    Logger.info('Setting up components...');

    try {
      // 1. Navbar
      const navbar = new NavbarController(
        CONFIG.NAVBAR.selector,
        CONFIG.NAVBAR
      );
      if (navbar.enabled) {
        this.components.push(navbar);
      }

      // 2. Carousel
      const carousel = new CarouselController(
        CONFIG.CAROUSEL.selector,
        CONFIG.CAROUSEL
      );
      if (carousel.enabled) {
        this.components.push(carousel);
      }

      // 3. Reveal animations
      const reveal = new RevealObserver(CONFIG.REVEAL);
      reveal.observeAll(CONFIG.REVEAL.selectors);
      this.components.push(reveal);

      // 4. Scroll to top button
      const scrollTop = new ScrollTopButton(
        CONFIG.SCROLL.scrollTopSelector,
        CONFIG.SCROLL
      );
      if (scrollTop.enabled) {
        this.components.push(scrollTop);
      }

      // 5. Counter animations
      const counters = new CounterAnimation(CONFIG.COUNTERS);
      this.components.push(counters);

      this.isInitialized = true;

      Logger.info('✅ All components initialized successfully', {
        componentCount: this.components.length,
        components: this.components
          .map((c) => c.constructor.name)
          .join(', '),
      });

      // Exportar app a global para debugging
      window.__NELVOX_APP__ = this;
      Logger.debug('App exposed to window.__NELVOX_APP__ for debugging');
    } catch (error) {
      Logger.error('Error during component setup', {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  /**
   * Limpia y destruye todos los componentes
   */
  destroy() {
    this.components.forEach((component) => {
      try {
        if (typeof component.destroy === 'function') {
          component.destroy();
        }
      } catch (error) {
        Logger.error(`Error destroying ${component.constructor.name}`, {
          error: error.message,
        });
      }
    });

    this.components = [];
    this.isInitialized = false;

    Logger.info('App destroyed');
  }

  /**
   * Retorna información de debug
   */
  getDebugInfo() {
    return {
      initialized: this.isInitialized,
      componentCount: this.components.length,
      components: this.components.map((c) => ({
        name: c.constructor.name,
        enabled: c.enabled ?? true,
      })),
    };
  }
}

// Crear e inicializar app
const app = new App();
app.init();

// Exportar para uso externo si es necesario
export default app;
