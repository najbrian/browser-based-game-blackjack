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
const newBetButton = document.getElementById('new-bet-button')

const helpDirections = document.getElementById('help-directions')
const playerCashMessage = document.getElementById('player-cash')

const betChips = document.getElementById('bet-chips')
const resetBet = document.getElementById('reset-bet')
/*-------------------------------- Functions --------------------------------*/

const newGame = () => {

  dealerTotalCount = 0
  dealerAceCount = 0
  playerTotalCount = 0
  playerAceCount = 0
  playerBet = 0

  betChips.style.display = 'none'
  resetBet.style.display = 'none'
  playerCashMessage.style.color = 'black'
  document.getElementById('player-bet-value').innerHTML = ''
  playerSubmittedBetValue.value = ''
  playerSubmittedBetValue.innerHTML = ''
  newBetButton.style.display = 'none'
  message.innerHTML = ''
  playerCashMessage.innerHTML = `Player Cash: $${playerCash}`
}

const dealerCardsElClass = () => {
  dealerCard1.className = ''
  dealerCard2.className = ''
  dealerCard1.classList.add('card', 'large', 'back-blue');
  dealerCard2.classList.add('card', 'large');
}
const dealerCardsElDisplay = () => {
  dealerCard1.style.display = 'none'
  dealerCard2.style.display = 'none'
}

const playerCardsElClass = () => {
  playerHoldingCard1.className = ''
  playerHoldingCard2.className = ''
  playerHoldingCard1.classList.add('card', 'large');
  playerHoldingCard2.classList.add('card', 'large');
}
const playerCardsElDisplay = () => {
  playerHoldingCard1.style.display = 'none'
  playerHoldingCard2.style.display = 'none'
  playerActionButtons.style.display = 'none'
  playerSubmittedBetValue.style.display = 'none'
  playerBetButton.style.display = 'none'
  playAgainButton.style.display = 'none'
}

const helpDirectionsDisplay = () => {
  helpDirections.style.display = 'none'
  message.innerHTML = ''
  document.getElementById('player-bet-value').innerHTML = ''
}

const nextRoundDisplay = () => {
  newBetButton.style.display = 'none'
  const roundElements = document.querySelectorAll('.current-round-card')
  roundElements.forEach((element, i) => {
    element.remove()
  })
}

const newDeck = () => {
  deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]
}

const init = () => {
  newGame();
  newDeck();
  dealerCardsElClass()
  dealerCardsElDisplay()
  playerCardsElClass()
  playerCardsElDisplay()
  helpDirectionsDisplay()
  nextRoundDisplay()
}

init();


const getRandomCard = () => {
  let randomIdx = Math.floor(Math.random() * deck1.length)
  let randomizedCard = deck1.splice(randomIdx, 1)[0]
  return randomizedCard
}

const handleAceValue = (count, aces) => {
  while (count >= 21 && aces >= 1) {
    count = count - 10
    aces = aces - 1;
    console.log(count, aces)
    return [count, aces]
  } return [count, aces]
}

const renderDealerBlackJack = () => {
  message.innerHTML = `Dealer has 21. You lose <span class="red-text">$${playerBet}</span>`
  playerCashMessage.style.color = 'rgb(210,2,2)'
  newBetButton.style.display = 'block'
  playerActionButtons.style.display = 'none'
  document.getElementById('dealer-card').classList.remove('back-blue');
}

const renderPlayerBlackJackWin = () => {
  message.innerHTML = `You got BlackJack! You win! <span class="green-text">$${playerBet + (playerBet * 1.5)}</span>`
  playerCashMessage.style.color = 'darkgreen'
  document.getElementById('dealer-card').classList.remove('back-blue');
  newBetButton.style.display = 'block'
  playerActionButtons.style.display = 'none'
}


const checkPlayerCash = () => {
  if (playerCash <= 0) {
    newBetButton.style.display = 'none'
    playAgainButton.style.display = 'block'
  }
}

const winLogic = () => {
  console.log(`playerCash: ${playerCash}`)
  if (playerTotalCount > 21) {
    message.innerHTML = `Player bust... You lose <span class="red-text">$${playerBet}</span>`
    playerCashMessage.style.color = 'rgb(210,2,2)'

    document.getElementById('dealer-card').classList.remove('back-blue', 'shadow', 'outline');

  } else if (dealerTotalCount > 21) {
    message.innerHTML = `Dealer bust... You win <span class="green-text">$${playerBet * 2}</span>`
    playerCashMessage.style.color = 'darkgreen'
    playerCash = playerCash + (playerBet * 2)
  } else if (playerTotalCount === dealerTotalCount) {
    message.innerHTML = `Player and Dealer have the same count. You tie!`
    playerCash = playerCash + playerBet
  } else if (dealerTotalCount > playerTotalCount) {
    message.innerHTML = `Dealer has ${dealerTotalCount} and Player has ${playerTotalCount}. You lose <span class="red-text">$${playerBet}</span>`
    playerCashMessage.style.color = 'rgb(210,2,2)'
  } else if (dealerTotalCount < playerTotalCount) {
    message.innerHTML = `Dealer has ${dealerTotalCount} and Player has ${playerTotalCount}. You win <span class="green-text">$${playerBet * 2}</span>`
    playerCashMessage.style.color = 'darkgreen'
    playerCash = playerCash + (playerBet * 2)
  }
  console.log(`playerCash: ${playerCash}`)
  playerActionButtons.style.display = 'none'
  newBetButton.style.display = 'block'
}

