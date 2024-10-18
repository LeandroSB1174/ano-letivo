/*transição*/
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const elements = document.querySelectorAll('.hidden');
elements.forEach((element) => myObserver.observe(element));

/*zoom na imagem*/
const image = document.getElementById('zoomImage');
let scale = 1; // Zoom inicial
let isDragging = false;
let startX, startY, initialX, initialY;

image.addEventListener('wheel', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do scroll

    // Controla o zoom (scroll para cima aumenta, para baixo diminui)
    scale += (event.deltaY < 0) ? 0.1 : -0.1; // Aumenta ou diminui o zoom

    // Limita o zoom mínimo e máximo
    if (scale < 1) scale = 1; // Zoom mínimo
    if (scale > 10) scale = 10; // Zoom máximo

    // Aplica o zoom à imagem
    image.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

image.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Impede a seleção e cópia da imagem
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    initialX = image.offsetLeft;
    initialY = image.offsetTop;

    image.style.cursor = 'grabbing'; // Muda o cursor ao arrastar
});

image.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        image.style.left = `${initialX + dx}px`;
        image.style.top = `${initialY + dy}px`;
    }
});

image.addEventListener('mouseup', () => {
    isDragging = false;
    image.style.cursor = 'zoom-in'; // Volta o cursor ao estado normal
});

image.addEventListener('mouseleave', () => {
    isDragging = false;
    image.style.cursor = 'zoom-in'; // Volta o cursor ao estado normal
});

// Adicione este evento para impedir o comportamento padrão de arrastar a imagem
image.addEventListener('dragstart', (event) => {
    event.preventDefault(); // Impede a cópia da imagem
});
