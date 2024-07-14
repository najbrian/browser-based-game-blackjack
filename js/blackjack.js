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
  return randomizedCard
  }

const checkAces = () => {
  if(dealerCount >= 21 && dealerAces >= 1) {
    dealerCount -= 10
    dealerAces --;
    return;
  } else if(dealerCount > 16) {
    return;
  }
}

const distributeCard = () => {
  dealerHiddenCard = randomizeCard();
  dealerCount += getCardValue(dealerHiddenCard)
  dealerAces += checkForAces(dealerHiddenCard)
  document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');
  document.getElementById('dealer-card').classList.add(dealerHiddenCard);
<<<<<<< HEAD
=======

  console.log(document.getElementById('dealer-card').classList);
>>>>>>> a8b2f7cdd64d7137c4e1e192be433cb5e42262d5

  while (dealerCount<17) {
    let dealerHitCard = randomizeCard()
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('card', dealerHitCard)
    dealerDiv.appendChild(dealerNewDiv)
    
    dealerCount +=getCardValue(dealerHitCard)
    dealerAces += checkForAces(dealerHitCard)
    
    randomizeCard();

<<<<<<< HEAD
    checkAces();

=======
>>>>>>> a8b2f7cdd64d7137c4e1e192be433cb5e42262d5
    console.log(dealerCount)
    console.log(dealerAces)
  }
  console.log(dealerCount)
  console.log(dealerHiddenCard)
}


const getCardValue = (card) => {
  let cardValue = card.slice(1)
  let cardNumberValue = cardValue
<<<<<<< HEAD
  // console.log(card);
=======
  console.log(card);
>>>>>>> a8b2f7cdd64d7137c4e1e192be433cb5e42262d5

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
  distributeCard();
}

}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);