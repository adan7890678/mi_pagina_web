const button=document.querySelector('.button')
const nav=document.querySelector('.nav')
button.addEventListener('click',()=>{
  nav.classList.toggle('activo') 
  
})
// countdown

const objetivo = new Date('2026-07-25T08:00:00').getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = objetivo - ahora;

  let dias = '00', horas = '00', minutos = '00', segundos = '00';

  if (diferencia > 0) {
    dias = String(Math.floor(diferencia / (1000 * 60 * 60 * 24))).padStart(2, '0');
    horas = String(Math.floor((diferencia / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    minutos = String(Math.floor((diferencia / (1000 * 60)) % 60)).padStart(2, '0');
    segundos = String(Math.floor((diferencia / 1000) % 60)).padStart(2, '0');
  }

  const numeros = document.querySelectorAll('.countdown-number');
  if (numeros.length >= 4) {
    numeros[0].textContent = dias;
    numeros[1].textContent = horas;
    numeros[2].textContent = minutos;
    numeros[3].textContent = segundos;
  }
}

setInterval(actualizarContador, 1000);
actualizarContador();
