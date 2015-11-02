(function() {
  'use strict';


// Card Constructor
function Card(suit, num) {
    var suit = suit;
    var number = num;
    this.getNumber = function() {
        return number;
    };
    this.getSuit = function() {
        return suit;
    };
    this.getValue = function() {
        if (number === 1) {
            return 11;
        } else if (number > 10) {
            return 10;
        } else {
            return number;
        }
    };
}

var Deal = function() {
        var cards = newGame.getDeck(); // returns cards
        var cardsLeft = cards.length; //length of cards array
        var index = Math.floor(Math.random() * cardsLeft); //cards at 52 on refresh
        var card = cards[index];
//        console.log(cards.length);
        newGame.takeCard(index, 1);
        return new Card(card[0], card[1]);
    };

//Hand constructor
function Hand() {
    var card1 = Deal(); //calls deal
    var card2 = Deal(); // calls deal
    var cards = [card1, card2];

    this.getHand = function() {
        return cards;
    };

    this.score = function(){
        var total = 0;
        var aceCount = 0;
        for (var i = 0; i < cards.length; i++){
            if (cards[i].getValue()===11){
                aceCount++;
            }
            total += cards[i].getValue();
        }
        while (total>21 && aceCount>0){
                total -= 10;
                aceCount--;
            }
        return total;
    };

    this.printHand = function () {
        var preview = "";

        var suitPrinter = function (x) {
            switch (x) {
            case 1:
                return "Clubs";
                break;
            case 2:
                return "Hearts";
                break;
            case 3:
                return "Spades";
                break;
            default:
                return "Diamonds";
                break;

            }
        };
        var faceCardPrinter = function(y) {
            switch (y) {
            case 1:
                return "Ace";
                break;
            case 11:
                return "Jack";
                break;
            case 12:
                return "Queen";
                break;
            case 13:
                return "King";
                break;
            default:
                return y;
                break;
            }
        };
        for (var i = 0; i < cards.length; i++) {
            preview += "\n" + faceCardPrinter(cards[i].getNumber()) + " of " + suitPrinter(cards[i].getSuit()) + ", ";

        }
        return preview;
    };

    this.hitMe = function() {
        var newCard = Deal();
        cards.push(newCard);
    };

}

function displayCard(hand) {
  this.hand = hand;
  $('.front').append(hand[0] + '<br>' + hand[1]);

}

function playAsDealer() {
    var dealHand = new Hand();
    while (dealHand.score() < 17) {
        dealHand.hitMe();
    }
    $('.dealerFront').append("<span>" + "Dealer's " + dealHand.printHand() + "</span>" + "<br>");
    $('.output').append("<span>" + "Dealer Total: " + dealHand.score() + "</span>");
    return dealHand.score();

}

function playAsUser() {
var userHand = new Hand();
var playing = confirm("Your hand: " + userHand.printHand() + "\n" + "Current score: " + userHand.score() + "\n" + "Click OK to hit or cancel for standing.");
$('.userFront').append("<span>" + " " + userHand.printHand() + "</span>" + "<br>");
    while (playing && userHand.score() < 21) {
    userHand.hitMe();
    playing = confirm("Your hand: " + userHand.printHand() + " for the score of " + userHand.score());
    }
    $('.output').append("<span>" + "Player Total: " + userHand.score() + "</span>" + "<br>");
    return userHand.score();
}

function declareWinner(user, dealer) {
    var user = user;
    var dealer = dealer;

    if (user === dealer) {
        return "You tied!";
    } else if (user <= 21 && dealer <= 21) {
        if (user > dealer) {
            return "You win!";
        } else {
            return "You lose!";
        }
    } else if (user > 21 && dealer > 21) {
        return "You tied!";
    } else if (user > 21 || dealer > 21) {
        if (dealer > 21) {
            return "You win!";
        } else {
            return "You lose!";
        }
    }


}
function Game() {
    var cards = [];
    for (var i = 0; i < 4; i++) {
        for(var j = 0; j < 13; j++) {
            cards.push([(i +1), (j + 1)]);
        }
    }
    this.getDeck = function () {
        return cards;
    };

    this.takeCard = function(index) {
        cards.splice(index, 1);
    };

    this.playGame = function() {

        var playing = true;
        var total = 0;
        while (playing) {
            var user = playAsUser();
            var dealer = playAsDealer();
            if (user <=21) {
                total += user;
                playing = confirm(declareWinner(user, dealer) + "\n" + "Total points: " + total + "\n" + "Another round?");
            } else {
                total = 0;
                playing = false;
            }

        }
        alert("Your score: " + total + " Thanks for playing.");
        return;
    };
    }

    $('.card').click(function(){
  $(this).toggleClass('flip');
});


var newGame = new Game();

newGame.playGame();


}) ();
