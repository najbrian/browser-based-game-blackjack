/*-------------------------------- Variables --------------------------------*/
let dealerCount = 0
let dealerAces = 0

let playerCount = 0
let playerAces = 0

let dealtCardTemp

let deck1
/*------------------------ Cached Element References ------------------------*/
const body = document.querySelector('body')
const message = document.getElementById('player-message')
/*-------------------------------- Functions --------------------------------*/

const init = () => {
  deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]
}

init()

const randomizeCard = () => {
  let randomIdx = Math.floor(Math.random() * deck1.length)
  let randomizedCard = deck1.splice(randomIdx, 1)[0]
  return randomizedCard
}

const checkAces = (count, aces) => {
  if (count >= 21 && aces >= 1) {
    count -= 10
    aces--;
  } else if (count > 10) {
    count -= 10
  } return;
}

const blackjackWinLogic = () => {
  message.innerHTML = `You got BlackJack! You win! $$$$$`
  document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');
}

const dealerBlackJackLogic= () => {

  message.innerHTML = `Dealer has 21. You lose $$$$`
  document.querySelector('#hit-button').style.display = 'none'
  document.querySelector('#stand-button').style.display = 'none'
}

const winLogic =() => {
  if(playerCount > 21) {
    message.innerHTML = `Player bust... You lose $$$$$`
    document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');
    
  }

  if(playerCount === dealerCount) {
    message.innerHTML = `Player and Dealer have the same count. You tie!`
  }

  if(dealerCount > playerCount) {
    message.innerHTML = `Dealer has ${dealerCount} and Player has ${playerCount}. You lose $$$$`
  }
}

const playerDistributeCard = (evt) => {
  const button = evt.target.id
  let playerCard1 = randomizeCard();
  let dealerShowingCard = randomizeCard();
  let playerCard2 = randomizeCard();
  let dealerHiddenCard = randomizeCard();
  
  playerCount += getCardValue(playerCard1)
  playerAces += checkForAces(playerCard1)
  document.getElementById('player-card-1').classList.add(playerCard1);
  
  dealerCount += getCardValue(dealerShowingCard)
  dealerAces += checkForAces(dealerShowingCard)
  document.getElementById('dealer-showing-card').classList.add(dealerShowingCard);
  
  playerCount += getCardValue(playerCard2)
  playerAces += checkForAces(playerCard2)
  document.getElementById('player-card-2').classList.add(playerCard2);
  
  dealerCount += getCardValue(dealerHiddenCard)
  dealerAces += checkForAces(dealerHiddenCard)
  document.getElementById('dealer-card').classList.add(dealerHiddenCard, 'large');

  if(playerCount === 21) {
    document.querySelector('#hit-button').style.display = 'none'
    document.querySelector('#stand-button').style.display = 'none'
    blackjackWinLogic();
  }
}

const playerHitButton = () => {
  let playerHitCard = randomizeCard()
  let playerDiv = document.getElementById('player');
  let playerNewDiv = document.createElement('div');

  playerNewDiv.classList.add('card', 'large', playerHitCard)
  playerDiv.appendChild(playerNewDiv)

  playerCount += getCardValue(playerHitCard)
  playerAces += checkForAces(playerHitCard)

  randomizeCard();

  checkAces(playerCount, playerAces);

  if (playerCount > 21 || playerCount === 21) {
    document.querySelector('#hit-button').style.display = 'none'
    document.querySelector('#stand-button').style.display = 'none'
    winLogic();
  }
}

const playerStandButton = () => {
  dealerDistributeCard();
}

const dealerDistributeCard = () => {
  document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');

  if(playerCount > 21) {
    winLogic();
  } else if(dealerCount ===21) {
    dealerBlackJackLogic();
  } else while (dealerCount < 17) {
    let dealerHitCard = randomizeCard()
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('large', 'card', dealerHitCard)
    dealerDiv.appendChild(dealerNewDiv)

    dealerCount += getCardValue(dealerHitCard)
    dealerAces += checkForAces(dealerHitCard)

    randomizeCard();

    checkAces(dealerCount, dealerAces);
    winLogic();
  }
}

const getCardValue = (card) => {
  let cardValue = card.slice(1)
  let cardNumberValue = cardValue

  if (cardNumberValue === 'A') {
    return 11;
  } else if (cardNumberValue === "K" || cardNumberValue === 'Q' || cardNumberValue === 'J') {
    return 10;
  } else {
    return Number(cardNumberValue)
  }
}

const checkForAces = (card) => {
  if (card.slice(1) === 'A') {
    return 1;
  } return 0;
}

const handleClick = (evt) => {
  const button = evt.target.id
  if (button === 'start-button') {

  }
  if (button === 'bet-button') {
    randomizeCard();
    playerDistributeCard(evt);
  }
  if (button === 'hit-button') {
    playerHitButton();
  }
  if (button === 'stand-button') {
    playerStandButton();
  }
}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);