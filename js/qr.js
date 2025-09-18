document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo: animación de entrada
    document.querySelector('.service-detail').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.service-detail').style.transition = 'opacity 1s';
        document.querySelector('.service-detail').style.opacity = 1;
    }, 200);
});