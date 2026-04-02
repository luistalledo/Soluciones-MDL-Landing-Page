/**
 * DOM HELPERS
 * Funciones utilidad para manipular el DOM de forma segura
 */

/**
 * Query selector seguro (valida selector antes)
 */
export function querySafe(selector, parent = document) {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Query selector all como array seguro
 */
export function querySafeAll(selector, parent = document) {
  try {
    return Array.from(parent.querySelectorAll(selector));
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return [];
  }
}

/**
 * Añade clase a elemento de forma segura
 */
export function addClass(element, className) {
  if (element?.classList) {
    element.classList.add(className);
  }
}

/**
 * Remueve clase de elemento de forma segura
 */
export function removeClass(element, className) {
  if (element?.classList) {
    element.classList.remove(className);
  }
}

/**
 * Verifica si elemento tiene clase
 */
export function hasClass(element, className) {
  return element?.classList?.contains(className) ?? false;
}

/**
 * Toggle clase de elemento
 */
export function toggleClass(element, className) {
  if (element?.classList) {
    element.classList.toggle(className);
  }
}

/**
 * Remueve todos los listeners de un elemento (clonando para limpiar)
 */
export function removeAllListeners(element) {
  const newElement = element.cloneNode(true);
  element.parentNode?.replaceChild(newElement, element);
  return newElement;
}
