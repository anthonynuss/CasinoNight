
//import Card from './Card.js';

function deal() {
    var deck = new Deck();
    
    document.write(deck.select().rank +" of " +deck.select().suit);
    document.write(deck.select().rank +" of " +deck.select().suit);
}

/**
 represents one card
 */
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    
    cardToImage() {
        
    }
}

/**
 Constructs a full 52 card deck
 */
class Deck {
    cards;
    numCardsSelected;
    
    constructor() {
        this.numCardsSelected = 0;
        this.init();
    }
    
    /**
     returns random card from deck. Then makes sure you won't get that same card again
     */
    select() {
        var hand; //card to be returned
        var randIndex = Math.floor((Math.random()*52))-this.numCardsSelected; //index at 52-numSelected
        hand = this.cards[randIndex];
        //moves card selected to the end of the deck.
        this.cards[randIndex] = this.cards[51-this.numCardsSelected];
        this.cards[51-this.numCardsSelected] = hand;
        this.numCardsSelected++;
        
        return hand;
    }
    init() {
        this.cards = new Array(52);
        var i = 0;
        for(var rank = 1; rank <= 13; ++rank) {
            this.cards[i] = new Card(rank, "clubs");
            i+=1;
            this.cards[i] = new Card(rank, "diamonds");
            i+=1;
            this.cards[i] = new Card(rank, "hearts");
            i+=1;
            this.cards[i] = new Card(rank, "spades");
            i+=1;
        }
    }
}
