/*-------------------------------- Variables --------------------------------*/
let dealerCount = 0
let dealerAces = 0
let dealerHiddenCard

let playerCount = 0
let playerAces = 0
let playerHit = true

let dealtCardTemp

let deck1
/*-------------------------------- Constants --------------------------------*/

/*------------------------ Cached Element References ------------------------*/
const body = document.querySelector('body')
/*-------------------------------- Functions --------------------------------*/

const init = () => {
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}

init()

const randomizeCard = () => {
  let randomIdx = Math.floor(Math.random() * deck1.length)
  let randomizedCard = deck1.splice(randomIdx, 1)[0]
  dealtCardTemp = randomizedCard;
  distributeCard();
  }

const distributeCard = () => {
  dealerHiddenCard = dealtCardTemp;
  dealerCount += getCardValue(dealerHiddenCard)
  dealerAces += checkForAces(dealerHiddenCard)

  while (dealerCount<17) {
    let dealerHitCard = dealtCardTemp
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('card', dealerHitCard)
    dealerDiv.appendChild(dealerNewDiv)
    
    dealerCount +=getCardValue(dealerHitCard)
    dealerAces += checkForAces(dealerHitCard)

    // randomizeCard();
  }
  console.log(dealerCount)
  console.log(dealerHiddenCard)
}


const getCardValue = (card) => {
  let cardValue = card.slice(1)
  let cardNumberValue = cardValue
  console.log(cardNumberValue);

  if( cardNumberValue === 'A') {
    return 11;
  } else if (cardNumberValue ==="K" || cardNumberValue === 'Q' || cardNumberValue === 'J') {
    return 10;
  } else {
    return Number(cardNumberValue)
  }
}

const checkForAces = (card) => {
  if(card.slice(1) === 'A') {
    return 1;
  } return 0;
}

const handleClick = (evt) => {
const button = evt.target.id
if(button === 'start-button') {

}
if(button === 'bet-button') {
  randomizeCard();
}

}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);