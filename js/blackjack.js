/*-------------------------------- Variables --------------------------------*/
let dealerTotalCount = 0
let dealerAceCount = 0

let playerTotalCount = 0
let playerAceCount = 0

let playerCash = 1000
let playerBet = 0

let dealtCardTemp

let deck1

/*------------------------ Cached Element References ------------------------*/
const body = document.querySelector('body')
const message = document.getElementById('player-message')

const dealerCard1 = document.getElementById('dealer-card')
const dealerCard2 = document.getElementById('dealer-showing-card')

const playerHoldingCard1 = document.getElementById('player-card-1')
const playerHoldingCard2 = document.getElementById('player-card-2')

const playerActionButtons = document.getElementById('player-buttons')
const playerSubmittedBetValue = document.getElementById('bet-placeholder')
const playerBetButton = document.getElementById('bet-button')
const playAgainButton = document.getElementById('play-again-button')

const helpDirections = document.getElementById('help-directions')
const playerCashMessage = document.getElementById('playercash')
/*-------------------------------- Functions --------------------------------*/

const init = () => {
  deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]
}

init()

const newGame = () => {
  dealerTotalCount = 0
  dealerAceCount = 0
  playerTotalCount = 0
  playerAceCount = 0
  playerBet = 0

  dealerCard1.className = ''
  dealerCard2.className = ''
  dealerCard1.classList.add('card', 'large', 'back-blue');
  dealerCard2.classList.add('card', 'large');

  playerHoldingCard1.className = ''
  playerHoldingCard2.className = ''
  playerHoldingCard1.classList.add('card', 'large');
  playerHoldingCard2.classList.add('card', 'large');

  dealerCard1.style.display = 'none'
  dealerCard2.style.display = 'none'

  playerHoldingCard1.style.display = 'none'
  playerHoldingCard2.style.display = 'none'

  console.log(dealerTotalCount, playerTotalCount)

  playerActionButtons.style.display = 'none'
  playerSubmittedBetValue.style.display = 'none'
  playerBetButton.style.display = 'none'
  playAgainButton.style.display = 'none'

  helpDirections.style.display = 'none'
  message.innerHTML = ''
  document.getElementById('player-bet-value').innerHTML = ''

  playAgainButton.style.display = 'none'
  const roundElements = document.querySelectorAll('.current-round-card')
  roundElements.forEach((element, i) => {
    element.remove()
  })
  init()
}

newGame()

const randomizeCard = () => {
  let randomIdx = Math.floor(Math.random() * deck1.length)
  let randomizedCard = deck1.splice(randomIdx, 1)[0]
  return randomizedCard
}

const checkAces = (count, aces) => {
  while (count >= 21 && aces >= 1) {
    count = count - 10
    aces--;
  } return count, aces;
}

const blackjackWinLogic = () => {
  message.innerHTML = `You got BlackJack! You win! ${playerBet + (playerBet * 1.5)}`
  playerCash = playerCash + (playerBet + (playerBet * 1.5))
  document.getElementById('dealer-card').classList.remove('back-blue');
  playAgainButton.style.display = 'block'
  playerActionButtons.style.display = 'none'

}

const dealerBlackJackLogic = () => {

  message.innerHTML = `Dealer has 21. You lose ${playerBet}`
  playerCash = playerCash - playerBet
  playerActionButtons.style.display = 'none'
  playAgainButton.style.display = 'block'
}

const winLogic = () => {
  if (playerTotalCount > 21) {
    message.innerHTML = `Player bust... You lose $${playerBet}`
    document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');
  } else if (dealerTotalCount > 21) {
    message.innerHTML = `Dealer bust... You win $${playerBet * 2}!`
    playerCash = playerCash + (playerBet * 2)
  } else if (playerTotalCount === dealerTotalCount) {
    message.innerHTML = `Player and Dealer have the same count. You tie!`
    playerCash = playerCash + playerBet
  } else if (dealerTotalCount > playerTotalCount) {
    message.innerHTML = `Dealer has ${dealerTotalCount} and Player has ${playerTotalCount}. You lose $${playerBet}`
  } else if (dealerTotalCount < playerTotalCount) {
    message.innerHTML = `Dealer has ${dealerTotalCount} and Player has ${playerTotalCount}. You win $${playerBet}`
    playerCash = playerCash + (playerBet * 2)
  }
  playerActionButtons.style.display = 'none'
  playAgainButton.style.display = 'block'

}

