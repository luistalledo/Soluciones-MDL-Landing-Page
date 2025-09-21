// Scroll animado entre secciones tipo slide profesional
// Funciona con rueda del mouse y flechas

document.addEventListener('DOMContentLoaded', function () {
    const sections = Array.from(document.querySelectorAll('.section-full'));
    let isScrolling = false;
    let currentIndex = 0;

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 700);
    }

    function getCurrentSectionIndex() {
        let closest = 0;
        let minDist = Infinity;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const dist = Math.abs(rect.top);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        return closest;
    }

    window.addEventListener('wheel', function (e) {
        if (isScrolling) return;
        currentIndex = getCurrentSectionIndex();
        if (e.deltaY > 0) {
            // Scroll down
            scrollToSection(currentIndex + 1);
        } else if (e.deltaY < 0) {
            // Scroll up
            scrollToSection(currentIndex - 1);
        }
    }, { passive: false });

    window.addEventListener('keydown', function (e) {
        if (isScrolling) return;
        currentIndex = getCurrentSectionIndex();
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            scrollToSection(currentIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            scrollToSection(currentIndex - 1);
        }
    });
});
