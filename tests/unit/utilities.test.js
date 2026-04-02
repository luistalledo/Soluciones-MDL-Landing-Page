/**
 * UTILITIES TESTS
 * Tests para funciones utilitarias
 */

describe('Throttle', () => {
  test('should throttle function calls', (done) => {
    const { throttle } = require('../src/utils/throttle.js');
    let callCount = 0;

    const fn = () => {
      callCount++;
    };

    const throttled = throttle(fn, 100);

    // Llamar múltiples veces rápidamente
    throttled();
    throttled();
    throttled();
    throttled();

    // Debe ser llamado solo 1 vez inmediatamente
    expect(callCount).toBe(1);

    // Después del delay, debe ser llamado nuevamente
    setTimeout(() => {
      expect(callCount).toBeGreaterThan(1);
      done();
    }, 150);
  });
});

describe('Debounce', () => {
  test('should debounce function calls', (done) => {
    const { debounce } = require('../src/utils/debounce.js');
    let callCount = 0;

    const fn = () => {
      callCount++;
    };

    const debounced = debounce(fn, 50);

    // Llamar múltiples veces rápidamente
    debounced();
    debounced();
    debounced();

    // No debe ser llamado inmediatamente
    expect(callCount).toBe(0);

    // Después del delay, debe ser llamado solo 1 vez
    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 100);
  });
});

describe('AnimateValue', () => {
  test('should animate from start to end value', (done) => {
    const { animateValue } = require('../src/utils/raf-animator.js');
    let finalValue = 0;

    animateValue(
      0,
      100,
      100,
      (value) => {
        finalValue = value;
      },
      () => {
        expect(finalValue).toBe(100);
        done();
      }
    );
  });
});

describe('DOM Helpers', () => {
  test('should safely query elements', () => {
    const { querySafe } = require('../src/utils/dom-helpers.js');
    
    // Elemento válido
    document.body.innerHTML = '<div id="test">Test</div>';
    const el = querySafe('#test');
    expect(el).not.toBeNull();

    // Selector inválido
    const invalidEl = querySafe('###invalid');
    expect(invalidEl).toBeNull();
  });

  test('should add class safely', () => {
    const { addClass } = require('../src/utils/dom-helpers.js');
    
    const el = document.createElement('div');
    addClass(el, 'test-class');
    expect(el.classList.contains('test-class')).toBe(true);

    // Elemento null
    addClass(null, 'test');
    // No debe lanzar error
    expect(true).toBe(true);
  });
});
