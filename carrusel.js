// Índice para la diapositiva actual
let index = 0;

/**
 * Muestra la diapositiva actual y avanza a la siguiente.
 * Reinicia el índice si supera el número de diapositivas.
 */
function mostrarSlide() {
    const slides = document.querySelectorAll('.slide');
    index = (index + 1) % slides.length;
    document.querySelector('.carrusel').style.transform = `translateX(-${index * 100}%)`;
}

// Cambia de diapositiva cada 3 segundos
setInterval(mostrarSlide, 2999);
