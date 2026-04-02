/**
 * COUNTER ANIMATION
 * Animate counter numbers when they become visible
 * 
 * Responsabilidad única: Animar contadores cuando son visibles
 */

import { Logger } from '../../services/logger.js';
import { RevealObserver } from '../reveal/reveal.js';
import { animateValue } from '../../utils/raf-animator.js';

export class CounterAnimation {
  /**
   * @param {Object} options - Configuración
   */
  constructor(options = {}) {
    this.config = {
      selector: '.counter',
      dataAttribute: 'data-target',
      animationDuration: 2000,
      countedClass: 'counted',
      revealThreshold: 0.5,
      ...options,
    };

    this.animated = new Set();
    this.observer = null;
    this.enabled = true;

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    this.observer = new RevealObserver({
      threshold: this.config.revealThreshold,
      onReveal: (element) => this.animateIfCounter(element),
    });

    this.observer.observeAll(this.config.selector);

    Logger.info('CounterAnimation initialized', {
      selector: this.config.selector,
    });
  }

  /**
   * Anima contador si no ha sido animado
   */
  animateIfCounter(element) {
    if (!this.enabled || this.animated.has(element)) return;

    const target = parseInt(
      element.getAttribute(this.config.dataAttribute),
      10
    );

    if (isNaN(target)) {
      Logger.warn('CounterAnimation: Invalid target value', {
        element: element.textContent,
      });
      return;
    }

    this.animated.add(element);
    element.classList.add(this.config.countedClass);

    animateValue(
      0,
      target,
      this.config.animationDuration,
      (value) => {
        element.textContent = Math.floor(value);
      },
      () => {
        element.textContent = target;
      }
    );
  }

  /**
   * Cleanup y destrucción
   */
  destroy() {
    if (this.observer) {
      this.observer.destroy();
    }

    this.animated.clear();
    this.enabled = false;

    Logger.info('CounterAnimation destroyed');
  }
}
