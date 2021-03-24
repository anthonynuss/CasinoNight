
//import Card from './Card.js';

/**
 deals two cards to a player
 */
var deck;
var dealerAt = 0;
var playerAt = 0;

function init() {
    deck = new Deck();
}

function deal() {
    //create new deck
    //var deck = new Deck();
    
    //select two cards from deck
    var card1 = deck.select();
    var card2 = deck.select();
    var card3 = deck.select();
    var card4 = deck.select();
    
    dealerAt += card2.rank + card4.rank;
    playerAt += card1.rank + card3.rank;
    //display the cards
//    card1.cardToImage();
//    card2.cardToImage();
    document.getElementById('U_CARDS').appendChild(card1.cardToImage());
    
    setTimeout(()=> {document.getElementById('D_CARDS').appendChild(card2.cardToImage());}, 1000);
    setTimeout(()=> {document.getElementById('U_CARDS').appendChild(card3.cardToImage());}, 2000);
    setTimeout(()=> {document.getElementById('D_CARDS').appendChild(card4.getBackCard());}, 3000);
    setTimeout(()=> {updateNumbersAt();}, 4000);
}

/**
 represents one card
 */
class Card {
    
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
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
        
        //document.getElementById('U_CARDS').appendChild(x);
        //document.getElementById('D_CARDS').appendChild(x);
        //ocument.body.appendChild(x);
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
    
    /**
     initializes a deck of 52 cards
     */
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

function updateNumbersAt() {
    
    document.getElementById('U_AT').innerHTML = "You are at: " +playerAt +"!";
}
