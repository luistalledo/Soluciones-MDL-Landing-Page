/**
 * REVEAL OBSERVER
 * Generic observer for scroll reveal animations
 * 
 * Responsabilidad única: Detectar cuando elementos entran al viewport y aplicar clase visible
 */

import { Logger } from '../../services/logger.js';

export class RevealObserver {
  /**
   * @param {Object} options - Configuración del observer
   */
  constructor(options = {}) {
    this.config = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
      visibleClass: 'visible',
      onReveal: null,
      ...options,
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: this.config.root,
        rootMargin: this.config.rootMargin,
        threshold: this.config.threshold,
      }
    );

    this.observed = new Set();

    Logger.info('RevealObserver initialized', {
      rootMargin: this.config.rootMargin,
      threshold: this.config.threshold,
    });
  }

  /**
   * Observa un elemento
   */
  observe(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (element && !this.observed.has(element)) {
      this.observer.observe(element);
      this.observed.add(element);
    }
  }

  /**
   * Observa múltiples elementos por selector
   */
  observeAll(selectors) {
    if (typeof selectors === 'string') {
      selectors = [selectors];
    }

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        this.observe(el);
      });
    });
  }

  /**
   * Maneja intersección de elementos
   */
  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.onElementRevealed(entry.target);
        this.observer.unobserve(entry.target);
        this.observed.delete(entry.target);
      }
    });
  }

  /**
   * Ejecuta cuando elemento entra al viewport
   */
  onElementRevealed(element) {
    element.classList.add(this.config.visibleClass);

    // Callback personalizado si existe
    if (typeof this.config.onReveal === 'function') {
      this.config.onReveal(element);
    }
  }

  /**
   * Para de observar un elemento
   */
  unobserve(element) {
    if (element) {
      this.observer.unobserve(element);
      this.observed.delete(element);
    }
  }

  /**
   * Cleanup y destrucción
   */
  destroy() {
    this.observer.disconnect();
    this.observed.clear();

    Logger.info('RevealObserver destroyed');
  }
}
