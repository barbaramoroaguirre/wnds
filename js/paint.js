// Seleccionar elementos
const canvas = document.querySelector("canvas");
const colores = document.querySelectorAll(".color");
const seleccionadoUno = document.querySelector(".seleccionado-uno");
const seleccionadoDos = document.querySelector(".seleccionado-dos");
const borrador = document.querySelector(".borrador")
const pincel = document.querySelector(".pincel")

//para pedirle al canvas el contexto del dibujo 2d (pincel)
const ctx = canvas.getContext("2d");



let dibujando = false;

let borrando = false
let colorActual = "black"  // color por defecto al cargar
pincel.classList.add("pulsado")  // activo por defecto


//eventos
canvas.addEventListener("mousedown", inicioDibujar);
canvas.addEventListener("mousemove", dibujo);
canvas.addEventListener("mouseup", paraDibujar);

//al salir del canvas también deja de dibujar
canvas.addEventListener("mouseleave", paraDibujar);


function inicioDibujar(event){
    dibujando = true;
    //para saber dónde está clickando el usuario, guardar las coordenadas iniciales
    
    const offsetX = event.offsetX
    const offsetY = event.offsetY

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

    //esto para que "la goma" pinte de blanco
    if (borrando) {
    ctx.strokeStyle = "white"
    ctx.lineWidth = 20
    } else {
    ctx.strokeStyle = colorActual
    ctx.lineWidth = 3
    }

    //actualizar últimas coordenadas del mouse, para la próxima vez
    lastX = offsetX;
    lastY = offsetY;
};

function paraDibujar(event){
    dibujando = false;
};



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

// evento de borrador

borrador.addEventListener('click', () => {
    borrando = true
    canvas.classList.add("modo-goma")
    borrador.classList.add("pulsado")
    pincel.classList.remove("pulsado")

})

pincel.addEventListener('click', () => {
    borrando = false
    canvas.classList.remove("modo-goma")
    borrador.classList.remove("pulsado")
    pincel.classList.add("pulsado")
})
