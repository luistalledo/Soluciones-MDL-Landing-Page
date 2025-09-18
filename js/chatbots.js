document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo: animación de entrada
    document.querySelector('.service-detail').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.service-detail').style.transition = 'opacity 1s';
        document.querySelector('.service-detail').style.opacity = 1;
    }, 200);
        // Carrusel automático de imágenes Chatbots
        const images = [
            'img/chatbot1.png',
            'img/chatbot2.png',
            'img/chatbot3.png'
        ];
        let idx = 0;
        const imgEl = document.querySelector('.chatbot-img');
        if (imgEl) {
            setInterval(() => {
                idx = (idx + 1) % images.length;
                imgEl.src = images[idx];
            }, 5000);
        }
    });