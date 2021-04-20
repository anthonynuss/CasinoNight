/**
 Things to be fixed:
 -ace value
 -when user receives a lot of cards we stop getting cards
 */

/**
 deals two cards to a player
 */

var deck; //deck to be used
var chips = 300;
var betAmount;
var dealerAt; //value the dealer is at
var playerAt; //value the player is at
var dealerCard2; //this is the dealers hidden card. We want to eventually show it
var cardNoise;

/**
 initializes required values
 */
function init() {
    deck = new Deck();
    dealerAt = 0;
    playerAt = 0;
    betAmount = 0;

    document.getElementById('C_AMOUNT').innerHTML = "Chip amount = " +chips;
    document.getElementById('B_AMOUNT').innerHTML = "Current bet = " +betAmount;
    document.getElementById('D_AT').innerHTML = "";
    document.getElementById('U_AT').innerHTML = "";
    document.getElementById("C_FIVE").disabled = false;
    document.getElementById("C_TEN").disabled = false;
    document.getElementById("C_TFIVE").disabled = false;

    cardNoise = document.getElementById("carddealt"); // card noise
}

/**
 deals two cards to user and dealer
 */
function deal() {
    document.getElementById('dealbtn').style.visibility = 'hidden' // remove deal button
    //disable the betting buttons
    document.getElementById("C_FIVE").disabled = true;
    document.getElementById("C_TEN").disabled = true;
    document.getElementById("C_TFIVE").disabled = true;
    document.getElementById('PLACEBET').innerHTML = "";

    //select two cards for each from deck
    var playerCard1 = deck.select();
    var dealerCard1 = deck.select();
    var playerCard2 = deck.select();
    dealerCard2 = deck.select(); //dealers hidden card

    //updates the number the player/dealer is at
    dealerAt += dealerCard1.value + dealerCard2.value;
    playerAt += playerCard1.value + playerCard2.value;

    //gives player/dealer cards. Timeout used to give dealing animation. Sound also called
    cardNoise.play();
    document.getElementById('U_CARDS').appendChild(playerCard1.cardToImage());
    setTimeout(()=> {cardNoise.play(); document.getElementById('D_CARDS').appendChild(dealerCard1.cardToImage());}, 1000);
    setTimeout(()=> {cardNoise.play(); document.getElementById('U_CARDS').appendChild(playerCard2.cardToImage());}, 2000);
    setTimeout(()=> {cardNoise.play(); document.getElementById('D_CARDS').appendChild(dealerCard2.getBackCard());}, 3000);

    setTimeout(()=> {updateNumbersAt();}, 4000); //update what number user is at

    // display players option buttons
    setTimeout(()=> {document.getElementById('hitbtn').style.visibility = 'visible';
                     document.getElementById('standbtn').style.visibility = 'visible';}, 5000);
}

/**
 Simulates hitting in blackjack (user recieves another card)
 */
function hit() {
    var cardNew = deck.select();

    playerAt += cardNew.value;

    cardNoise.play();
    document.getElementById('U_CARDS').appendChild(cardNew.cardToImage());

    updateNumbersAt();

    // If user goes over 21 they bust.
    if(playerAt > 21) {
        document.getElementById('U_AT').innerHTML = "You Bust!";
        document.getElementById('D_AT').innerHTML = "Dealer wins!";
        //removes the back card
        var dealerCards = document.getElementById('D_CARDS')
        dealerCards.removeChild(dealerCards.childNodes[1]);

        //shows the dealers hidden card
        cardNoise.play();
        document.getElementById('D_CARDS').appendChild(dealerCard2.cardToImage());
        document.getElementById('hitbtn').style.visibility = 'hidden'; // removes hit option
        document.getElementById('standbtn').style.visibility = 'hidden'; //removes stand
        document.getElementById('redealbtn').style.visibility = 'visible'; //re-deal option
    }

}

/**
 Dealers turn (players turn is over)
 */
function dealerTurn() {
    var timeoutValue = 1000;

    document.getElementById('hitbtn').style.visibility = 'hidden'; // removes hit option
    document.getElementById('standbtn').style.visibility = 'hidden'; //removes stand option

    //removes the back card
    var dealerCards = document.getElementById('D_CARDS')
    dealerCards.removeChild(dealerCards.childNodes[1]);

    //updates what the dealer is add and shows their former hidden card
    cardNoise.play();
    document.getElementById('D_AT').innerHTML = "Dealer is at: " +dealerAt +"!";
    document.getElementById('D_CARDS').appendChild(dealerCard2.cardToImage());


    while(dealerAt < 17) {
            var dealerNewCard = deck.select();
            dealerAt += dealerNewCard.value;
            setTimeout(()=> {
            cardNoise.play();
            document.getElementById('D_CARDS').appendChild(dealerNewCard.cardToImage());
            document.getElementById('D_AT').innerHTML = "Dealer is at: " +dealerAt +"!";
            }, timeoutValue);
            timeoutValue += 1000;

    }

    setTimeout(()=> {result();}, timeoutValue);
}


/**
 represents one card
 */
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
        this.deckInit();
    }

    /**
     returns random card from deck. Then makes sure you won't get that same card again
     */
    select() {
        var hand; //card to be returned
        var randIndex = Math.max(0, Math.floor((Math.random()*52))-this.numCardsSelected); //index at 52-numSelected
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

/*
user bets a certain amount. Amount is updated in appropriate variables
*/
function bet(amount) {
  if((chips - amount) >= 0) {
    chips -= amount;
    betAmount += amount;
    document.getElementById('C_AMOUNT').innerHTML = "Chip amount = " +chips;
    document.getElementById('B_AMOUNT').innerHTML = "Current bet = " +betAmount;

    document.getElementById('dealbtn').style.visibility = 'visible'; //let the user deal after placing beth
  }
}

/*
updates the number the player is at
*/
function updateNumbersAt() {

    document.getElementById('U_AT').innerHTML = "You are at: " +playerAt +"!";
}



/**
 after dealer and player take their turn.
 */
function result() {
    if(dealerAt > 21) {
        document.getElementById('D_AT').innerHTML = "Dealer Bust!";
        document.getElementById('U_AT').innerHTML = "You win!";
        chips += betAmount*2;
    }else if(dealerAt > playerAt) {
        document.getElementById('D_AT').innerHTML = "Dealer wins!";
        document.getElementById('U_AT').innerHTML = "You Lose!";
    }else if(playerAt > dealerAt) {
        document.getElementById('D_AT').innerHTML = "Dealer loses!";
        document.getElementById('U_AT').innerHTML = "You win!";
        chips += betAmount*2;
    }else if(playerAt == dealerAt) {
        document.getElementById('U_AT').innerHTML = "You push!";
    }

    document.getElementById('redealbtn').style.visibility = 'visible'; //re-deal option
    document.getElementById('C_AMOUNT').innerHTML = "Chip amount = " +chips;

}

/*
when player presses redeal button.
*/
function redeal() {
    document.getElementById('redealbtn').style.visibility = 'hidden'; //redeal option hidden

    document.getElementById('PLACEBET').innerHTML = "Place your bet!";

    //remove all cards
    var dealerCards = document.getElementById('D_CARDS')
    removeAllCards(dealerCards);

    var playerCards = document.getElementById('U_CARDS')
    removeAllCards(playerCards);

    init();

}

/*
removes all cards on the screen
*/
function removeAllCards(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
