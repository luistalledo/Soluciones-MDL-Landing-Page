/**
 * CAROUSEL TESTS
 * Tests básicos para CarouselController
 */

describe('CarouselController', () => {
  let container;
  let carousel;

  beforeEach(() => {
    // Crear DOM de prueba
    container = document.createElement('div');
    container.className = 'hero-right';
    container.innerHTML = `
      <img class="hero-img" src="test1.jpg" alt="Slide 1" />
      <img class="hero-img" src="test2.jpg" alt="Slide 2" />
      <img class="hero-img" src="test3.jpg" alt="Slide 3" />
    `;
    document.body.appendChild(container);

    // Importar luego de agregar al DOM
    const { CarouselController } = require('../src/components/carousel/carousel.js');
    carousel = new CarouselController(container, {
      imageSelector: '.hero-img',
      interval: 1000,
    });
  });

  afterEach(() => {
    if (carousel) {
      carousel.destroy();
    }
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('should initialize with correct number of images', () => {
    expect(carousel.images.length).toBe(3);
    expect(carousel.enabled).toBe(true);
  });

  test('should start with first slide', () => {
    expect(carousel.currentSlide).toBe(0);
  });

  test('should have interval set', () => {
    expect(carousel.interval).not.toBeNull();
  });

  test('should pause carousel', () => {
    carousel.pause();
    expect(carousel.interval).toBeNull();
  });

  test('should start carousel', () => {
    carousel.pause();
    carousel.start();
    expect(carousel.interval).not.toBeNull();
  });

  test('should destroy properly', () => {
    carousel.destroy();
    expect(carousel.enabled).toBe(false);
  });
});
