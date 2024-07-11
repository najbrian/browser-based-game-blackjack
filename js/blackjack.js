
/*-------------------------------- Variables --------------------------------*/
let dealerCard1 = []
let dealerCard2 = []
let playerCard1 = []
let playerCard2 = []
let deck = [];
let cardToRemove

/*-------------------------------- Constants --------------------------------*/
const dealerTotal = Number(dealerCard1) + Number(dealerCard2)
const playerTotal = Number(playerCard1) + Number(playerCard2)

/*------------------------ Cached Element References ------------------------*/
const body = document.querySelector('body')
/*-------------------------------- Functions --------------------------------*/
 
const init = () => {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}

const handleClick = (evt) => {
  let evtID = evt.target.id
  if(evtID === 'start-button') {
    console.log(evtID)
  }
}
/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('click', handleClick)