class Card {

    constructor(rank, suit, value) {
        this.rank = rank; // 1-13, represents the card images
        this.suit = suit; // diamonds, hearts, clubs, spades
        this.value = value; // face cards are all worth 10. Rank won't work for counting them.
    }

    /**
     takes card and displays it as an image
     */
    cardToImage() {
        var x = new Image();
        x.setAttribute("width", "79");
        x.setAttribute("height", "120");

        if(this.suit == "hearts") {
            x.setAttribute("src", "CardImages/" +this.rank +"H.jpg");
        }
        else if(this.suit == "diamonds") {
            x.setAttribute("src", "CardImages/" +this.rank +"D.jpg");
        }
        else if(this.suit == "spades") {
            x.setAttribute("src", "CardImages/" +this.rank +"S.jpg");
        }
        else if(this.suit == "clubs") {
            x.setAttribute("src", "CardImages/" +this.rank +"C.jpg");
        }

        return x;

    }

    getBackCard() {
        var x = new Image();
        x.setAttribute("width", "79");
        x.setAttribute("height", "120");
        x.setAttribute("src", "CardImages/Red_back.jpg");

        return x;
    }
}

/**
 Constructs a full 52 card deck
 */
class Deck {
    //Card array "The Deck"
    cards;
    //Keeping track of number of cards selected from deck
    numCardsSelected;

    constructor() {
        this.numCardsSelected = 0;
        this.deckInit();
    }

    /**
     returns random card from deck. Then makes sure you won't get that same card again
     */
    select() {
        var hand; //card to be returned
        var randIndex = Math.floor((Math.random()*51))-this.numCardsSelected; //index at 52-numSelected
        hand = this.cards[randIndex];
        //moves card selected to the end of the deck.
        this.cards[randIndex] = this.cards[51-this.numCardsSelected];
        this.cards[51-this.numCardsSelected] = hand;
        this.numCardsSelected++;

        return hand;
    }

    /**
     initializes a deck of 52 cards
     */
    deckInit() {
        this.cards = new Array(52);
        var i = 0;
        for(var rank = 1; rank <= 13; ++rank) {
            this.cards[i] = new Card(rank, "clubs", Math.min(rank, 10));
            i+=1;
            this.cards[i] = new Card(rank, "diamonds", Math.min(rank, 10));
            i+=1;
            this.cards[i] = new Card(rank, "hearts", Math.min(rank, 10));
            i+=1;
            this.cards[i] = new Card(rank, "spades", Math.min(rank, 10));
            i+=1;
        }
    }
}




test('Card initialized', () => {
  card = new Card(4, "hearts", 4);
  expect(card.value).toBe(4);
  expect(card.suit).toBe("hearts");
  expect(card.rank).toBe(4);
});

test('Deck initialized with exactly 52 cards', () => {
  deck = new Deck();
  for(var i = 0; i < 52; i++) {
    expect(deck.select()).not.toBeNull();
  }
  expect(deck.numCardsSelected).toBe(52);
  expect(deck.select()).toBeUndefined();


});
