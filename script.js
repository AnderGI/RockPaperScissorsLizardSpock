//Game ItemsM Map
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

let user = {
  item: null,
  points: 0,
};
let machine = {
  item: null,
  points: 0,
};

const gameItemsEl = document.querySelector(".gameItems");
const gameItems = [...document.querySelectorAll(".gameItems img")];
const scoreTextEl = [...document.querySelectorAll("span.scoreText")]; //first el -> user, second el -> machine
const gameOverEl = document.querySelector(".gameOver");
const restartBtn = document.getElementById("restartBtn");
const gameOverParagraphEl = document.querySelector(".gameOver>p");
//FUNCTIONS
/**
 *
 * @param {*} index index of the img the user clicks on
 * @returns the object from the map that has the key of the index
 */
const getElementFromMap = (index) => {
  const element = gameItemsMap.get(index);
  return element;
};

/**
 *
 * @param {*} index sets the object to the user.item property that has been returned from getElementFromMap
 */
const setUserItem = (index) => {
  if (userTurn) {
    user.item = getElementFromMap(index);
    gameItems[index].classList.add("user");
    //once the user has a element it is no longer the users turn
    changeTurn();
  }
};

/**
 * if it is not the user turn generate a random int between 0 and 4 get the element with that key from the map
 * and set it to the map.item property
 */
const setMachineItem = () => {
  if (!userTurn) {
    const randomIndex = Math.floor(Math.random() * 5);
    machine.item = getElementFromMap(randomIndex);
    gameItems[randomIndex].classList.add("machine");
    //once the machine has an element it is no longer the machines turn
    changeTurn();
  }
};

const changeTurn = () => {
  userTurn = !userTurn;
};

/**
 * if the object has inside the canDefeat array the name of the other object it is because it can defeat it
 */
const addPoint = () => {
  if (user.item.canDefeat.includes(machine.item.name)) {
    user.points++;
    scoreTextEl[0].textContent = user.points;
  } else {
    machine.points++;
    scoreTextEl[1].textContent = machine.points;
  }
};

/**
 *  images must not be clickable
 */
const gameOverImg = () => {
  gameItems.forEach((img) => img.classList.add("gameOverImg"));
  gameOverEl.style.visibility = "visible";
};

/**
 * Display the winner message
 */

const displayWinnerMessageGameOver = () => {
  gameOverParagraphEl.textContent = `
    The ${user.points === 3 ? "user" : "machine"} wins!
  `;
};

/**
 * Winner will have three points
 */
const checkWinner = () => {
  if (user.points === 3 || machine.points === 3) {
    displayWinnerMessageGameOver();
    gameOverImg();
  }
};

/**
 * Remove all the user and machine classes from the images everytime a click is made
 */
const removeUserAndMachineClassesFromImg = () => {
  gameItems.forEach((el) => {
    el.classList.remove("user");
    el.classList.remove("machine");
  });
};

/**
 *
 * @param {*} e click event to listen to
 */
const handleClick = (e) => {
  removeUserAndMachineClassesFromImg();
  const element = e.target;
  const indexOfElement = gameItems.indexOf(element);
  //The idea is
  //User will always start first listen to click event.
  //call setItem for the user
  setUserItem(indexOfElement);
  //setItem for the machine
  setMachineItem();
  //add a point to either the user or machine by comparing the items
  addPoint();
  //check for a winner. If no winner userTurn = true; else gameOver = true
  checkWinner();
  //if gameOver true -> call restart
  //EVERTIME USERS TURN IS FALSE DONT GIVE THE POSSIBILITY OF INTERACTNG WITH THE ELEMENTS BY "DISABLING THEM"
};

gameItems.forEach((el) => {
  el.addEventListener("click", handleClick);
});

//Restart The Game
const restart = () => {
  gameOverEl.style.visibility = "hidden";
  user.points = 0;
  machine.points = 0;
  scoreTextEl.forEach((el) => (el.textContent = 0));
  gameItems.forEach((img) => (img.classList = ""));
};
restartBtn.addEventListener("click", restart);
