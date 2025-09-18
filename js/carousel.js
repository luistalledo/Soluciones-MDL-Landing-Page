document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        let index = 0;
        const images = carousel.querySelectorAll('.carousel-img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        function showImage(i) {
            images.forEach((img, idx) => {
                img.style.display = idx === i ? 'block' : 'none';
            });
        }
        showImage(index);
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + images.length) % images.length;
            showImage(index);
        });
        nextBtn.addEventListener('click', () => {
            index = (index + 1) % images.length;
            showImage(index);
        });
    });
});