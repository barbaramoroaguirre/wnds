const ventanaCalc = document.getElementById("ventanaCalc")
const pantalla = document.getElementById("pantallaCalc")
const abrirCalc = document.getElementById("abrirCalculadora")
const cerrarCalc = document.getElementById("cerrarCalc")
const barraCalc = ventanaCalc.querySelector(".barra-ventana")


let valorActual = "0"
let valorAnterior = ""
let operador = null
let esperandoSegundoValor = false

// abrir y cerrar
abrirCalc.addEventListener("click", () => {
    ventanaCalc.style.display = "block"
})
cerrarCalc.addEventListener("click", () => {
    ventanaCalc.style.display = "none"
})

// números
document.querySelectorAll(".btn-calc[data-num]").forEach(btn => {
    btn.addEventListener("click", () => {
        const num = btn.dataset.num

        if (num === "." && valorActual.includes(".")) return

        if (esperandoSegundoValor) {
            valorActual = num === "." ? "0." : num
            esperandoSegundoValor = false
        } else {
            valorActual = valorActual === "0" && num !== "." ? num : valorActual + num
        }

        pantalla.textContent = valorActual
    })
})

// operadores
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

// C
document.getElementById("btnC").addEventListener("click", () => {
    valorActual = "0"
    valorAnterior = ""
    operador = null
    esperandoSegundoValor = false
    pantalla.textContent = "0"
})

// +/-
document.getElementById("btnPlusMinus").addEventListener("click", () => {
    valorActual = String(parseFloat(valorActual) * -1)
    pantalla.textContent = valorActual
})

// %
document.getElementById("btnPorcentaje").addEventListener("click", () => {
    valorActual = String(parseFloat(valorActual) / 100)
    pantalla.textContent = valorActual
})

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

