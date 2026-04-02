# NELVOX Landing Page

Sitio web profesional de NELVOX - Consultoría Tecnológica, Desarrollo de Software y Automatización.

## 🏗️ Arquitectura Modular

Este proyecto implementa **principios SOLID y Clean Code** para una arquitectura escalable y mantenible.

### JavaScript Modular
| Componente | Responsabilidad |
|-----------|---|
| `CarouselController` | Rotación automática hero |
| `NavbarController` | Scroll effects |
| `RevealObserver` | Animaciones scroll |
| `ScrollTopButton` | Botón subir |
| `CounterAnimation` | Contadores animados |

### CSS Modular
- **17 archivos** organizados por secciones
- Variables CSS centralizadas
- Componentes aislados
- Media queries en archivo separado

### Imágenes Optimizadas
- Formato **WebP** (80% más ligero)
- Originales en `img/originals/`

## 🚀 Primeros Pasos

```bash
# Solo para desarrollo (habilita optimización de imágenes)
npm install

# Abrir con Live Server
# Clic derecho en index.html → "Open with Live Server"
```

## 📦 Archivos a Subir

```
✅ index.html
✅ src/               (JavaScript + CSS modular)
✅ img/*.webp        (Imágenes optimizadas)
✅ img/NELVOX/       (Logos SVG)
✅ js/lenis.min.js   (Smooth scroll)
✅ README.md         (Este archivo)
✅ LICENSE

❌ node_modules/     (git ignore)
❌ package.json      (git ignore)
❌ optimize-images.js (git ignore)
❌ Análisis*.md      (git ignore)
```

## 🎯 Estructura Completa

```
src/
├── app.js                     # Orquestador (140 líneas)
├── constants.js              # Configuración global (60 líneas)
├── components/
│   ├── carousel/carousel.js   (152 líneas)
│   ├── navbar/navbar.js       (98 líneas)
│   ├── reveal/reveal.js       (110 líneas)
│   ├── scroll-top/scroll-top.js (115 líneas)
│   └── counter/counter.js     (95 líneas)
├── services/
│   └── logger.js              # Logging centralizado
├── utils/
│   ├── throttle.js
│   ├── debounce.js
│   ├── raf-animator.js
│   └── dom-helpers.js
└── styles/
    ├── main.css               # Punto de entrada
    ├── themes/light.css       # Variables
    ├── base/                  # Reset, tipografía
    ├── layout/                # Containers
    ├── components/            # Navbar, Hero, Services, etc (13 archivos)
    ├── animations/            # Reveal animations
    └── utilities/responsive.css
```

## ✨ Características

- ✅ **Modular**: Cada componente es independiente
- ✅ **SOLID**: Single Responsibility, Open/Closed, etc.
- ✅ **Clean Code**: Nombres significativos, funciones pequeñas
- ✅ **Optimizado**: Imágenes WebP, lazy loading ready
- ✅ **Responsive**: Breakpoints 1200px, 1024px, 768px, 480px
- ✅ **Animaciones**: Scroll reveal, smooth transitions
- ✅ **Performance**: 60-150 líneas por archivo vs 2000 líneas monolítico

## 🔧 Desarrollo

### Agregar un Nuevo Componente

1. Crear `src/components/[nombre]/[nombre].js`
2. Exportar clase con `init()` y `destroy()`
3. Registrar en `src/app.js`
4. Crear estilos en `src/styles/components/[nombre].css`
5. Importar en `src/styles/main.css`

### Optimizar Imágenes

```bash
npm run optimize-images
```

## 📊 Estadísticas

| Métrica | Antes | Después |
|---------|-------|---------|
| Archivos JS | 1 | 16 |
| Líneas monolítico | 500+ | 60-150 c/u |
| Tamaño imágenes | 12.4 MB | 2.6 MB |
| Reducción total | - | **79%** |

## 🎓 Principios Aplicados

- **SOLID**: Single Responsibility, Open/Closed, Liskov, Interface, Dependency Inversion
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **Yagni**: You Aren't Gonna Need It

