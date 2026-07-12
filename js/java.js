


const huevo = document.getElementById('huevo');

huevo.addEventListener('click', () => {
  // Añadimos la clase que contiene la animación
  huevo.classList.add('sacudir');
  
  // Quitamos la clase cuando la animación termina (500 milisegundos)
  setTimeout(() => {
    huevo.classList.remove('sacudir');
  }, 500); 
});


// seleccionamos el huevo y empezamos el contador de clicks
const personaje = document.querySelector(".img-personaje")
let contador = 0

// cada vez que se hace click al png, el contador suma 1
personaje.addEventListener("click", () => {
    contador++
    mostrarNumero(contador)
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