const suits = ['C', 'S', 'H', 'D'];
const values = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
let deck = [];
let drawn = [];

// Get DOM elements
let resetB = document.getElementById('reset');
let shuffleB = document.getElementById('shuffle');
let drawB = document.getElementById('draw');
let sortB = document.getElementById('sort');
let visibleCards = document.getElementById('cardsToDisplay');

// Card Class
function Card(value, suit, colour, presedence) {
  this.value = value;
  this.suit = suit;
  this.colour = colour
  this.presedence = presedence;
}

// Initialise Deck
let createDeck = () => {
  for (let suit in suits) {
    for (let value in values) {
        if (suits[suit] === 'D' || suits[suit] == 'H') {
          deck.push(new Card(values[value], suits[suit], 'R', value));
        } else {
          deck.push(new Card(values[value], suits[suit], 'B', value));
        };
      }
    }
  drawn = deck;
  return deck
};


// Shuffle the displayed cards
let shuffle = (cards) => {
  let count = cards.length-1;
  for (let i=cards.length-1; i>=0; i--){
    let index = Math.floor(Math.random()*(count+1));
    let x = cards[i]
    cards[i] = cards[index];
    cards[index] = x;
    count -= 1;
  }
  drawn = cards;
  return cards;
}

// Draw a selected number of cards from the deck
let draw = num => {
  drawn = [];
  for (let i=0; i<num; i++) {
    let index = Math.floor(Math.random()*(deck.length));
    drawn.push(deck[index]);
    deck.splice(index, 1);
  }
  return drawn;
}


// Order cards by Suit
let order = cards => {
  const suits = ['C', 'S', 'H', 'D'];
  // Order by Suit
  let ordered = suits.map(suit => {
    let result = cards.filter(card => card.suit === suit);
    return result
  });

  // Order by presedence
  ordered.forEach(set => {
      set.sort((a,b) => {return a.presedence - b.presedence});
  })

  // concatate the suit sets
  deck = ordered.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
  );
  drawn = deck;
  return deck;
}

// Reset the Deck
let reset = () => {
  deck = [];
  drawn = deck;
  displayDeck(createDeck());
}

// Display the Cards on the screen
function displayDeck(cards) {
  // Empty the deck div
  visibleCards.innerHTML = '';
  // Fill deck div with cards
  for (let i=0; i<cards.length; i++) {

    // Create the elements in DOM
    let divCard = document.createElement("div");
    let divValue = document.createElement('div');
    let divSuit = document.createElement('img');

    // Give card,value,suit divs a class
    divValue.className = "value"
    divCard.className = "card";
    divSuit.className = "suit";

    // Set inner html of div to be the cards info
    divValue.innerHTML = cards[i].value;
    switch (cards[i].suit) {
      case 'S':
        divSuit.src = '../images/spade.png';
        break;
      case 'C':
        divSuit.src = '../images/club.png';
        break;
      case 'D':
        divSuit.src = '../images/diamond.png';
        break;
      case 'H':
        divSuit.src = '../images/heart.png';
        break;
    }

    // Make suit and value children of card
    // Make card a child of deck
    divCard.appendChild(divValue);
    divCard.appendChild(divSuit);
    visibleCards.appendChild(divCard);
  };
};


// After page has loaded
// Actions
reset();

// Reset the cards
resetB.addEventListener('click', function() {
  reset();
});

// Shuffle the cards on the table
shuffleB.addEventListener('click', function() {
  displayDeck(shuffle(drawn));
});

// Draw a number of cards out from the deck
drawB.addEventListener('click', function() {
  let retVal = prompt('How many cards to draw?', 52);
  console.log(retVal);
  if (retVal != null) {
    if (retVal != 0) {
      drawn = draw(retVal);
      displayDeck(drawn);
    }
  }
});

// Sort the current cards on the table
sortB.addEventListener('click', function() {
  displayDeck(order(drawn));
});
