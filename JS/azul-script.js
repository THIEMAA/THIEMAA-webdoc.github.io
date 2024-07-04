// Variables globales para controlar el estado del juego y las cartas volteadas
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//audio al hacer click
var audio = new Audio("audio/click.mp3");
audio.loop=false;

//se declara solo la función de play la que luego es invocada al principio del flipcard
function playAudio() {
  audio.currentTime = 0;
  audio.play();
}

// Función para voltear las cartas al hacer clic en ellas
function flipCard() {
  playAudio()//Puse la función de play audio arriba del todo para que suene siempre que se haga click, no hace falta la de pausa para esto.

  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Función para comprobar si las cartas coinciden
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

// Función para deshabilitar cartas coincidentes
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Función para voltear las cartas si no coinciden
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

// Función para restablecer el estado del tablero después de cada turno
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Función para iniciar el juego y mezclar las cartas al cargar la página
function startGame() {
  const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

/*
................................................................. */

function playreinicio() {
  audio.currentTime = 0;
  audio.play();
}

/*.................................................................. */

// Función para reiniciar el juego al presionar el botón "Reiniciar"
function restartGame() {

   playreinicio()// Puse la función de play audio arriba del todo para que suene siempre que se haga click, no hace falta la de pausa para esto.

  const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  startGame(); // Mezclar las cartas al reiniciar el juego
  resetBoard(); // Restablecer el estado del tablero
}

startGame(); // Iniciar el juego al cargar la página

const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));


