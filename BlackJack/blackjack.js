var dealerSum=0;
var yourSum=0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
let deck;
let dealerDeck;

var canHit = true; //Permite o jogador de puxar uma carta enqunto yourSum <=21
var canStay = true;

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
        
    dealerDeck=[];
    
    for (let i = 0; i < 2; i++) {
        let backCard = document.createElement("img");
        backCard.src="./cards/BACK.png";
        document.getElementById("dealer-cards").append(backCard);
        card=deck.pop()
        dealerDeck.push(card);
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
    }
    
/*
    let backCard = document.createElement("img");
    backCard.src="./cards/BACK.png";
    backCard.id="hidden"
    document.getElementById("dealer-cards").append(backCard);
    hidden=deck.pop()
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
*/

    // while (dealerSum < 15) {
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src="./cards/"+card+".png";

    //     dealerSum+=getValue(card); 
    //     dealerAceCount+=checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg);
    // }

    while (dealerSum < 15) {

        let backCard = document.createElement("img");
        backCard.src="./cards/BACK.png";
        document.getElementById("dealer-cards").append(backCard);
        let card = deck.pop();
        dealerDeck.push(card);
        dealerSum+=getValue(card); 
        dealerAceCount+=checkAce(card);
    }
    console.log(dealerSum);

    if (dealerSum>15 && dealerSum<18) {
        buscar=Math.round(Math.random());
        if (buscar==1) {
            let backCard = document.createElement("img");
            backCard.src="./cards/BACK.png";
            document.getElementById("dealer-cards").append(backCard);
            let card = deck.pop();
            dealerDeck.push(card);
            dealerSum+=getValue(card); 
            dealerAceCount+=checkAce(card);
        }
    }
    
    //Prepara as Cartas dos Jogador
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="./cards/"+card+".png";

        yourSum+=getValue(card); 
        yourAceCount+=checkAce(card);
        document.getElementById("your-cards").append(cardImg);
        document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    //document.getElementById("new").addEventListener("click", newRound);
}
function endRound() {

    //document.getElementById("hidden").src = "./cards/"+hidden+".png";
    divImagensDealer = document.getElementById("dealer-cards");

    Array.from(divImagensDealer.children).forEach(element => {
        card=dealerDeck.pop();
        element.src ="./cards/"+card+".png";
    });
    
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


    let btnNewRound = document.createElement("button");
    btnNewRound.className="btn btn-warning"; 
    btnNewRound.textContent = "New Game";
    btnNewRound.id="new";
    btnNewRound.onclick=newRound;   
    document.getElementById("buttons").append(btnNewRound);   
    
    //btn "novo jogo"
}
function reduceAce(playerSum, playerAceAcount){
    while (playerSum>21 && playerAceAcount > 0) {
        playerSum-=10;
        playerAceAcount-=1;
    }
    return playerSum;

}
function stay() {
    if (canStay==false) {
        return;
    }
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    canHit=false;
    canStay=false;
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
        canStay=false;
        endRound();
    }
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
}
function limparElementos(classe) {
    var div = document.getElementById(classe);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
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
//atualizar valor do player durante o hit e o inicio.
function newRound() {

    document.getElementById("new").remove();
    
    dealerSum=0;
    dealerAceCount=0;
    yourSum=0;
    yourAceCount=0;
    canHit=true;
    canStay=true;
    
    limparElementos("dealer-cards");
    limparElementos("your-cards");

    document.getElementById("results").innerText = "";
    document.getElementById("dealer-sum").innerText = "???";
    document.getElementById("your-sum").innerText = "";


    buildDeck();
    shuffleDeck();
    startGame()
}
