/**
 * SCROLL TOP BUTTON
 * Show/hide scroll-to-top button based on scroll position
 * 
 * Responsabilidad única: Controlar botón de scroll to top
 */

import { Logger } from '../../services/logger.js';
import { throttle } from '../../utils/throttle.js';

export class ScrollTopButton {
  /**
   * @param {string} selector - Selector del botón scroll-to-top
   * @param {Object} options - Configuración
   */
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);

    if (!this.element) {
      Logger.warn('ScrollTopButton: Element not found', { selector });
      this.enabled = false;
      return;
    }

    this.config = {
      visibilityThreshold: 400,
      visibleClass: 'visible',
      throttleDelay: 16,
      smoothBehavior: true,
      ...options,
    };

    this.enabled = true;
    this.isVisible = false;
    this.throttledScroll = null;

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    this.throttledScroll = throttle(
      () => this.handleScroll(),
      this.config.throttleDelay
    );

    window.addEventListener('scroll', this.throttledScroll, { passive: true });
    this.element.addEventListener('click', (e) => this.handleClick(e));

    Logger.info('ScrollTopButton initialized', {
      selector: '#scrollToTop',
      threshold: this.config.visibilityThreshold,
    });
  }

  /**
   * Maneja scroll para mostrar/ocultar botón
   */
  handleScroll() {
    if (!this.enabled) return;

    const currentScroll = window.scrollY || window.pageYOffset;
    const shouldBeVisible = currentScroll > this.config.visibilityThreshold;

    if (shouldBeVisible && !this.isVisible) {
      this.show();
    } else if (!shouldBeVisible && this.isVisible) {
      this.hide();
    }
  }

  /**
   * Muestra el botón
   */
  show() {
    this.element.classList.add(this.config.visibleClass);
    this.isVisible = true;
  }

  /**
   * Oculta el botón
   */
  hide() {
    this.element.classList.remove(this.config.visibleClass);
    this.isVisible = false;
  }

  /**
   * Maneja click en el botón
   */
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    window.scrollTo({
      top: 0,
      behavior: this.config.smoothBehavior ? 'smooth' : 'auto',
    });
  }

  /**
   * Cleanup y destrucción
   */
  destroy() {
    if (this.throttledScroll) {
      window.removeEventListener('scroll', this.throttledScroll);
    }

    this.element.removeEventListener('click', this.handleClick);
    this.enabled = false;

    Logger.info('ScrollTopButton destroyed');
  }
}
