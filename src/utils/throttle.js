/**
 * THROTTLE
 * Limita la frecuencia de ejecución de una función
 * Útil para eventos como scroll, resize, mousemove
 *
 * @param {Function} fn - Función a throttle
 * @param {number} delay - Delay en millisegundos (default: 16ms = ~60fps)
 * @returns {Function} Función throttled
 */

export function throttle(fn, delay = 16) {
  let lastCall = 0;
  let timeoutId = null;

  return function throttled(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeoutId) clearTimeout(timeoutId);

    if (timeSinceLastCall >= delay) {
      fn.apply(this, args);
      lastCall = now;
    } else {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastCall = Date.now();
      }, delay - timeSinceLastCall);
    }
  };
}
