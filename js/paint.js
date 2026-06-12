const canvas = document.querySelector("canvas")

//para pedirle al canvas el contexto del dibujo 2d (pincel)
const ctx = canvas.getContext("2d")


// constantes, diccionario de constantes
const MODES = {
    //pincel = 'dibujando'
    //borra = "borra"
    //rectangulo = "rectangulo"

}
//estados

let dibujando = false
//ultima posicion del pincel
let startX, startY
let lastX = 0
let lastY = 0
let mode = MODES.dibujando

//eventos
canvas.addEventListener("mousedown", inicioDibujar)
canvas.addEventListener("mousemove", dibujo)
canvas.addEventListener("mouseup", paraDibujar)
//al salir del canvas también deja de dibujar
canvas.addEventListener("mouseleave", paraDibujar)

//métodos
function inicioDibujar(event){
    dibujando = true
    //para saber dónde está clickando el usuario
    const {offsetX, offsetY} = event
    //guardar las coordenadas iniciales
    startX = offsetX
    startY = offsetY
    lastX = offsetX
    lastY = offsetY

    console.log(event)
}

function dibujo(event){
    if(!dibujando) return

    const {offsetX, offsetY} = event

    //comenzar trazado
    ctx.beginPath()
    //mover el dibujo hasta las coordenadas del ratón
    ctx.moveTo(lastX, lastY)

    //dibujar la línea desde donde se hace mousedown hasta el mouseup
    ctx.lineTo(offsetX, offsetY)

    ctx.stroke()
    ctx.lineWidth = 2

    //actualizar últimas coordenadas del mouse, para la próxima vez
    lastX = offsetX
    lastY = offsetY


}

function paraDibujar(event){
    dibujando = false

}