const checkBlackJack = () => {
  if (playerTotalCount === 21) {
    playerCash = playerCash + (playerBet + (playerBet * 1.5))
    renderPlayerBlackJackWin()
  } else if (dealerTotalCount === 21) {
    renderDealerBlackJack()
  } else if (playerTotalCount === 21 && dealerTotalCount === 21) {
    winLogic()
  }
}

const renderPlayerDealerCards = () => {
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

const chipBetOption = () => {
  playerSubmittedBetValue.innerHTML = `Player Bet: $${playerBet}`
  document.getElementById('start-button').style.display = 'none'
  betChips.style.display = 'block'
  playerSubmittedBetValue.style.display = 'block'
  playerBetButton.style.display = 'block'
}

const resetBetButton = () => {
  playerBet = 0
  playerSubmittedBetValue.innerHTML = `$${playerBet}`
}

const betOption = () => {
  document.getElementById('start-button').style.display = 'none'
  betChips.style.display = 'block'
  playerSubmittedBetValue.style.display = 'block'
  playerBetButton.style.display = 'block'
}

const dealersTurn = () => {
  document.getElementById('dealer-card').classList.remove('back-blue');
  playerActionButtons.style.display = 'none'

  if (dealerTotalCount > 16) {
    handleAceValue(dealerTotalCount, dealerAceCount);
    const aceTotalResult = handleAceValue(dealerTotalCount, dealerAceCount)
    dealerTotalCount = aceTotalResult[0];
    dealerAceCount = aceTotalResult[1];
    winLogic();
  } else if (dealerTotalCount > 21) {
    winLogic();
  } else while (dealerTotalCount < 17) {
    let dealerHitCard = getRandomCard()
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('large', 'card', dealerHitCard, 'current-round-card')
    dealerDiv.appendChild(dealerNewDiv)

    dealerTotalCount += getCardValue(dealerHitCard)
    dealerAceCount += checkForAces(dealerHitCard)
    handleAceValue(dealerTotalCount, dealerAceCount);

    const aceTotalResult = handleAceValue(dealerTotalCount, dealerAceCount)
    dealerTotalCount = aceTotalResult[0];
    dealerAceCount = aceTotalResult[1];

    winLogic();
  }
}

const distributeCards = (evt) => {
  let playerCard1 = getRandomCard();
  let dealerShowingCard = getRandomCard();
  let playerCard2 = getRandomCard();
  let dealerHiddenCard = getRandomCard();

  playerTotalCount += getCardValue(playerCard1)
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
}

const playerHitButton = () => {
  let playerHitCard = getRandomCard()
  let playerDiv = document.getElementById('player');
  let playerNewDiv = document.createElement('div');

  if (playerTotalCount > 21) {
    playerActionButtons.style.display = 'none'
    winLogic()
  } else if (playerTotalCount < 21) {
    playerNewDiv.classList.add('card', 'large', playerHitCard, 'current-round-card')
    playerDiv.appendChild(playerNewDiv)
    playerTotalCount += getCardValue(playerHitCard)
    playerAceCount += checkForAces(playerHitCard)
  } else if (playerTotalCount === 21) {
    playerActionButtons.style.display = 'none'
    dealersTurn();
  }
  console.log(playerTotalCount, playerAceCount)
}

const playerStandButton = () => {
  dealersTurn();
}

const placeBet = () => {
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
  betChips.style.display = 'none'
  playerSubmittedBetValue.style.display = 'none'
  playerBetButton.style.display = 'none'
  playerActionButtons.style.display = 'block'
  resetBet.style.display = 'none'
  distributeCards()
  renderPlayerDealerCards()
  checkBlackJack()
}

const handleClick = (evt) => {
  const button = evt.target.id
  if (button === 'start-button') {
    betOption();
    playAgainButton.style.display = 'none'
    playerSubmittedBetValue.style.display = 'block'
    resetBet.style.display = 'block'
  }
  if (button === 'bet-button') {
    placeBet();
  }
  if (button === 'hit-button') {
    playerHitButton();
    const aceTotalResult = handleAceValue(playerTotalCount, playerAceCount)
    playerTotalCount = aceTotalResult[0];
    playerAceCount = aceTotalResult[1];
    if (playerTotalCount > 21) {
      winLogic()
    }
  }
  if (button === 'stand-button') {
    playerStandButton();
    newBetButton.style.display = 'block'
    
  }
  if (button === 'new-bet-button') {
    newGame()
    dealerCardsElClass()
    dealerCardsElDisplay()
    playerCardsElClass()
    playerCardsElDisplay()
    betOption()
    nextRoundDisplay()
    resetBet.style.display = 'block'
    if (playerCash <= 0) {
      message.innerHTML = 'You have ran out of money. Better luck next time!'
      playerSubmittedBetValue.style.display = 'none'
      playerBetButton.style.display = 'none'
      newBetButton.style.display = 'none'
      playAgainButton.style.display = 'block'
      resetBet.style.display = 'none'
      betChips.style.display = 'none'
    }
  }
  if (button === 'play-again-button') {
    playerCash = 1000
    document.getElementById('start-button').style.display = 'block'
    init();
  }
  if (button === 'help-button') {
    if (helpDirections.style.display === 'none') {
      helpDirections.style.display = 'block'
      document.getElementById('help-button').innerText = 'Click to close'
    } else {
      helpDirections.style.display = 'none'
      document.getElementById('help-button').innerText = 'Help?'
    }
  }

  if (button.includes('chip-')) {
    playerBet += +button.slice(5)
    chipBetOption()
  }

  if (button === 'reset-bet') {
    resetBetButton()
  }

  playerCashMessage.innerHTML = `Player Cash: $${playerCash}`
}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);