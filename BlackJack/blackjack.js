var dealerSum=0;
var yourSum=0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
let deck;

var canHit = true; //Permite o jogador de puxar uma carta enqunto yourSum <=21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j]+"-"+types[i]);
        } 
    }
}
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random()*deck.length);
        
        let temp = deck[i];
        deck[i]=deck[j];
        deck[j] = temp;

    }
    console.log(deck);
}
function startGame() {
    hidden=deck.pop()
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 15) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="./cards/"+card+".png";

        dealerSum+=getValue(card); 
        dealerAceCount+=checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="./cards/"+card+".png";

        yourSum+=getValue(card); 
        yourAceCount+=checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}
function endRound() {

    document.getElementById("hidden").src = "./cards/"+hidden+".png";
    yourSum = reduceAce(yourSum, yourAceCount);

    let message = "";
    if (yourSum>21) {
        message="You Lose!";
    }else if (dealerSum > 21) {
        message ="You Win!!!";
    }else if (yourSum==dealerSum) {
        message="TIE!!!";
    }else if (yourSum > dealerSum) {
        message="You Win!!!";
    }else if (yourSum<dealerSum) {
        message="You Lose!";        
    }

    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
}
function reduceAce(playerSum, playerAceAcount){
    while (playerSum>21 && playerAceAcount > 0) {
        playerSum-=10;
        playerAceAcount-=1;
    }
    console.log(playerSum);
    return playerSum;

}
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    canHit=false;
    endRound();
}
function hit() {
    if (canHit==false) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src="./cards/"+card+".png";

    yourSum+=getValue(card); 
    yourAceCount+=checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit=false;
        endRound();
    }
   
}
function getValue(card) {
    let data = card.split("-"); // "3-D" --> "3", "D"
    let value = data[0];    

    if (isNaN(value)) {
        if (value=="A") {
            return 11;
        }
        return 10;
    }

    return  parseInt(value); 
}
function checkAce(card) {
    if (card[0]=="A") {
        return 1;
    }
    return 0;
}