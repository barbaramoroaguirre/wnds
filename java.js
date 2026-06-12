


const huevo = document.getElementById('huevo');

huevo.addEventListener('click', () => {
  // Añadimos la clase que contiene la animación
  huevo.classList.add('sacudir');
  
  // Quitamos la clase cuando la animación termina (500 milisegundos)
  setTimeout(() => {
    huevo.classList.remove('sacudir');
  }, 500); 
});