// abrir ventana CV
const ventanaCV = document.getElementById('ventana-cv-completa');
const btnAbrirCV = document.getElementById('abrirVentanaCV');
const btnCerrarCV = document.getElementById('cerrarVentana');
const headerCV = document.getElementById('barra-ventana');

// Mostrar la ventanaCV
btnAbrirCV.addEventListener('click', () => {
    ventanaCV.style.display = 'block';
    // Centrar la ventanaCV al abrir
    ventanaCV.style.left = (window.innerWidth - ventanaCV.offsetWidth) / 2 + 'px';
    ventanaCV.style.top = (window.innerHeight - ventanaCV.offsetHeight) / 2 + 'px';
});

// Ocultar la ventanaCV
btnCerrarCV.addEventListener('click', () => {
    ventanaCV.style.display = 'none';
});



// Arrastrar la ventanaCV
let isDragging = false;
let offsetX, offsetY;



headerCV.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - ventanaCV.offsetLeft;
    offsetY = e.clientY - ventanaCV.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        ventanaCV.style.left = e.clientX - offsetX <= document.documentElement.clientWidth - ventanaCV.clientWidth - 10 ? (e.clientX - offsetX) + 'px' : ventanaCV.style.left;
        ventanaCV.style.top = e.clientY - offsetY <= document.documentElement.clientHeight - ventanaCV.clientHeight - 35 ? (e.clientY - offsetY) + 'px' : ventanaCV.style.top;
        
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

