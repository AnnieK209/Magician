'use strict';

var suits = ['C', 'S', 'H', 'D'];
var values = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
var deck = [];
var drawn = [];

// Get DOM elements
var inf = document.getElementById('name');
var resetB = document.getElementById('reset');
var shuffleB = document.getElementById('shuffle');
var drawB = document.getElementById('draw');
var sortB = document.getElementById('sort');
var visibleCards = document.getElementById('cardsToDisplay');

// Card Class
function Card(value, suit, colour, presedence) {
  this.value = value;
  this.suit = suit;
  this.colour = colour;
  this.presedence = presedence;
}

// Initialise Deck
var createDeck = function createDeck() {
  for (var suit in suits) {
    for (var value in values) {
      if (suits[suit] === 'D' || suits[suit] == 'H') {
        deck.push(new Card(values[value], suits[suit], 'R', value));
      } else {
        deck.push(new Card(values[value], suits[suit], 'B', value));
      };
    }
  }
  drawn = deck;
  return deck;
};

// Shuffle the displayed cards
var shuffle = function shuffle(cards) {
  var count = cards.length - 1;
  for (var i = cards.length - 1; i >= 0; i--) {
    var index = Math.floor(Math.random() * (count + 1));
    var x = cards[i];
    cards[i] = cards[index];
    cards[index] = x;
    count -= 1;
  }
  drawn = cards;
  return cards;
};

// Draw a selected number of cards from the deck
var draw = function draw(num) {
  drawn = [];
  for (var i = 0; i < num; i++) {
    var index = Math.floor(Math.random() * deck.length);
    drawn.push(deck[index]);
    deck.splice(index, 1);
  }
  return drawn;
};

// Order cards by Suit
var order = function order(cards) {
  var suits = ['C', 'S', 'H', 'D'];
  // Order by Suit
  var ordered = suits.map(function (suit) {
    var result = cards.filter(function (card) {
      return card.suit === suit;
    });
    return result;
  });

  // Order by presedence
  ordered.forEach(function (set) {
    set.sort(function (a, b) {
      return a.presedence - b.presedence;
    });
  });

  // concatate the suit sets
  deck = ordered.reduce(function (accumulator, currentValue) {
    return accumulator.concat(currentValue);
  });
  drawn = deck;
  return deck;
};

// Reset the Deck
var reset = function reset() {
  deck = [];
  drawn = deck;
  displayDeck(createDeck());
};

// Display the Cards on the screen
function displayDeck(cards) {
  // Empty the deck div
  visibleCards.innerHTML = '';
  // Fill deck div with cards
  for (var i = 0; i < cards.length; i++) {

    // Create the elements in DOM
    var divCard = document.createElement("div");
    var divValue = document.createElement('div');
    var divSuit = document.createElement('img');

    // Give card,value,suit divs a class
    divValue.className = "value";
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
resetB.addEventListener('click', function () {
  reset();
});

// Shuffle the cards on the table
shuffleB.addEventListener('click', function () {
  displayDeck(shuffle(drawn));
  inf.innerHTML = 'I HAVE SHUFFLED';
});

// Draw a number of cards out from the deck
drawB.addEventListener('click', function () {
  var retVal = prompt('How many cards to draw?', 52);
  console.log(retVal);
  if (retVal != null) {
    if (retVal != 0) {
      drawn = draw(retVal);
      displayDeck(drawn);
    }
  }
});

// Sort the current cards on the table
sortB.addEventListener('click', function () {
  displayDeck(order(drawn));
});