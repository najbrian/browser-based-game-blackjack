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
/*-------------------------------- Functions --------------------------------*/

const newGame = () => {

  dealerTotalCount = 0
  dealerAceCount = 0
  playerTotalCount = 0
  playerAceCount = 0
  playerBet = 0

  playerCashMessage.style.color = 'black'
  document.getElementById('player-bet-value').innerHTML = ''
  playerSubmittedBetValue.value = ''
  newBetButton.style.display = 'none'
  message.innerHTML = ''

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


const randomizeCard = () => {
  let randomIdx = Math.floor(Math.random() * deck1.length)
  let randomizedCard = deck1.splice(randomIdx, 1)[0]
  return randomizedCard
}

const checkAces = (count, aces) => {
  while (count >= 21 && aces >= 1) {
    count = count - 10
    aces = aces - 1;
    console.log(count, aces)
    return [count, aces]
  } return [count, aces]
}

const blackjackWinLogic = () => {
  message.innerHTML = `You got BlackJack! You win! <span class="green-text">$${playerBet + (playerBet * 1.5)}</span>`
  playerCashMessage.style.color = 'darkgreen'
  playerCash = playerCash + (playerBet + (playerBet * 1.5))
  document.getElementById('dealer-card').classList.remove('back-blue');
  newBetButton.style.display = 'block'
  playerActionButtons.style.display = 'none'
}

const dealerBlackJackLogic = () => {
  message.innerHTML = `Dealer has 21. You lose <span class="red-text">$${playerBet}</span>`
    playerCashMessage.style.color = 'rgb(210,2,2)'
  newBetButton.style.display = 'block'
  playerActionButtons.style.display = 'none'
}

const playerCashCheck = () => {
  if (playerCash <= 0) {
    newBetButton.style.display = 'none'
    playAgainButton.style.display = 'block'
  }
}

const winLogic = () => {
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

  playerActionButtons.style.display = 'none'
  newBetButton.style.display = 'block'
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

const dealersTurn = () => {
  document.getElementById('dealer-card').classList.remove('back-blue');
  playerActionButtons.style.display = 'none'

  if (dealerTotalCount === 21) {
    dealerBlackJackLogic();
  } else if (dealerTotalCount > 16) {
    checkAces(dealerTotalCount, dealerAceCount);
    const aceTotalResult = checkAces(dealerTotalCount, dealerAceCount)
    dealerTotalCount = aceTotalResult[0];
    dealerAceCount = aceTotalResult[1];
    winLogic();
  } else if (dealerTotalCount > 21) {
    winLogic();
  } else while (dealerTotalCount < 17) {
    let dealerHitCard = randomizeCard()
    let dealerDiv = document.getElementById('dealer');
    let dealerNewDiv = document.createElement('div');

    dealerNewDiv.classList.add('large', 'card', dealerHitCard, 'current-round-card')
    dealerDiv.appendChild(dealerNewDiv)

    dealerTotalCount += getCardValue(dealerHitCard)
    dealerAceCount += checkForAces(dealerHitCard)
    checkAces(dealerTotalCount, dealerAceCount);

    const aceTotalResult = checkAces(dealerTotalCount, dealerAceCount)
    dealerTotalCount = aceTotalResult[0];
    dealerAceCount = aceTotalResult[1];

    winLogic();
  }
}

const distributeCards = (evt) => {
  let playerCard1 = randomizeCard();
  let dealerShowingCard = randomizeCard();
  let playerCard2 = randomizeCard();
  let dealerHiddenCard = randomizeCard();

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

  if (playerTotalCount === 21) {
    blackjackWinLogic()
  } else if (dealerTotalCount === 21) {
    dealerBlackJackLogic()
  } else if (playerTotalCount === 21 && dealerTotalCount === 21) {
    winLogic()
  }

}

const playerHitButton = () => {
  let playerHitCard = randomizeCard()
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
  playerBet = parseInt(playerSubmittedBetValue.value)

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
  playerActionButtons.style.display = 'block'
  distributeCards()
  showPlayerDealerCards()
}

const handleClick = (evt) => {
  const button = evt.target.id
  if (button === 'start-button') {
    betOption();
    playAgainButton.style.display = 'none'
  }
  if (button === 'bet-button') {
    placeBet();
    console.log(dealerTotalCount, playerTotalCount)
  }
  if (button === 'hit-button') {
    playerHitButton();
    const aceTotalResult = checkAces(playerTotalCount, playerAceCount)
    playerTotalCount = aceTotalResult[0];
    playerAceCount = aceTotalResult[1];
    console.log(dealerTotalCount, playerTotalCount)
    if (playerTotalCount > 21) {
      winLogic()
    }
  }
  if (button === 'stand-button') {
    playerStandButton();
    newBetButton.style.display = 'block'
    console.log(dealerTotalCount, playerTotalCount)
    console.log(dealerAceCount, playerAceCount)
  }
  if (button === 'new-bet-button') {
    newGame()
    dealerCardsElClass()
    dealerCardsElDisplay()
    playerCardsElClass()
    playerCardsElDisplay()
    betOption()
    nextRoundDisplay()
    if (playerCash <= 0) {
      message.innerHTML = 'You have ran out of money. Better luck next time!'
      playerSubmittedBetValue.style.display = 'none'
      playerBetButton.style.display = 'none'
      newBetButton.style.display = 'none'
      playAgainButton.style.display = 'block'
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
  playerCashMessage.innerHTML = `Player Cash: $${playerCash}`
}
playerCashMessage.innerHTML = `Player Cash: $${playerCash}`

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick);