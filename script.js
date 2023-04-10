const gameItemsMap = new Map();
const rock = {
  name: "rock",
  img: "url",
  canDefeat: ["lizard", "scissors"],
};
const paper = {
  name: "paper",
  img: "url",
  canDefeat: ["spock", "rock"],
};
const lizard = {
  name: "lizard",
  img: "url",
  canDefeat: ["spock", "paper"],
};
const spock = {
  name: "spock",
  img: "url",
  canDefeat: ["rock", "scissors"],
};
const scissors = {
  name: "scissors",
  img: "url",
  canDefeat: ["lizard", "paper"],
};

//We will connect the map elements with the indexes of the NodeList .gameItems

gameItemsMap.set(0, rock);
gameItemsMap.set(1, paper);
gameItemsMap.set(2, lizard);
gameItemsMap.set(3, spock);
gameItemsMap.set(4, scissors);

let gameOver = false;
let userTurn = true;
let userItem;
let machineItem;

const getElementFromMap = (index) => {
  const element = gameItemsMap.get(index);
  return element;
};

const setItem = () => {
  let index;
  if (userItem) {
    //if it is users turn
    //addClickEvent to .gameItems elements
    //get the element index
    //set its index to index variable
    //get the item and set the value to userItem
  } else {
    //machine turn
    //generate a random number between 0 and 4
    //get the number and initialize the variable index with that number
    //get the item and set its value to machineItem
  }
};

//The idea is
//User will always start first listen to click event.
//call setItem for the user
//userTurn -> !userTurn
//setItem for the machine
//add a point to either the user or machine by comparing the items
//check for a winner if no winner userTurn = true; else gameOver = true
//if gameOver true -> call restart
//EVERTIME USERS TURN IS FALSE DONT GIVE THE POSSIBILITY OF INTERACTNG WITH THE ELEMENTS BY "DISABLING THEM"
