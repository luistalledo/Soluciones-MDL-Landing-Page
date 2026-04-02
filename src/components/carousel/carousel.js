/**
 * CAROUSEL CONTROLLER
 * Manage hero image carousel with auto-rotation and transitions
 * 
 * Responsabilidad única: Controlar rotación de imágenes en el hero
 */

import { Logger } from '../../services/logger.js';

export class CarouselController {
  /**
   * @param {string|Element} container - Selector o elemento contenedor
   * @param {Object} options - Configuración
   */
  constructor(container, options = {}) {
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!this.container) {
      Logger.warn('CarouselController: Container not found', {
        container: typeof container === 'string' ? container : 'Element',
      });
      this.enabled = false;
      return;
    }

    this.config = {
      interval: 7000,
      transitionDuration: 400,
      imageSelector: '.hero-img',
      activeClass: 'active',
      ...options,
    };

    this.images = Array.from(
      this.container.querySelectorAll(this.config.imageSelector)
    );
    this.currentSlide = 0;
    this.isTransitioning = false;
    this.interval = null;
    this.isVisible = !document.hidden;
    this.enabled = true;

    this.init();
  }

  /**
   * Inicializa el carousel
   */
  init() {
    if (this.images.length === 0) {
      Logger.warn('CarouselController: No images found', {
        selector: this.config.imageSelector,
      });
      this.enabled = false;
      return;
    }

    Logger.info('CarouselController initialized', {
      imageCount: this.images.length,
      interval: this.config.interval,
    });

    this.setupFirstImage();
    this.start();
    this.bindVisibilityChanges();
  }

  /**
   * Configura la primera imagen para que sea visible
   */
  setupFirstImage() {
    const firstImg = this.images[0];
    const showImage = () => {
      firstImg.style.opacity = '1';
      firstImg.style.visibility = 'visible';
    };

    if (firstImg.complete) {
      showImage();
    } else {
      firstImg.addEventListener('load', showImage, { once: true });
    }
  }

  /**
   * Rota al siguiente slide
   */
  rotate() {
    if (this.isTransitioning || !this.isVisible) return;
    this.isTransitioning = true;

    const current = this.images[this.currentSlide];
    const nextIndex = (this.currentSlide + 1) % this.images.length;
    const next = this.images[nextIndex];

    // Fase 1: Desvanecer imagen actual
    this.transitionOut(current).then(() => {
      // Fase 2: Cambiar slides
      current.classList.remove(this.config.activeClass);
      this.currentSlide = nextIndex;
      next.classList.add(this.config.activeClass);

      // Fase 3: Mostrar imagen nueva
      this.transitionIn(next).then(() => {
        this.isTransitioning = false;
      });
    });
  }

  /**
   * Transición de salida
   */
  transitionOut(element) {
    return new Promise((resolve) => {
      element.style.opacity = '0';
      setTimeout(resolve, this.config.transitionDuration);
    });
  }

  /**
   * Transición de entrada
   */
  transitionIn(element) {
    return new Promise((resolve) => {
      element.style.opacity = '1';
      setTimeout(resolve, this.config.transitionDuration);
    });
  }

  /**
   * Inicia rotación automática
   */
  start() {
    if (!this.enabled) return;
    if (this.interval) return;

    this.interval = setInterval(() => this.rotate(), this.config.interval);
  }

  /**
   * Pausa rotación automática
   */
  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Vincula cambios de visibilidad de pestaña
   */
  bindVisibilityChanges() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;

      if (this.isVisible) {
        this.start();
      } else {
        this.pause();
      }
    });
  }

  /**
   * Navega a un slide específico
   */
  goToSlide(index) {
    if (
      !this.enabled ||
      index < 0 ||
      index >= this.images.length ||
      index === this.currentSlide
    ) {
      return;
    }

    while (this.currentSlide !== index && !this.isTransitioning) {
      this.rotate();
    }
  }

  /**
   * Cleanup y destrucción
   */
  destroy() {
    this.pause();
    this.enabled = false;

    Logger.info('CarouselController destroyed');
  }
}