## 📝 Ejemplo de Componente Modular

```javascript
export class MyComponent {
  constructor(selector, config = {}) {
    this.element = document.querySelector(selector);
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  init() {
    if (!this.element) return;
    this.bindEvents();
    Logger.info('MyComponent initialized');
  }

  bindEvents() {
    // Lógica específica
  }

  destroy() {
    // Limpiar
    Logger.info('MyComponent destroyed');
  }
}
```

---

**Versión:** 2.0.0  
**Status:** Producción  
**Última actualización:** Abril 2026

Para soporte técnico, revisar `REFACTORING_COMPLETE.md` en la rama de desarrollo.

### Tecnologías Utilizadas

- HTML5 semántico
- CSS3 (Grid, Flexbox, Animaciones, Variables CSS)
- JavaScript vanilla (ES6+)
- Google Fonts (Instrument Serif + DM Sans)

## Secciones del Sitio

1. **Hero** - Presentación principal con título impactante
2. **Tech Strip** - Marquee con stack tecnológico
3. **Servicios** - Grid de 6 servicios principales
4. **Proceso** - 4 pasos del flujo de trabajo
5. **Nosotros** - Presentación del equipo
6. **Métricas** - Números clave del negocio
7. **Testimonios** - Casos de éxito de clientes
8. **CTA Final** - Llamado a la acción
9. **Footer** - Enlaces y contacto

## Paleta de Colores

```css
--bg-base:      #F8FAFB   /* Fondo principal */
--bg-surface:   #FFFFFF   /* Tarjetas */
--bg-subtle:    #F0F4F8   /* Secciones alternadas */
--accent:       #00B4A0   /* Teal principal (logo MLD) */
--ink:          #0D1117   /* Títulos */
--body-text:    #3D4A5C   /* Texto principal */
--muted:        #8A97A8   /* Texto secundario */
--border:       #E2E8F0   /* Bordes */
```

## Cómo Usar

### Desarrollo Local

Simplemente abre `index.html` en tu navegador. No requiere servidor ni compilación.

### Producción

1. Sube todos los archivos manteniendo la estructura de carpetas
2. Las rutas relativas están configuradas correctamente
3. Opcional: minificar CSS y JS para mejor performance
4. Opcional: optimizar imágenes con herramientas como TinyPNG

## Buenas Prácticas Implementadas

### Separación de Responsabilidades
- ✓ HTML solo para estructura
- ✅ CSS separado en `css/styles.css`
- ✅ JavaScript separado en `js/main.js`

### Performance
- ✅ CSS externo para aprovechar cache del navegador
- ✅ JavaScript cargado al final del body
- ✅ Uso de `preconnect` para Google Fonts
- ✅ Animaciones con CSS (más eficientes que JS)

### Accesibilidad
- ✅ HTML semántico (`nav`, `main`, `section`, `footer`)
- ✅ IDs para navegación por anclas
- ✅ Textos alternativos (añadir a imágenes según necesidad)

### Mantenibilidad
- ✅ Código comentado y organizado
- ✅ Variables CSS para colores (fácil cambio de tema)
- ✅ Nombres de clases descriptivos
- ✅ Estructura modular

### JavaScript
- ✅ IIFE para evitar contaminar el scope global
- ✅ `'use strict'` para código más seguro
- ✅ Event listeners con `{ passive: true }` para mejor performance
- ✅ IntersectionObserver para animaciones eficientes

##  Contacto

**MLD Soluciones**
- Email: mldsolucionescontacto@gmail.com
- WhatsApp: +51 932 880 903
- Facebook: [MLD Soluciones](https://www.facebook.com/profile.php?id=61581013543284)
- Instagram: [@mld.soluciones](https://www.instagram.com/mld.soluciones/)

## Licencia

Ver archivo LICENSE en la raíz del proyecto.

---

Desarrollado por MLD Soluciones - Hecho en Latinoamérica
