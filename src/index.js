const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

// src/index.js

window.addEventListener('load', (event) => {

  memoryGame.shuffleCards();

  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  let firstCard = null;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((cardElement) => {
    cardElement.addEventListener('click', () => {
      const cardName = cardElement.getAttribute('data-card-name');

      if (!firstCard && memoryGame.pickedCards.length < 2) {
        // First card click
        firstCard = cardElement;
        cardElement.classList.add('turned');
        memoryGame.pickedCards.push(cardName);
      } else if (memoryGame.pickedCards.length === 1) {
        // Second card click
        cardElement.classList.add('turned');
        memoryGame.pickedCards.push(cardName);

        // Check if the pair is correct
        const card1 = memoryGame.pickedCards[0];
        const card2 = memoryGame.pickedCards[1];
        const isPair = memoryGame.checkIfPair(card1, card2);

        console.log(`Cards clicked: ${card1}, ${card2}`);

        // Pause for a moment to allow the user to see the second card
        setTimeout(() => {
          document.querySelectorAll('.card').forEach((card) => {
            if (!card.classList.contains('blocked')) {
            card.classList.remove('turned');
            }
          });

          if (!isPair) {
            // If not a pair, flip the cards back
            firstCard.classList.remove('turned');
            cardElement.classList.remove('turned');
          } else {
            // If it's a pair, block the cards
            firstCard.classList.add('blocked');
            cardElement.classList.add('blocked');
          }

          // Clear the picked cards array for the next turn
          memoryGame.pickedCards = [];
          firstCard = null;

          // Check if the game is finished
          if (memoryGame.checkIfFinished()) {
            alert('Congratulations! You won!!!');
          }
        }, 1000); // 1000 milliseconds (1 second) pause
      }
    });
  });
});
