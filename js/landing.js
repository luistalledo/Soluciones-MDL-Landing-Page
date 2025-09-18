document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = 0;
        setTimeout(() => {
            main.style.transition = 'opacity 1s';
            main.style.opacity = 1;
        }, 200);
    }

    // Carrusel automático de imágenes Landing
    const images = [
        'img/xd.png',
        'img/logo.png',
        'img/fondo.png'
    ];
    let idx = 0;
    const imgEl = document.querySelector('.landing-img');
    if (imgEl) {
        setInterval(() => {
            idx = (idx + 1) % images.length;
            imgEl.src = images[idx];
        }, 5000);
    }
});