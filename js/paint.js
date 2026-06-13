const canvas = document.querySelector("canvas");

//para pedirle al canvas el contexto del dibujo 2d (pincel)
const ctx = canvas.getContext("2d");


// constantes, diccionario de constantes
const MODES = {
    //pincel = 'dibujando'
    //borra = "borra"
    //rectangulo = "rectangulo"

};
//estados

let dibujando = false;
//ultima posicion del pincel
let startX, startY;
let lastX = 0;
let lastY = 0;
let mode = MODES.dibujando;

//eventos
canvas.addEventListener("mousedown", inicioDibujar);
canvas.addEventListener("mousemove", dibujo);
canvas.addEventListener("mouseup", paraDibujar);
//al salir del canvas también deja de dibujar
canvas.addEventListener("mouseleave", paraDibujar);

//métodos

function inicioDibujar(event){
    dibujando = true;
    //para saber dónde está clickando el usuario, guardar las coordenadas iniciales
    
    lastX = offsetX;
    lastY = offsetY;

    console.log(event)
};

function dibujo(event){
    if(!dibujando) return;
    
    const offsetX = event.offsetX
    const offsetY = event.offsetY

    //comenzar trazado
    ctx.beginPath();
    //mover el dibujo hasta las coordenadas del ratón
    ctx.moveTo(lastX, lastY);

    //dibujar la línea desde donde se hace mousedown hasta el mouseup
    ctx.lineTo(offsetX, offsetY);

    ctx.stroke();
    ctx.strokeStyle = "negro"
    ctx.lineWidth = 3;

    //actualizar últimas coordenadas del mouse, para la próxima vez
    lastX = offsetX;
    lastY = offsetY;


};

function paraDibujar(event){
    dibujando = false;

};

// Seleccionar elementos
const colores = document.querySelectorAll(".color")
const seleccionadoUno = document.querySelector(".seleccionado-uno")
const seleccionadoDos = document.querySelector(".seleccionado-dos")

//guardamos el color que está por defecto como seleccionado al inicio
seleccionadoUno.style.backgroundColor = "negro"

// Al hacer click en un color
for (let i = 0; i < colores.length; i++) {
    colores[i].addEventListener("click", () => {

        colorAnterior = seleccionadoUno.style.backgroundColor  // guarda el color actual antes de cambiarlo
        // Obtener el color de fondo del div clickado
        colorActual = getComputedStyle(colores[i]).backgroundColor

        // Actualizar cuadros grandes de la izquierda
        seleccionadoDos.style.backgroundColor = colorAnterior
        seleccionadoUno.style.backgroundColor = colorActual


        // Actualizar el color del pincel
        ctx.strokeStyle = colorActual

        // quitar .pulsado a todos
        colores.forEach(c => c.classList.remove("pulsado"))
        // añadir .pulsado solo al clickado
        colores[i].classList.add("pulsado")
    })
}

