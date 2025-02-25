let index2 = 0;
function mostrarSlide2() {
    const slides = document.querySelectorAll('.slide2');
    index2++;

    if (index2 >= slides.length) {
        index2 = 0;
    }
    const carrusel = document.querySelector('.carrusel2');
    carrusel.style.transform = `translateX(-${index2 * 100}%)`;
}
setInterval(mostrarSlide2, 2999); // Cambia cada 3 segundos