# MLD Soluciones - Landing Page

Landing page profesional para MLD Soluciones, empresa de consultoría tecnológica, desarrollo de software y automatización.

## Equipo

- **Luis Talledo** - Arquitectura & Backend
- **Mauricio Terrones** - Estrategia & Desarrollo
- **Diego Villajulca** - Automatización & AI
- **Jeamir Quispe** - Frontend & UX

## Estructura del Proyecto

```
Soluciones-MDL-Landing-Page/
│
├── index.html              # Sitio web principal
│
├── css/
│   └── styles.css          # Hoja de estilos completa
│
├── js/
│   └── main.js             # JavaScript principal
│
├── img/                    # Imágenes del sitio
│   ├── logo.png
│   ├── fondo.png
│   ├── mistica-imagen.PNG
│   ├── myd.PNG
│   ├── consultoriatecnologia.png
│   ├── desarrolloweb.png
│   ├── transformaciondigital.jpg
│   ├── seccion1.png
│   ├── seccion2.png
│   └── seccion3.png
│
├── LICENSE
└── README.md
```

## Características

### Características

- **Diseño moderno**: Minimalismo futurista inspirado en Vercel, Linear y Stripe
- **Performance optimizada**: CSS y JS separados para mejor caching
- **Responsive**: Adaptable a todos los dispositivos
- **Animaciones suaves**: CSS puro, sin dependencias externas
- **SEO optimizado**: Estructura semántica HTML5

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
