const ventanaCalc = document.getElementById("ventanaCalc")
const pantalla = document.getElementById("pantallaCalc")
const abrirCalc = document.getElementById("abrirCalculadora")
const cerrarCalc = document.getElementById("cerrarCalc")
const barraCalc = ventanaCalc.querySelector(".barra-ventana")


let valorActual = "0"
let valorAnterior = ""
let operador = null
let esperandoSegundoValor = false

// abrir y cerrar la ventana
abrirCalc.addEventListener("click", () => {
    ventanaCalc.style.display = "block"
})
cerrarCalc.addEventListener("click", () => {
    ventanaCalc.style.display = "none"
})

//para poder arrastrar la ventana por el escritorio
let isDraggingCalc = false
let offsetXCalc, offsetYCalc

barraCalc.addEventListener("mousedown", (e) => {
    isDraggingCalc = true
    const rect = ventanaCalc.getBoundingClientRect()
    offsetXCalc = e.clientX - rect.left
    offsetYCalc = e.clientY - rect.top
    ventanaCalc.style.position = "fixed"
})

document.addEventListener("mousemove", (e) => {
    if (!isDraggingCalc) return
    ventanaCalc.style.left = (e.clientX - offsetXCalc) + "px"
    ventanaCalc.style.top = (e.clientY - offsetYCalc) + "px"
})

document.addEventListener("mouseup", () => {
    isDraggingCalc = false
})

//lo mismo pero para móvil/tablet
barraCalc.addEventListener("touchstart", (e) => {
    isDraggingCalc = true
    const touch = e.touches[0]
    const rect = ventanaCalc.getBoundingClientRect()
    offsetXCalc = touch.clientX - rect.left
    offsetYCalc = touch.clientY - rect.top
    ventanaCalc.style.position = "fixed"
})

document.addEventListener("touchmove", (e) => {
    if (!isDraggingCalc) return
    const touch = e.touches[0]
    ventanaCalc.style.left = (touch.clientX - offsetXCalc) + "px"
    ventanaCalc.style.top = (touch.clientY - offsetYCalc) + "px"
})

document.addEventListener("touchend", () => {
    isDraggingCalc = false
})


// Al clickar los números actualizamos valorActual. Con dos casos especiales
document.querySelectorAll(".btn-calc[data-num]").forEach(btn => {
    btn.addEventListener("click", () => {
        const num = btn.dataset.num

        //si se pulsa "." pero el valroActual ya contiene ".", no hace nada
        if (num === "." && valorActual.includes(".")) return

        //al pulsar un operador se queda esperando el prox valor, así que empieza desde cero para el siguiente num
        if (esperandoSegundoValor) {
            valorActual = num === "." ? "0." : num
            esperandoSegundoValor = false
        } else {
            //si el valorActual es 0 y el num no es un punto, reemplaza el 0 por el número directamente
            valorActual = valorActual === "0" && num !== "." ? num : valorActual + num
        }

        pantalla.textContent = valorActual
    })
})

// operadores. guarda el num actual como valorAnterior y guarda el operador
document.querySelectorAll(".btn-calc[data-op]").forEach(btn => {
    btn.addEventListener("click", () => {
        if (operador && !esperandoSegundoValor) calcular()
        valorAnterior = valorActual
        operador = btn.dataset.op
        esperandoSegundoValor = true
    })
})

// igual
document.getElementById("btnIgual").addEventListener("click", () => {
    if (!operador) return
    calcular()
    operador = null
})

//con parseFloat se convierten los valores en num y hace la operación según el operador guardado. el toFixed evita que aparezcan decimales infinitos. Ambas cosas se han preguntado a Claude ya que desconocía cómo hacerlo
function calcular() {
    const a = parseFloat(valorAnterior)
    const b = parseFloat(valorActual)
    let resultado

    if (operador === "+") resultado = a + b
    if (operador === "-") resultado = a - b
    if (operador === "*") resultado = a * b
    if (operador === "/") resultado = b !== 0 ? a / b : "Error"

    valorActual = String(parseFloat(resultado.toFixed(10)))
    esperandoSegundoValor = true
    pantalla.textContent = valorActual
}

// Para limpiar con C
document.getElementById("btnC").addEventListener("click", () => {
    valorActual = "0"
    valorAnterior = ""
    operador = null
    esperandoSegundoValor = false
    pantalla.textContent = "0"
})


// pulsar +/- cambia de signo
document.getElementById("btnPlusMinus").addEventListener("click", () => {
    valorActual = String(parseFloat(valorActual) * -1)
    pantalla.textContent = valorActual
})




