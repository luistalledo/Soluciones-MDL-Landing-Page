/**
 * RAF ANIMATOR
 * Anima valores usando requestAnimationFrame
 * Proporciona mejor performance que setInterval para animaciones
 *
 * @param {number} startValue - Valor inicial
 * @param {number} endValue - Valor final
 * @param {number} duration - Duración en millisegundos
 * @param {Function} onProgress - Callback para cada frame (recibe valor actual)
 * @param {Function} onComplete - Callback cuando termina (opcional)
 */

export function animateValue(
  startValue,
  endValue,
  duration,
  onProgress,
  onComplete
) {
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = startValue + (endValue - startValue) * progress;

    onProgress(currentValue);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(step);
}
