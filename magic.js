let deck = []
const values = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const suits = ['C', 'S', 'H', 'D']

// Card Class
function Card(value, suit, colour, presedence) {
  this.value = value;
  this.suit = suit;
  this.colour = colour
  this.presedence = presedence;
}

// Initialise Deck
let createDeck = () => {
for (suit in suits) {
  for (value in values) {
      if (suits[suit] === 'D' || suits[suit] == 'H') {
        deck.push(new Card(values[value], suits[suit], 'R', value));
      } else {
        deck.push(new Card(values[value], suits[suit], 'B', value));
      };
    }
  }
}


// Shuffle
let shuffle = deck => {
  let count = deck.length-1;
  for (var i=deck.length-1; i>=0; i--){
    let index = Math.floor(Math.random()*(count+1));
    let x = deck[i]
    deck[i] = deck[index];
    deck[index] = x;
    count -= 1;
  }
  return deck
}

// Draw
let draw = num => {
  let drawn = [];
  for (i=0; i<num; i++) {
    let index = Math.floor(Math.random()*(deck.length));
    drawn.push(deck[index]);
    deck.splice(index, 1);
  }
  return drawn;
}


// Order cards by Suit
let order = cards => {

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
  var flattened = ordered.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
  );
  return flattened;

}




createDeck();
shuffle(deck);
let cards = draw(10);

console.log(cards)


//cards.sort((a,b) => {return a.presedence - b.presedence});

//console.log(cards)

//console.log(cards);
console.log();
let suitO = order(cards)
console.log(suitO)
// console.log(cards);
// console.log();
// console.log(order(cards));
