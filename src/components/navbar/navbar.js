/**
 * NAVBAR CONTROLLER
 * Manage navbar scroll effects and styling
 * 
 * Responsabilidad única: Control de efectos del navbar en scroll
 */

import { Logger } from '../../services/logger.js';
import { throttle } from '../../utils/throttle.js';

export class NavbarController {
  /**
   * @param {string} selector - Selector del navbar
   * @param {Object} options - Configuración
   */
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);

    if (!this.element) {
      Logger.warn('NavbarController: Element not found', { selector });
      this.enabled = false;
      return;
    }

    this.config = {
      scrollThreshold: 50,
      scrolledClass: 'scrolled',
      throttleDelay: 16,
      ...options,
    };

    this.enabled = true;
    this.throttledScroll = null;

    this.init();
  }

  /**
   * Inicializa el navbar controller
   */
  init() {
    this.throttledScroll = throttle(
      () => this.handleScroll(),
      this.config.throttleDelay
    );

    window.addEventListener('scroll', this.throttledScroll, { passive: true });

    Logger.info('NavbarController initialized', {
      selector: 'navbar',
      threshold: this.config.scrollThreshold,
    });
  }

  /**
   * Maneja scroll con throttling
   */
  handleScroll() {
    if (!this.enabled) return;

    const currentScroll = window.pageYOffset || window.scrollY;
    this.updateState(currentScroll);
  }

  /**
   * Actualiza estado visual del navbar
   */
  updateState(scrollPosition) {
    if (scrollPosition > this.config.scrollThreshold) {
      this.addScrolledState();
    } else {
      this.removeScrolledState();
    }
  }

  /**
   * Añade clase de scroll
   */
  addScrolledState() {
    if (!this.element.classList.contains(this.config.scrolledClass)) {
      this.element.classList.add(this.config.scrolledClass);
    }
  }

  /**
   * Remueve clase de scroll
   */
  removeScrolledState() {
    if (this.element.classList.contains(this.config.scrolledClass)) {
      this.element.classList.remove(this.config.scrolledClass);
    }
  }

  /**
   * Cleanup y destrucción
   */
  destroy() {
    if (this.throttledScroll) {
      window.removeEventListener('scroll', this.throttledScroll);
    }
    this.enabled = false;

    Logger.info('NavbarController destroyed');
  }
}