const showPlayerDealerCards = () => {
  message.innerHTML = ''
  dealerCard1.style.display = 'block'
  dealerCard2.style.display = 'block'

  playerHoldingCard1.style.display = 'block'
  playerHoldingCard2.style.display = 'block'

  playerActionButtons.style.display = 'block'
  playerSubmittedBetValue.style.display = 'none'
  playerBetButton.style.display = 'none'

  console.log(dealerTotalCount, playerTotalCount);
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

const betOption = () => {
  document.getElementById('start-button').style.display = 'none'
  playerSubmittedBetValue.style.display = 'block'
  playerBetButton.style.display = 'block'
  console.log(playerTotalCount);
}

const dealerDistributeCard = () => {
  document.getElementById('dealer-card').classList.remove('back-blue');
  playerActionButtons.style.display = 'none'

  if (dealerTotalCount > 16) {
    winLogic();
  } else if (dealerTotalCount === 21) {
    dealerBlackJackLogic();
  } else while (dealerTotalCount < 17) {
    let dealerHitCard = randomizeCard()
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('large', 'card', dealerHitCard, 'current-round-card')
    dealerDiv.appendChild(dealerNewDiv)

    dealerTotalCount += getCardValue(dealerHitCard)
    dealerAceCount += checkForAces(dealerHitCard)

    checkAces(dealerTotalCount, dealerAceCount);
    winLogic();
  }
}

const playerDistributeCard = (evt) => {
  let playerCard1 = randomizeCard();
  let dealerShowingCard = randomizeCard();
  let playerCard2 = randomizeCard();
  let dealerHiddenCard = randomizeCard();

  // if(evt === 'play-again-button') {
  //   playerHoldingCard1.classList.remove(playerCard1);
  //   playerHoldingCard2.classList.remove(playerCard2);
  //   dealerCard1.classList.remove(dealerHiddenCard);
  //   dealerCard2.classList.remove(dealerShowingCard);
  // } else
{ playerTotalCount += getCardValue(playerCard1)
  playerAceCount += checkForAces(playerCard1)
  playerHoldingCard1.classList.add(playerCard1);

  dealerTotalCount += getCardValue(dealerShowingCard)
  dealerAceCount += checkForAces(dealerShowingCard)
  dealerCard2.classList.add(dealerShowingCard);

  playerTotalCount += getCardValue(playerCard2)
  playerAceCount += checkForAces(playerCard2)
  playerHoldingCard2.classList.add(playerCard2);

  dealerTotalCount += getCardValue(dealerHiddenCard)
  dealerAceCount += checkForAces(dealerHiddenCard)
  dealerCard1.classList.add(dealerHiddenCard, 'large');

  if (playerTotalCount === 21) {
    blackjackWinLogic();
  }
  console.log(dealerTotalCount, playerTotalCount);
  console.log(playerHoldingCard1.classList,)
  console.log(playerHoldingCard2.classList)
  console.log(dealerCard1.classList)
  console.log(dealerCard2.classList)
}
}

const playerHitButton = () => {
  let playerHitCard = randomizeCard()
  let playerDiv = document.getElementById('player');
  let playerNewDiv = document.createElement('div');

  playerNewDiv.classList.add('card', 'large', playerHitCard, 'current-round-card')
  playerDiv.appendChild(playerNewDiv)

  playerTotalCount += getCardValue(playerHitCard)
  playerAceCount += checkForAces(playerHitCard)

  checkAces(playerTotalCount, playerAceCount);

  if (playerTotalCount > 21) {
    checkAces(playerTotalCount, playerAceCount)
    console.log(playerTotalCount);
    console.log(playerAceCount);
    dealerDistributeCard();
  }

  if (playerTotalCount === 21) {
    playerActionButtons.style.display = 'none'
    dealerDistributeCard();
  }
}

const placeBet = () => {
  playerBet = parseInt(document.getElementById('bet-placeholder').value)

  if (typeof playerBet === 'number' && playerCash > 0 && playerCash >= playerBet && playerBet > 0) {
    playerCash = playerCash - playerBet
    document.getElementById('player-bet-value').innerHTML = `Player Bet: $${playerBet}`

  } else if (typeof playerBet === 'number' && playerCash > 0 && playerCash < playerBet) {
    message.innerHTML = 'You have insufficient funds. Please place a proper numerical bet to play Blackjack.'
    playerBet = 0
    return;

  } else {
    message.innerHTML = 'Please place a numerical bet more than 0 to play Blackjack.'
    playerBet = 0;
    return;
  }
  console.log(dealerTotalCount, playerTotalCount);
  playerActionButtons.style.display = 'block'
  showPlayerDealerCards()
  playerDistributeCard()
}

const playerStandButton = () => {
  dealerDistributeCard();
}


const handleClick = (evt) => {
  const button = evt.target.id
  if (button === 'start-button') {
    betOption();
    document.getElementById('play-again-button').style.display = 'none';
    console.log(dealerTotalCount, playerTotalCount)

  }
  if (button === 'bet-button') {
    newGame()
    placeBet();
    console.log(dealerTotalCount, playerTotalCount)


  }
  if (button === 'hit-button') {
    playerHitButton();
    console.log(dealerTotalCount, playerTotalCount)

  }
  if (button === 'stand-button') {
    playerStandButton();
    console.log(dealerTotalCount, playerTotalCount)
    console.log(dealerAceCount, playerAceCount)
    
  }
  if (button === 'play-again-button') {
    newGame()
    dealerCard1.className = ''
    dealerCard2.className = ''
    playerHoldingCard1.className = ''
    playerHoldingCard2.className = ''
    console.log(playerHoldingCard1.classList,)
    console.log(playerHoldingCard2.classList)
    console.log(dealerCard1.classList)
    console.log(dealerCard2.classList)

    betOption()
    console.log(dealerTotalCount, playerTotalCount)
    playerDistributeCard(evt)
  }
  document.getElementById('player-cash').innerHTML = `Player Cash: $${playerCash}`
}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);