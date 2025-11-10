const gameBoard = document.getElementById('gameBoard');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

const cardArray = [
  { name: '🍎' }, { name: '🍎' },
  { name: '🍌' }, { name: '🍌' },
  { name: '🍇' }, { name: '🍇' },
  { name: '🍉' }, { name: '🍉' },
  { name: '🍓' }, { name: '🍓' },
  { name: '🥝' }, { name: '🥝' },
  { name: '🍍' }, { name: '🍍' },
  { name: '🍑' }, { name: '🍑' }
];

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

// Shuffle cards
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
  gameBoard.innerHTML = '';
  cardArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', index);
    cardElement.textContent = '';
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  if (cardsChosenIds.includes(cardId) || this.classList.contains('flipped')) return;
  
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.classList.add('flipped');
  this.textContent = cardArray[cardId].name;

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('.card');
  const [firstId, secondId] = cardsChosenIds;

  if (cardsChosen[0] === cardsChosen[1]) {
    cardsWon.push(cardsChosen[0]);
  } else {
    cards[firstId].classList.remove('flipped');
    cards[firstId].textContent = '';
    cards[secondId].classList.remove('flipped');
    cards[secondId].textContent = '';
  }

  cardsChosen = [];
  cardsChosenIds = [];
  resultDisplay.textContent = `Score: ${cardsWon.length} / ${cardArray.length / 2}`;

  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "🎉 Congratulations! You found all pairs!";
  }
}

// Restart game
restartBtn.addEventListener('click', () => {
  cardsChosen = [];
  cardsChosenIds = [];
  cardsWon = [];
  cardArray.sort(() => 0.5 - Math.random());
  createBoard();
  resultDisplay.textContent = '';
});

createBoard();
