// EMERGENCIA - FORZAR NAVBAR COMPLETAMENTE

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 EMERGENCIA: Iniciando fuerza total del navbar...');
    
    let navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.log('🚨 NAVBAR NO EXISTE - CREANDO UNO NUEVO...');
        // Si no existe, crear uno nuevo
        navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <div class="logo">
                <span class="logo-text" style="color: white; font-weight: bold; font-size: 1.5em;">MLD Soluciones</span>
            </div>
            <a href="#contacto" style="margin-left: auto; background: white; color: #3cc6e0; padding: 0.7em 1.5em; border-radius: 25px; text-decoration: none; font-weight: bold;">Contacto</a>
        `;
        document.body.insertBefore(navbar, document.body.firstChild);
    }
    
    // FUERZA BRUTA - ESTILOS DIRECTOS
    navbar.style.cssText = `
        display: flex !important;
        position: fixed !important;
        top: 0px !important;
        left: 0px !important;
        right: 0px !important;
        width: 100vw !important;
        height: 80px !important;
        background: #3cc6e0 !important;
        z-index: 9999999 !important;
        visibility: visible !important;
        opacity: 1 !important;
        padding: 1em 2em !important;
        justify-content: flex-start !important;
        align-items: center !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
        margin: 0 !important;
        border: none !important;
    `;
    
    // ELIMINAR CUALQUIER ESPACIO BLANCO
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    // Asegurar que el navbar esté pegado arriba
    navbar.style.top = '0px';
    navbar.style.marginTop = '0px';
    navbar.style.paddingTop = '1em';
    
    console.log('✅ NAVBAR: EMERGENCIA ACTIVADA - DEBE SER VISIBLE AHORA');
    
    // Test visual - cambiar color cada segundo para confirmar funcionamiento
    let colorIndex = 0;
    const colors = ['#3cc6e0', '#e74c3c', '#2ecc71', '#f39c12'];
    setInterval(() => {
        navbar.style.backgroundColor = colors[colorIndex % colors.length];
        colorIndex++;
        console.log('🎨 TEST: Cambiando color del navbar a', colors[(colorIndex-1) % colors.length]);
    }, 2000);
});