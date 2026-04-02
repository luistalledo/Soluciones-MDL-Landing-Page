/**
 * DEBOUNCE
 * Retrasa ejecución hasta que pare de llamarse por el delay especificado
 * Útil para búsquedas, autocomplete, validación
 *
 * @param {Function} fn - Función a debounce
 * @param {number} delay - Delay en millisegundos
 * @returns {Function} Función debounced
 */

export function debounce(fn, delay = 300) {
  let timeoutId = null;

  return function debounced(...args) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}
