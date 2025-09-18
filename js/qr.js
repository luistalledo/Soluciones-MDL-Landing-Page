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

    // Carrusel automático de imágenes QR
    const images = [
        'img/qr1.png',
        'img/qr2.png',
        'img/qr3.png'
    ];
    let idx = 0;
    const imgEl = document.querySelector('.qr-img');
    if (imgEl) {
        setInterval(() => {
            idx = (idx + 1) % images.length;
            imgEl.src = images[idx];
        }, 5000);
    }
});