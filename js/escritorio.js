const huevo = document.getElementById('huevo');
const personaje = document.querySelector(".img-personaje");
const reloj = document.getElementById("reloj")



huevo.addEventListener('click', () => {
  // Añadimos la clase que contiene la animación
  huevo.classList.add('sacudir');
  
  // Quitamos la clase cuando la animación termina (500 milisegundos)
  setTimeout(() => {
    huevo.classList.remove('sacudir');
  }, 500); 
});


// empezamos el contador de clicks
let contador = 0;

// cada vez que se hace click al png, el contador suma 1
personaje.addEventListener("click", () => {
    contador++
    mostrarNumero(contador)

    if (contador == 20){
      huevo.src = "img/huevo-abierto.png"
    }

    //para que cambie con cada 10 clicks, buscamos cuando el resto da 0 en el módulo
    if (contador > 20 && (contador - 20) % 10 === 0) {
      if (personaje.src.includes("img/huevo-abierto.png")) {
        personaje.src = "img/huevo-cerrado.png"
      }else{
        personaje.src = "img/huevo-abierto.png"
      }
    }
})

function mostrarNumero(numero) {
    // crear el numero flotante como elemento span desde js
    const num = document.createElement("span")
    num.textContent = "+" + numero

    //para posicionarlo por encima del png, getBoundingClientRect dice dónde esta el png en la pantalla para sacar esas coordenadas automaticamente
    num.style.cssText = `
        position: fixed;
        left: ${personaje.getBoundingClientRect().left + 50}px;
        top: ${personaje.getBoundingClientRect().top}px;
        font-family: monospace;
        font-size: 20px;
        font-weight: bold;
        color: #dd7ea4;
        pointer-events: none;
        z-index: 1;
        animation: subirDesaparecer 0.8s ease forwards;
    `

    // para que el span sea visible
    document.body.appendChild(num)

    // eliminar el span cuando termine la animación
    setTimeout(() => num.remove(), 800)
}

//reloj de la barra
function actualizarReloj() {
    const ahora = new Date()
    const horas = String(ahora.getHours()).padStart(2, "0")
    const minutos = String(ahora.getMinutes()).padStart(2, "0")
    reloj.textContent = `${horas}:${minutos}`
}

actualizarReloj() // lo muestra al cargar sin esperar
setInterval(actualizarReloj, 1000) // lo actualiza cada segundo