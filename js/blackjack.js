
/*-------------------------------- Variables --------------------------------*/
let playerCash = 1000

let deck1 = []

let wager

let cardToRemove

let dealerHand = []
let playerHand = []

let dealerAceCount = 0
let playerAceCount = 0

let dealerHiddenCard

let playerCanHit = true

/*-------------------------------- Constants --------------------------------*/


// const dealerTotal = cardsPicked.dealer.reduce((acc, cards) => {
//   return 
// })

const playerTotal = Number(player.card1) + Number(player.card2)


/*------------------------ Cached Element References ------------------------*/
const body = document.querySelector('body')
const startButton = document.querySelector('#start-button');
const playerCards = document.querySelector('#player');
const dealerCards = document.querySelector('#dealer');
const bet = document.querySelector('.bet');
const playerCashTotal = document.querySelector('#player-cash')
const helpDirections = document.querySelector('#help-directions')
const message = document.querySelector('#player-message')
/*-------------------------------- Functions --------------------------------*/

const init = () => {
  deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]
}

const placeBet = (evt) => {
  wager = parseFloat(document.getElementById('bet-placeholder').value);
  // console.log(typeof parseFloat(evt.target.value));
  if (typeof wager !== 'number') {
    return message.innerHTML = "Submit a numeric value to play Blackjack"
  }
  if (evt.target.id === 'bet-button') {
    
    if(playerCash === 0) {
      message.innerHTML = "You’ve run out of cash  Better luck next time!"
      return
    }
    if (wager > playerCash) {
      document.getElementById('bet-button').innerHTML = 'Try Again.'
      message.innerHTML = "Insufficient Funds. Please place a valid bet"
      return;
    } else if (playerCash > wager) {
      playerCash = playerCash - wager;
      playerCashTotal.innerHTML = `$${playerCash}`;
      bet.style.display = 'none';
      playerCards.style.display = 'block';
      dealerCards.style.display = 'block';
      playerCashTotal.style.display = 'block';
      document.querySelector('#player-buttons').style.display = 'block';
      init();
      dealCards();
    }
   
  }
};

const dealCards = () => {

  if (deck1.length > 0) {
    let randomIdx = Math.floor(Math.random() * deck1.length)
  
    let cardPicked = deck1.splice(randomIdx, 1)[0]
    playerHand.push(cardPicked)
    render(cardPicked);
  //   cardPicked = deck1.splice(randomIdx, 1)[0]
  //   render(cardPicked)
  //   handInRound[1].push(cardPicked)
  //   cardPicked = deck1.splice(randomIdx, 1)[0]
  //   render(cardPicked)
  //   handInRound[0].push(cardPicked)
  //   cardPicked = deck1.splice(randomIdx, 1)[0]
  //   render(cardPicked)
  //   handInRound[0].push(cardPicked)
  //   cardPicked = deck1.splice(randomIdx, 1)[0]
  //   render(cardPicked)
  }
}


const render = (cardPicked) => {
  // 2. Add the class name to display the card picked on deck 2.
  if(playerHand.length > 1) {
    playerCards.classList.remove(cardToRemove);
  }
  cardToRemove = cardPicked
  // Apply current picked card deck2's class list. For example, if picked card was "h08", the the deck2El would gain the class "h08", which correlates to a background image of the eight of hearts. 
  playerCards.classList.add(cardPicked);
}

const handleClick = (evt) => {
  let evtID = evt.target.id
  if (evtID === 'start-button') {
    playerCards.style.display = 'none';
    dealerCards.style.display = 'none';
    startButton.style.display = 'none';
    if (bet.style.display = 'none') {
      bet.style.display = 'block';
      playerCashTotal.style.display = 'block';
      playerCashTotal.textContent = `Player Cash: $${playerCash}`;
    }
  }
  if (evtID === 'help-button') {
    if (helpDirections.style.display === 'none') {
      helpDirections.style.display = 'block';
    } else {
      helpDirections.style.display = 'none';
    }
  }
  placeBet(evt)
  return
}

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick)
