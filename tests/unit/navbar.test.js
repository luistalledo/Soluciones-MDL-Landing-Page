/**
 * NAVBAR TESTS
 * Tests básicos para NavbarController
 */

describe('NavbarController', () => {
  let navbar;
  let navbarElement;

  beforeEach(() => {
    // Crear elemento navbar
    navbarElement = document.createElement('nav');
    navbarElement.id = 'navbar';
    document.body.appendChild(navbarElement);

    // Importar luego
    const { NavbarController } = require('../src/components/navbar/navbar.js');
    navbar = new NavbarController('#navbar', {
      scrollThreshold: 50,
    });
  });

  afterEach(() => {
    if (navbar) {
      navbar.destroy();
    }
    if (navbarElement) {
      document.body.removeChild(navbarElement);
    }
  });

  test('should initialize', () => {
    expect(navbar.enabled).toBe(true);
  });

  test('should have correct element', () => {
    expect(navbar.element).toBe(navbarElement);
  });

  test('should add scrolled class on updateState', () => {
    navbar.updateState(100);
    expect(navbarElement.classList.contains('scrolled')).toBe(true);
  });

  test('should remove scrolled class on updateState', () => {
    navbar.updateState(100);
    navbar.updateState(10);
    expect(navbarElement.classList.contains('scrolled')).toBe(false);
  });

  test('should handle invalid selector', () => {
    const { NavbarController } = require('../src/components/navbar/navbar.js');
    const invalidNavbar = new NavbarController('#non-existent');
    expect(invalidNavbar.enabled).toBe(false);
  });
});
